import React from "react";
import { Form, Input, DatePicker, Select, Modal } from "antd";
import { LeaveRequest } from "../model/types";

interface LeaveRequestFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<LeaveRequest, "id" | "status">) => void;
}

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { dates, type, description } = values;
        const [start, end] = dates;
        const days = end.diff(start, "days") + 1;

        onSubmit({
          type,
          startDate: start.format("YYYY-MM-DD"),
          endDate: end.format("YYYY-MM-DD"),
          days,
          description,
        });

        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Yeni İzin Talebi"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Gönder"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical" name="leave_request_form">
        <Form.Item
          name="type"
          label="İzin Tipi"
          rules={[{ required: true, message: "Lütfen izin tipi seçiniz!" }]}
        >
          <Select placeholder="Seçiniz">
            <Option value="Yıllık İzin">Yıllık İzin</Option>
            <Option value="Hastalık İzni">Hastalık İzni</Option>
            <Option value="Mazeret İzni">Mazeret İzni</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dates"
          label="Tarih Aralığı"
          rules={[{ required: true, message: "Lütfen tarih aralığı seçiniz!" }]}
        >
          <RangePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Açıklama"
          rules={[{ required: true, message: "Lütfen açıklama giriniz!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
