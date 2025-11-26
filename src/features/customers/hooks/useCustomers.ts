import { useState, useMemo, useCallback } from "react";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import type { Customer, CustomerFilters, CustomerFormData } from "../model/types";
import { mockCustomers, getCustomerStats } from "../mockData";

export const useCustomers = () => {
  const navigate = useNavigate();

  // State
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filters, setFilters] = useState<CustomerFilters>({
    search: "",
    status: "all",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();

  // Stats
  const stats = useMemo(() => getCustomerStats(), []);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        !filters.search ||
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.shortName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        customer.contact.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || customer.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, filters]);

  // Handlers
  const handleFilterChange = useCallback(
    (key: keyof CustomerFilters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleResetFilters = useCallback(() => {
    setFilters({ search: "", status: "all" });
  }, []);

  const handleViewDetail = useCallback(
    (customer: Customer) => {
      navigate(`/customers/${customer.id}`);
    },
    [navigate]
  );

  const handleEdit = useCallback(
    (customer: Customer) => {
      setEditingCustomer(customer);
      form.setFieldsValue({
        name: customer.name,
        shortName: customer.shortName,
        status: customer.status,
        city: customer.city,
        country: customer.country,
        postalCode: customer.postalCode,
        address: customer.address,
        contactName: customer.contact.name,
        contactRole: customer.contact.role,
        contactPhone: customer.contact.phone,
        contactEmail: customer.contact.email,
        phone: customer.phone,
        website: customer.website,
        taxOffice: customer.taxOffice,
        taxNumber: customer.taxNumber,
        bankName: customer.bank.bankName,
        accountNumber: customer.bank.accountNumber,
        licenseType: customer.license.type,
      });
      setModalVisible(true);
    },
    [form]
  );

  const handleCreate = useCallback(() => {
    setEditingCustomer(null);
    form.resetFields();
    form.setFieldsValue({
      status: "pending",
      country: "Türkiye",
      licenseType: "trial",
    });
    setModalVisible(true);
  }, [form]);

  const handleSave = useCallback(async () => {
    try {
      const values = (await form.validateFields()) as CustomerFormData;

      if (editingCustomer) {
        // Update existing
        const updated = customers.map((c) =>
          c.id === editingCustomer.id
            ? {
                ...c,
                name: values.name,
                shortName: values.shortName,
                status: values.status,
                city: values.city,
                country: values.country,
                postalCode: values.postalCode,
                address: values.address,
                contact: {
                  name: values.contactName,
                  role: values.contactRole,
                  phone: values.contactPhone,
                  email: values.contactEmail,
                },
                phone: values.phone,
                website: values.website,
                taxOffice: values.taxOffice,
                taxNumber: values.taxNumber,
                bank: {
                  bankName: values.bankName,
                  accountNumber: values.accountNumber,
                },
                updatedAt: new Date().toISOString(),
              }
            : c
        );
        setCustomers(updated);
        message.success("Müşteri güncellendi");
      } else {
        // Create new
        const newCustomer: Customer = {
          id: `NEW_${Date.now()}`,
          name: values.name,
          shortName: values.shortName,
          status: values.status,
          city: values.city,
          country: values.country,
          postalCode: values.postalCode,
          address: values.address,
          contact: {
            name: values.contactName,
            role: values.contactRole,
            phone: values.contactPhone,
            email: values.contactEmail,
          },
          phone: values.phone,
          website: values.website,
          taxOffice: values.taxOffice,
          taxNumber: values.taxNumber,
          bank: {
            bankName: values.bankName,
            accountNumber: values.accountNumber,
          },
          license: {
            type: values.licenseType,
            key: `LIC-${Date.now()}`,
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            status: "active",
          },
          createdAt: new Date().toISOString(),
        };
        setCustomers([newCustomer, ...customers]);
        message.success("Müşteri oluşturuldu");
      }

      setModalVisible(false);
      form.resetFields();
    } catch {
      message.error("Lütfen zorunlu alanları doldurun");
    }
  }, [form, editingCustomer, customers]);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  return {
    // State
    customers,
    filteredCustomers,
    filters,
    stats,
    modalVisible,
    editingCustomer,
    form,

    // Handlers
    handleFilterChange,
    handleResetFilters,
    handleViewDetail,
    handleEdit,
    handleCreate,
    handleSave,
    handleModalClose,
  };
};
