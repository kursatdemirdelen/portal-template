import { Modal, Form, Input, Select, Row, Col, Divider } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { borderColors } from "@/shared/styles";
import type { FormInstance } from "antd";
import type { Customer } from "../model/types";
import {
  STATUS_LABELS,
  LICENSE_TYPE_LABELS,
  ALL_STATUSES,
  ALL_LICENSE_TYPES,
  CITIES,
  COUNTRIES,
} from "./constants";

interface CustomerFormModalProps {
  open: boolean;
  editingCustomer: Customer | null;
  form: FormInstance;
  onSave: () => void;
  onCancel: () => void;
}

export const CustomerFormModal = ({
  open,
  editingCustomer,
  form,
  onSave,
  onCancel,
}: CustomerFormModalProps) => {
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {editingCustomer ? <EditOutlined /> : <PlusOutlined />}
          <span>
            {editingCustomer ? "Müşteri Düzenle" : "Yeni Müşteri Oluştur"}
          </span>
        </div>
      }
      open={open}
      onOk={onSave}
      onCancel={onCancel}
      okText={editingCustomer ? "Güncelle" : "Oluştur"}
      cancelText="İptal"
      width={800}
      styles={{
        header: {
          borderBottom: `1px solid ${borderColors.light}`,
          paddingBottom: 12,
        },
        body: { maxHeight: "60vh", overflowY: "auto" },
      }}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        {/* Temel Bilgiler */}
        <Divider orientation="left">Temel Bilgiler</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Müşteri Adı"
              rules={[{ required: true, message: "Müşteri adı zorunlu" }]}
            >
              <Input placeholder="Örn: Akademi Yazılım A.Ş." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="shortName"
              label="Kısa Adı"
              rules={[{ required: true, message: "Kısa ad zorunlu" }]}
            >
              <Input placeholder="Örn: Akademi" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="status" label="Durum">
              <Select
                options={ALL_STATUSES.map((s) => ({
                  value: s,
                  label: STATUS_LABELS[s],
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="city" label="Şehir">
              <Select
                showSearch
                placeholder="Şehir seçin"
                options={CITIES.map((c) => ({ value: c, label: c }))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="country" label="Ülke">
              <Select
                options={COUNTRIES.map((c) => ({ value: c, label: c }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="postalCode" label="Posta Kodu">
              <Input placeholder="34000" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item name="address" label="Adres">
              <Input placeholder="Tam adres" />
            </Form.Item>
          </Col>
        </Row>

        {/* Yetkili Bilgileri */}
        <Divider orientation="left">Yetkili Kişi Bilgileri</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contactName"
              label="Ad Soyad"
              rules={[{ required: true, message: "Yetkili adı zorunlu" }]}
            >
              <Input placeholder="Yetkili kişi adı" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="contactRole" label="Görevi">
              <Input placeholder="Örn: Satış Müdürü" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contactPhone"
              label="Telefon"
              rules={[{ required: true, message: "Telefon zorunlu" }]}
            >
              <Input placeholder="+90 (XXX) XXX XX XX" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="contactEmail" label="E-Posta">
              <Input placeholder="email@sirket.com" />
            </Form.Item>
          </Col>
        </Row>

        {/* Firma Bilgileri */}
        <Divider orientation="left">Firma Bilgileri</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="phone" label="Firma Telefonu">
              <Input placeholder="+90 (XXX) XXX XX XX" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="website" label="Web Sitesi">
              <Input placeholder="www.sirket.com.tr" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="taxOffice" label="Vergi Dairesi">
              <Input placeholder="Vergi dairesi" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="taxNumber" label="Vergi No">
              <Input placeholder="Vergi numarası" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="bankName" label="Banka">
              <Input placeholder="Banka adı" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="accountNumber" label="Hesap No / IBAN">
              <Input placeholder="TRXX XXXX XXXX XXXX" />
            </Form.Item>
          </Col>
        </Row>

        {/* Lisans */}
        <Divider orientation="left">Lisans Bilgisi</Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="licenseType" label="Lisans Türü">
              <Select
                options={ALL_LICENSE_TYPES.map((t) => ({
                  value: t,
                  label: LICENSE_TYPE_LABELS[t],
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
