import React from "react";
import { Form, Input, Select, Upload, Button, Typography, Alert } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { RichTextEditor } from "./RichTextEditor";

const { Text } = Typography;

interface Option {
  label: string;
  value: string;
}

interface StepOneProps {
  showAIInfo?: boolean;
}

interface StepTwoProps {
  requestTypeOptions: Option[];
  projectOptions: Option[];
  aiSuggested?: boolean;
}

interface StepThreeProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  uploadProps: UploadProps;
}

export const StepOne: React.FC<StepOneProps> = ({ showAIInfo = true }) => (
  <div>
    <Form.Item
      label="Bilet Başlığı"
      name="title"
      rules={[
        { required: true, message: "Başlık gereklidir" },
        { min: 10, message: "En az 10 karakter olmalıdır" },
        { max: 200, message: "En fazla 200 karakter olabilir" },
      ]}
    >
      <Input
        placeholder="Örn: Dashboard sayfası yüklenmiyor"
        size="large"
        showCount
        maxLength={200}
      />
    </Form.Item>

    <Form.Item
      label="Kısa Açıklama"
      name="briefDescription"
      rules={[
        { required: true, message: "Kısa açıklama gereklidir" },
        { min: 20, message: "En az 20 karakter olmalıdır" },
      ]}
    >
      <Input.TextArea
        placeholder="Sorunu veya isteği kısaca özetleyin"
        rows={4}
        showCount
        maxLength={500}
      />
    </Form.Item>

    {showAIInfo && (
      <Alert
        message="💡 Yapay Zeka Desteği"
        description="Bilgileriniz analiz edilerek en uygun istek tipi otomatik olarak önerilecektir."
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
      />
    )}
  </div>
);

export const StepTwo: React.FC<StepTwoProps> = ({
  requestTypeOptions,
  projectOptions,
  aiSuggested,
}) => (
  <div>
    {aiSuggested && (
      <Alert
        message="🤖 Yapay Zeka Önerisi"
        description="Sistem, girdiğiniz bilgilere göre istek tipini belirledi. İsterseniz değiştirebilirsiniz."
        type="success"
        showIcon
        style={{ marginBottom: 16 }}
      />
    )}

    <Form.Item
      label="İstek Tipi"
      name="requestType"
      rules={[{ required: true, message: "İstek tipi seçmelisiniz" }]}
    >
      <Select
        placeholder="İstek tipini seçin"
        size="large"
        options={requestTypeOptions}
      />
    </Form.Item>

    <Form.Item
      label="Proje"
      name="project"
      rules={[{ required: true, message: "Proje seçmelisiniz" }]}
    >
      <Select
        placeholder="Bilet hangi projeye ait?"
        size="large"
        showSearch
        options={projectOptions}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    </Form.Item>
  </div>
);

export const StepThree: React.FC<StepThreeProps> = ({
  description,
  onDescriptionChange,
  uploadProps,
}) => (
  <div>
    <Form.Item
      label="Detaylı Açıklama"
      required
      tooltip="Problemi veya isteği detaylı şekilde açıklayın"
    >
      <RichTextEditor
        value={description}
        onChange={onDescriptionChange}
        placeholder="Problemi veya isteği detaylı bir şekilde açıklayın..."
        minHeight={300}
      />
      {!description && (
        <Text type="danger" style={{ fontSize: 12, marginTop: 4 }}>
          Açıklama gereklidir
        </Text>
      )}
    </Form.Item>

    <Form.Item
      label="Ekler"
      tooltip="Ekran görüntüsü, log dosyası veya ilgili dökümanlar ekleyebilirsiniz"
    >
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />} size="large">
          Dosya Ekle
        </Button>
      </Upload>
      <Text type="secondary" style={{ fontSize: 12, marginTop: 8 }}>
        Maksimum dosya boyutu: 10MB
      </Text>
    </Form.Item>
  </div>
);
