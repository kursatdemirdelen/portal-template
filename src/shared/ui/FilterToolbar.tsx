import React from "react";
import { Space } from "antd";
import { toolbarStyles } from "@/shared/styles/helpers";

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
    <div style={{ ...toolbarStyles.filter.container, alignItems: align }}>
      <Space size={12} wrap style={toolbarStyles.filter.inputs}>
        {children}
      </Space>
      {actions && <div style={toolbarStyles.filter.actions}>{actions}</div>}
    </div>
  );
};
