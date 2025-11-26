import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Space, Row, Col } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { PageContainer } from "../../../shared/ui";
import { getCustomerById } from "../mockData";
import {
  CustomerHeroCard,
  CustomerInfoCard,
  CustomerContactCard,
  CustomerCompanyCard,
  CustomerLicenseCard,
} from "../ui";

const { Text } = Typography;

export const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const customer = getCustomerById(id || "");

  if (!customer) {
    return (
      <PageContainer title="Müşteri Bulunamadı">
        <Card>
          <Space
            direction="vertical"
            align="center"
            style={{ width: "100%", padding: 48 }}
          >
            <Text type="secondary">İstenen müşteri bulunamadı.</Text>
            <Button type="primary" onClick={() => navigate("/customers")}>
              Müşteri Listesine Dön
            </Button>
          </Space>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Müşteri Detayı"
      extra={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/customers")}
          >
            Geri
          </Button>
          <Button type="primary" icon={<EditOutlined />}>
            Düzenle
          </Button>
        </Space>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Hero Card */}
        <CustomerHeroCard customer={customer} />

        {/* Sol: Temel Bilgiler, Yetkili Kişi, Firma Bilgileri | Sağ: Lisans */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={18}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <CustomerInfoCard customer={customer} />
              <CustomerContactCard contact={customer.contact} />
              <CustomerCompanyCard customer={customer} />
            </div>
          </Col>
          <Col xs={24} lg={6}>
            <CustomerLicenseCard license={customer.license} />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};
