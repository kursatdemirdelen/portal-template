import React from "react";
import { Card, Space, Typography } from "antd";
import { RecentTickets } from "./ticket-list";
import type { Ticket } from "../model/types";

const { Text } = Typography;

interface TicketSidebarProps {
  tickets: Ticket[];
}

export const TicketSidebar: React.FC<TicketSidebarProps> = ({ tickets }) => {
  return (
    <>
      <Card
        title="💡 İpuçları"
        style={{ marginBottom: 24 }}
        styles={{ body: { padding: "16px" } }}
      >
        <Space direction="vertical" size={12}>
          <Text>
            <strong>Başlık:</strong> Açık ve net olmalı
          </Text>
          <Text>
            <strong>Açıklama:</strong> Sorunu yeniden oluşturma adımlarını
            ekleyin
          </Text>
          <Text>
            <strong>Ekler:</strong> Ekran görüntüleri problemi anlamayı
            kolaylaştırır
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Yapay zeka desteği ile daha hızlı çözüm
          </Text>
        </Space>
      </Card>

      <Card
        title="Son Biletler"
        styles={{ body: { padding: 0 } }}
        style={{ marginTop: 24 }}
      >
        <div style={{ maxHeight: 400, overflow: "auto" }}>
          <RecentTickets tickets={tickets} />
        </div>
      </Card>
    </>
  );
};
