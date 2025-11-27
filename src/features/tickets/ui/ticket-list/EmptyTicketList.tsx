import React from "react";
import { Empty, Button } from "antd";
import { FolderX, Search } from "lucide-react";
import { theme } from "@/shared/styles/styleConstants";

interface EmptyTicketListProps {
  hasFilters?: boolean;
  onClearFilters?: () => void;
  onCreateTicket?: () => void;
}

/**
 * Ticket listesi boş olduğunda gösterilen component
 * Filtreleme sonucu boş mu yoksa gerçekten veri yok mu durumunu ayırır
 */
export const EmptyTicketList: React.FC<EmptyTicketListProps> = ({
  hasFilters = false,
  onClearFilters,
  onCreateTicket,
}) => {
  if (hasFilters) {
    return (
      <Empty
        image={
          <Search
            size={48}
            color={theme.colors.text.muted}
            style={{ margin: "0 auto" }}
          />
        }
        description="Filtreye uygun bilet bulunamadı"
        style={{ padding: "48px 16px" }}
      >
        {onClearFilters && (
          <Button type="primary" onClick={onClearFilters}>
            Filtreleri Temizle
          </Button>
        )}
      </Empty>
    );
  }

  return (
    <Empty
      image={
        <FolderX
          size={64}
          color={theme.colors.text.muted}
          style={{ margin: "0 auto" }}
        />
      }
      description={
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            Henüz hiç bilet yok
          </div>
          <div style={{ fontSize: 14, color: theme.colors.text.secondary }}>
            İlk bileti oluşturarak başlayın
          </div>
        </div>
      }
      style={{ padding: "64px 16px" }}
    >
      {onCreateTicket && (
        <Button type="primary" size="large" onClick={onCreateTicket}>
          İlk Bileti Oluştur
        </Button>
      )}
    </Empty>
  );
};

export default EmptyTicketList;
