import React from "react";
import { Space } from "antd";

interface FilterToolbarProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
  align?: "flex-start" | "center" | "flex-end";
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  children,
  actions,
  align = "flex-start",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: align,
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 16,
      }}
    >
      <Space size={12} wrap style={{ flex: 1, minWidth: 220 }}>
        {children}
      </Space>
      {actions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
};
