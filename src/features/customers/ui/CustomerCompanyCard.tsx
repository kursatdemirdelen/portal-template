import {
  Card,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  Tooltip,
  message,
} from "antd";
import {
  FileTextOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { colors, shadows } from "@/shared/styles";
import type { Customer } from "../model/types";

const { Text } = Typography;

interface CustomerCompanyCardProps {
  customer: Customer;
}

const cardStyle = {
  borderRadius: 12,
  boxShadow: shadows.sm,
};

export const CustomerCompanyCard = ({ customer }: CustomerCompanyCardProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    message.success(`${label} kopyalandı`);
  };

  return (
    <Card
      title={
        <Space>
          <FileTextOutlined style={{ color: colors.accent }} />
          <span>Firma Bilgileri</span>
        </Space>
      }
      size="small"
      style={cardStyle}
      styles={{ body: { padding: "16px 20px" } }}
    >
      <Row gutter={[16, 16]}>
        {/* Adres */}
        <Col xs={24} md={12}>
          <Card
            type="inner"
            title={
              <Space size={6}>
                <EnvironmentOutlined style={{ color: colors.warning }} />
                <span>Adres</span>
              </Space>
            }
            size="small"
            style={{ borderRadius: 8, height: "100%" }}
            styles={{ body: { padding: 12 } }}
          >
            <Space direction="vertical" size={4}>
              <Text style={{ fontSize: 13 }}>{customer.address || "-"}</Text>
              <Space
                split={<Divider type="vertical" style={{ margin: "0 4px" }} />}
              >
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {customer.city}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {customer.country}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* İletişim */}
        <Col xs={24} md={12}>
          <Card
            type="inner"
            title={
              <Space size={6}>
                <GlobalOutlined style={{ color: colors.info }} />
                <span>İletişim</span>
              </Space>
            }
            size="small"
            style={{ borderRadius: 8, height: "100%" }}
            styles={{ body: { padding: 12 } }}
          >
            <Space direction="vertical" size={4}>
              <Space size={6}>
                <PhoneOutlined style={{ fontSize: 12 }} />
                <Text style={{ fontSize: 13 }}>{customer.phone || "-"}</Text>
              </Space>
              <Space size={6}>
                <MailOutlined style={{ fontSize: 12 }} />
                <Text
                  copyable={!!customer.contact?.email}
                  style={{ fontSize: 13 }}
                >
                  {customer.contact?.email || "-"}
                </Text>
              </Space>
              {customer.website && (
                <Space size={6}>
                  <GlobalOutlined style={{ fontSize: 12 }} />
                  <a
                    href={customer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13 }}
                  >
                    {customer.website}
                  </a>
                </Space>
              )}
            </Space>
          </Card>
        </Col>

        {/* Banka Bilgileri */}
        {customer.bank && (
          <Col xs={24}>
            <Card
              type="inner"
              title={
                <Space size={6}>
                  <BankOutlined style={{ color: colors.info }} />
                  <span>Banka Bilgileri</span>
                </Space>
              }
              size="small"
              style={{ borderRadius: 8 }}
              styles={{ body: { padding: 12 } }}
            >
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={8}>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    Banka
                  </Text>
                  <div>
                    <Text strong style={{ fontSize: 13 }}>
                      {customer.bank.bankName}
                    </Text>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    Hesap No
                  </Text>
                  <div>
                    <Text code style={{ fontSize: 12 }}>
                      {customer.bank.accountNumber}
                    </Text>
                  </div>
                </Col>
                {customer.bank.iban && (
                  <Col xs={24} sm={8}>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      IBAN
                    </Text>
                    <div>
                      <Space size={4}>
                        <Text code style={{ fontSize: 11 }}>
                          {customer.bank.iban}
                        </Text>
                        <Tooltip title="Kopyala">
                          <CopyOutlined
                            style={{
                              cursor: "pointer",
                              color: colors.info,
                              fontSize: 11,
                            }}
                            onClick={() =>
                              copyToClipboard(customer.bank!.iban!, "IBAN")
                            }
                          />
                        </Tooltip>
                      </Space>
                    </div>
                  </Col>
                )}
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </Card>
  );
};
