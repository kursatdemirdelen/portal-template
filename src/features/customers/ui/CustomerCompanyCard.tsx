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
import { colors } from "@/shared/styles";
import type { Customer } from "../model/types";
import { customerDetailStyles as styles } from "./customerDetailStyles";

const { Text } = Typography;

interface CustomerCompanyCardProps {
  customer: Customer;
}

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
      style={styles.card}
      styles={{ body: styles.cardBody }}
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
            style={styles.innerCard}
            styles={{ body: styles.innerCardBody }}
          >
            <Space direction="vertical" size={4}>
              <Text style={styles.textBase}>{customer.address || "-"}</Text>
              <Space
                split={<Divider type="vertical" style={{ margin: "0 4px" }} />}
              >
                <Text type="secondary" style={styles.textSm}>
                  {customer.city}
                </Text>
                <Text type="secondary" style={styles.textSm}>
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
            style={styles.innerCard}
            styles={{ body: styles.innerCardBody }}
          >
            <Space direction="vertical" size={4}>
              <Space size={6}>
                <PhoneOutlined style={styles.textSm} />
                <Text style={styles.textBase}>{customer.phone || "-"}</Text>
              </Space>
              <Space size={6}>
                <MailOutlined style={styles.textSm} />
                <Text
                  copyable={!!customer.contact?.email}
                  style={styles.textBase}
                >
                  {customer.contact?.email || "-"}
                </Text>
              </Space>
              {customer.website && (
                <Space size={6}>
                  <GlobalOutlined style={styles.textSm} />
                  <a
                    href={customer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.textBase}
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
              style={styles.innerCard}
              styles={{ body: styles.innerCardBody }}
            >
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={8}>
                  <Text type="secondary" style={styles.textXs}>
                    Banka
                  </Text>
                  <div>
                    <Text strong style={styles.textBase}>
                      {customer.bank.bankName}
                    </Text>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <Text type="secondary" style={styles.textXs}>
                    Hesap No
                  </Text>
                  <div>
                    <Text code style={styles.textSm}>
                      {customer.bank.accountNumber}
                    </Text>
                  </div>
                </Col>
                {customer.bank.iban && (
                  <Col xs={24} sm={8}>
                    <Text type="secondary" style={styles.textXs}>
                      IBAN
                    </Text>
                    <div>
                      <Space size={4}>
                        <Text code style={styles.textXs}>
                          {customer.bank.iban}
                        </Text>
                        <Tooltip title="Kopyala">
                          <CopyOutlined
                            style={{ ...styles.copyButton, fontSize: 11 }}
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
