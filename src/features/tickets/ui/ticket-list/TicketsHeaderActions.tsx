import React from "react";
import { Button } from "antd";
import { Plus, FileSpreadsheet, RotateCcw } from "lucide-react";
import { TicketStatusChips } from "./TicketStatusChips";
import { colorPalette } from "@/shared/styles/styleConstants";

interface TicketsHeaderActionsProps {
  isMobile: boolean;
  summary: Array<{ key: string; label: string; count: number; color?: string }>;
  showReset: boolean;
  onReset: () => void;
  onExport: () => void;
}

export const TicketsHeaderActions: React.FC<TicketsHeaderActionsProps> = ({
  isMobile,
  summary,
  showReset,
  onReset,
  onExport,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 8 : 12,
        alignItems: isMobile ? "flex-start" : "center",
        flexWrap: "wrap",
      }}
    >
      <TicketStatusChips summary={summary} />
      <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
        {showReset && (
          <Button icon={<RotateCcw size={14} />} onClick={onReset} size="small">
            Filtreleri Sıfırla
          </Button>
        )}
        <Button
          type="primary"
          style={{
            background: colorPalette.success,
            borderColor: colorPalette.success,
          }}
          icon={<FileSpreadsheet size={14} />}
          onClick={onExport}
          size="small"
        >
          Dışa Aktar
        </Button>
      </div>
    </div>
  );
};

export default TicketsHeaderActions;
