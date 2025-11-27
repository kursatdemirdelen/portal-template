import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Space,
  message,
  Row,
  Col,
  Alert,
  Divider,
  Steps,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { PageContainer, SectionCard } from "@/shared/ui";
import {
  StepOne,
  StepTwo,
  StepThree,
} from "@/features/tickets/ui/forms/TicketFormSteps";
import { TicketSidebar } from "@/features/tickets/ui/TicketSidebar";
import {
  mockProjects,
  requestTypeOptions,
  getRecentTickets,
} from "@/shared/data/mockData";

interface TicketFormData {
  title: string;
  briefDescription: string;
  description: string;
  requestType: string;
  project: string;
  attachments?: UploadFile[];
}

const NewTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<TicketFormData>();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [description, setDescription] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const recentTickets = getRecentTickets(3);

  const handleSubmit = async (values: TicketFormData) => {
    setLoading(true);

    try {
      const formData = {
        ...values,
        description,
        attachments: fileList.map((file) => file.name),
      };

      console.log("Form Data:", formData);

      // TODO: API çağrısı
      // await apiClient.post('/api/tickets', formData);

      message.success("Bilet başarıyla oluşturuldu!");
      setTimeout(() => {
        navigate("/tickets");
      }, 1000);
    } catch {
      message.error("Bilet oluşturulurken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/tickets");
  };

  const beforeUpload = (file: File) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Dosya boyutu 10MB'dan küçük olmalıdır!");
      return false;
    }
    return false; // Prevent auto upload
  };

  const uploadProps = {
    fileList,
    onChange: ({ fileList }: { fileList: UploadFile[] }) =>
      setFileList(fileList),
    beforeUpload,
    onRemove: (file: UploadFile) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    multiple: true,
  };

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(["title", "briefDescription"]);
      } else if (currentStep === 1) {
        await form.validateFields(["requestType", "project"]);
      }
      setCurrentStep(currentStep + 1);
    } catch {
      // Validation failed - form gösterir zaten
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { title: "Bilet Bilgileri", description: "Başlık ve özet" },
    { title: "Tip ve Proje", description: "Kategori seçimi" },
    { title: "Detaylar", description: "Açıklama ve ekler" },
  ];

  return (
    <PageContainer
      title="Yeni Bilet Oluştur"
      subtitle="Yapay zeka destekli akıllı bilet oluşturma sistemi"
      showBackButton
      breadcrumbs={[
        { title: "Biletler", href: "/tickets" },
        { title: "Yeni Bilet" },
      ]}
    >
      <Row gutter={[24, 24]}>
        {/* Ana Form */}
        <Col xs={24} lg={16}>
          <SectionCard>
            <Steps
              current={currentStep}
              items={steps}
              style={{ marginBottom: 32 }}
            />

            <Alert
              message="Yapay Zeka Destekli Bilet Oluşturma"
              description="Başlık ve kısa açıklama girdikten sonra yapay zeka otomatik olarak istek tipini belirleyecek ve size öneri sunacaktır."
              type="info"
              icon={<InfoCircleOutlined />}
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
              requiredMark="optional"
            >
              {currentStep === 0 && <StepOne showAIInfo />}
              {currentStep === 1 && (
                <StepTwo
                  requestTypeOptions={[...requestTypeOptions]}
                  projectOptions={[...mockProjects]}
                  aiSuggested
                />
              )}
              {currentStep === 2 && (
                <StepThree
                  description={description}
                  onDescriptionChange={setDescription}
                  uploadProps={uploadProps}
                />
              )}

              <Divider />

              <Space>
                {currentStep > 0 && (
                  <Button size="large" onClick={handlePrev}>
                    Geri
                  </Button>
                )}
                {currentStep < steps.length - 1 && (
                  <Button type="primary" size="large" onClick={handleNext}>
                    İleri
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    disabled={!description}
                  >
                    Bilet Oluştur
                  </Button>
                )}
                <Button size="large" onClick={handleCancel}>
                  İptal
                </Button>
              </Space>
            </Form>
          </SectionCard>
        </Col>

        {/* Sağ Sidebar */}
        <Col xs={24} lg={8}>
          <TicketSidebar tickets={recentTickets} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default NewTicketPage;
