import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Upload,
  Tag,
  Divider,
  Alert,
  Row,
  Col,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import {
  VALIDATION_LIMITS,
  REQUEST_TYPES,
  REQUEST_TYPE_LABELS,
  PRIORITY_LABELS,
  ALLOWED_FILE_TYPES,
} from "../../model/constants";
import { mockUsers, mockProjectOptions } from "@/shared/data/mocks";

const { TextArea } = Input;

interface TicketFormData {
  title: string;
  description: string;
  requestType: string;
  priority: string;
  assignee?: string;
  project?: string;
  tags?: string[];
  attachments?: UploadFile[];
}

interface TicketFormProps {
  initialValues?: Partial<TicketFormData>;
  onSubmit: (values: TicketFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
  submitButtonText?: string;
}

/**
 * Bilet oluşturma ve düzenleme formu
 * Validasyon kuralları ve yardımcı metinler ile
 */
export const TicketForm: React.FC<TicketFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
  submitButtonText = "Bilet Oluştur",
}) => {
  const [form] = Form.useForm<TicketFormData>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Merkezi mock verilerden seçenekler oluştur
  const assigneeOptions = mockUsers.map((user) => ({
    label: user.name,
    value: user.name,
  }));

  const projectOptions = mockProjectOptions.map((project) => ({
    label: project.label,
    value: project.label,
  }));

  const requestTypeOptions = Object.entries(REQUEST_TYPE_LABELS).map(
    ([value, label]) => ({
      label,
      value: Object.keys(REQUEST_TYPES).find(
        (key) => REQUEST_TYPES[key as keyof typeof REQUEST_TYPES] === value
      )
        ? value
        : label,
    })
  );

  const priorityOptions = Object.entries(PRIORITY_LABELS).map(
    ([value, label]) => ({
      label,
      value,
    })
  );

  const handleSubmit = (values: TicketFormData) => {
    onSubmit({
      ...values,
      attachments: fileList,
    });
  };

  const beforeUpload = (file: File) => {
    const isAllowedType = ALLOWED_FILE_TYPES.includes(
      file.type as (typeof ALLOWED_FILE_TYPES)[number]
    );
    const isAllowedSize =
      file.size <= VALIDATION_LIMITS.ATTACHMENT_MAX_SIZE_BYTES;

    if (!isAllowedType) {
      alert("Geçersiz dosya tipi!");
      return false;
    }

    if (!isAllowedSize) {
      alert(
        `Dosya boyutu ${VALIDATION_LIMITS.ATTACHMENT_MAX_SIZE_MB}MB'dan küçük olmalı!`
      );
      return false;
    }

    return false; // Manuel upload - API entegrasyonunda değişecek
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Alert
        message="Bilet Oluşturma İpuçları"
        description={
          <ul style={{ margin: "8px 0", paddingLeft: 20 }}>
            <li>Başlık açıklayıcı ve kısa olmalıdır</li>
            <li>Öncelik seviyesi SLA süresini etkiler</li>
            <li>
              Proje seçimi yapılırsa ilgili ekibe otomatik bildirim gönderilir
            </li>
          </ul>
        }
        type="info"
        icon={<InfoCircleOutlined />}
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Row gutter={16}>
        <Col xs={24} lg={16}>
          {/* Başlık */}
          <Form.Item
            name="title"
            label="Başlık"
            rules={[
              { required: true, message: "Başlık zorunludur" },
              {
                min: VALIDATION_LIMITS.TITLE_MIN_LENGTH,
                message: `En az ${VALIDATION_LIMITS.TITLE_MIN_LENGTH} karakter olmalı`,
              },
              {
                max: VALIDATION_LIMITS.TITLE_MAX_LENGTH,
                message: `En fazla ${VALIDATION_LIMITS.TITLE_MAX_LENGTH} karakter olabilir`,
              },
            ]}
          >
            <Input
              placeholder="Örn: Portal ana sayfada filtre hatası"
              showCount
              maxLength={VALIDATION_LIMITS.TITLE_MAX_LENGTH}
            />
          </Form.Item>

          {/* Açıklama */}
          <Form.Item
            name="description"
            label="Detaylı Açıklama"
            rules={[
              { required: true, message: "Açıklama zorunludur" },
              {
                min: VALIDATION_LIMITS.DESCRIPTION_MIN_LENGTH,
                message: `En az ${VALIDATION_LIMITS.DESCRIPTION_MIN_LENGTH} karakter olmalı`,
              },
              {
                max: VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH,
                message: `En fazla ${VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH} karakter olabilir`,
              },
            ]}
          >
            <TextArea
              rows={6}
              placeholder="Sorunu detaylı açıklayın, hatayı tekrar etme adımlarını ekleyin..."
              showCount
              maxLength={VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH}
            />
          </Form.Item>

          {/* Dosya Ekleme */}
          <Form.Item
            label="Ekler"
            extra="PDF, resim, Word, Excel dosyaları ekleyebilirsiniz (Max 10MB)"
          >
            <Upload
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={beforeUpload}
              multiple
              maxCount={5}
            >
              <Button icon={<UploadOutlined />}>Dosya Ekle</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24} lg={8}>
          {/* İstek Tipi */}
          <Form.Item
            name="requestType"
            label="İstek Tipi"
            rules={[{ required: true, message: "İstek tipi seçiniz" }]}
          >
            <Select
              placeholder="Seçiniz"
              options={requestTypeOptions}
              showSearch
            />
          </Form.Item>

          {/* Öncelik */}
          <Form.Item
            name="priority"
            label="Öncelik"
            rules={[{ required: true, message: "Öncelik seçiniz" }]}
          >
            <Select placeholder="Seçiniz" options={priorityOptions} />
          </Form.Item>

          <Divider />

          {/* Proje */}
          <Form.Item name="project" label="İlgili Proje">
            <Select
              placeholder="Proje seçiniz (opsiyonel)"
              options={projectOptions}
              showSearch
              allowClear
            />
          </Form.Item>

          {/* Atanan Kişi */}
          <Form.Item name="assignee" label="Atanan Kişi">
            <Select
              placeholder="Kişi seçiniz (opsiyonel)"
              options={assigneeOptions}
              showSearch
              allowClear
            />
          </Form.Item>

          {/* Etiketler */}
          <Form.Item name="tags" label="Etiketler">
            <Select
              mode="tags"
              placeholder="Etiket ekleyin"
              maxTagCount={5}
              tagRender={(props) => (
                <Tag
                  color="blue"
                  closable={props.closable}
                  onClose={props.onClose}
                >
                  {props.label}
                </Tag>
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      {/* Form Actions */}
      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            {submitButtonText}
          </Button>
          {onCancel && (
            <Button onClick={onCancel} disabled={loading}>
              İptal
            </Button>
          )}
          <Button
            type="dashed"
            onClick={() => form.resetFields()}
            disabled={loading}
          >
            Formu Temizle
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TicketForm;
