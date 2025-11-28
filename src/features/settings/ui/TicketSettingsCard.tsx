/**
 * Ticket Settings Card (Güncellenmiş - Öncelik ve Otomatik Atama Kaldırıldı)
 */

import React, { useState } from "react";
import {
  Card,
  Switch,
  Select,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  Tag,
  Input,
  InputNumber,
  Button,
} from "antd";
import { Ticket, Tags, ListChecks, Paperclip, Plus } from "lucide-react";
import { SettingsCardHeader } from "./SettingsCardHeader";
import {
  colors,
  spacing,
  radius,
  backgrounds,
  borderColors,
} from "@/shared/styles";
import type { TicketSettings } from "../model/types";

const { Text, Title } = Typography;

interface TicketSettingsCardProps {
  data: TicketSettings;
  onChange: (key: keyof TicketSettings, value: unknown) => void;
  minHeight?: number;
}

const TagList: React.FC<{
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  placeholder: string;
  color?: string;
}> = ({ items, onAdd, onRemove, placeholder, color = "blue" }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && !items.includes(inputValue.trim())) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: spacing.sm,
        }}
      >
        {items.map((item) => (
          <Tag
            key={item}
            color={color}
            closable
            onClose={() => onRemove(item)}
            style={{ margin: 0 }}
          >
            {item}
          </Tag>
        ))}
      </div>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          size="small"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
          style={{ flex: 1 }}
        />
        <Button size="small" icon={<Plus size={14} />} onClick={handleAdd} />
      </Space.Compact>
    </div>
  );
};

export const TicketSettingsCard: React.FC<TicketSettingsCardProps> = ({
  data,
  onChange,
  minHeight,
}) => {
  const handleAddRequestType = (type: string) => {
    onChange("requestTypes", [...data.requestTypes, type]);
  };

  const handleRemoveRequestType = (type: string) => {
    onChange(
      "requestTypes",
      data.requestTypes.filter((t: string) => t !== type)
    );
  };

  const handleAddStatus = (status: string) => {
    onChange("statuses", [...data.statuses, status]);
  };

  const handleRemoveStatus = (status: string) => {
    onChange(
      "statuses",
      data.statuses.filter((s: string) => s !== status)
    );
  };

  return (
    <Card
      style={{
        borderRadius: radius.lg,
        border: `1px solid ${borderColors.light}`,
        minHeight,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SettingsCardHeader
        icon={<Ticket size={20} color={colors.success} />}
        title="Bilet Ayarları"
        subtitle="İstek türleri, durumlar ve ek dosya ayarları"
        color={colors.success}
      />

      {/* Request Types */}
      <div style={{ marginBottom: spacing.xl }}>
        <Space style={{ marginBottom: spacing.sm }}>
          <Tags size={16} color={colors.textSecondary} />
          <Text strong>İstek Türleri</Text>
        </Space>
        <div
          style={{
            padding: spacing.md,
            background: backgrounds.neutral50,
            borderRadius: radius.md,
          }}
        >
          <TagList
            items={data.requestTypes}
            onAdd={handleAddRequestType}
            onRemove={handleRemoveRequestType}
            placeholder="Yeni istek türü ekle..."
            color="blue"
          />
          <div style={{ marginTop: spacing.md }}>
            <Space>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Varsayılan:
              </Text>
              <Select
                size="small"
                value={data.defaultRequestType}
                onChange={(v) => onChange("defaultRequestType", v)}
                options={data.requestTypes.map((t: string) => ({
                  label: t,
                  value: t,
                }))}
                style={{ width: 150 }}
              />
            </Space>
          </div>
        </div>
      </div>

      {/* Statuses */}
      <div style={{ marginBottom: spacing.xl }}>
        <Space style={{ marginBottom: spacing.sm }}>
          <ListChecks size={16} color={colors.textSecondary} />
          <Text strong>Durumlar</Text>
        </Space>
        <div
          style={{
            padding: spacing.md,
            background: backgrounds.neutral50,
            borderRadius: radius.md,
          }}
        >
          <TagList
            items={data.statuses}
            onAdd={handleAddStatus}
            onRemove={handleRemoveStatus}
            placeholder="Yeni durum ekle..."
            color="cyan"
          />
          <div style={{ marginTop: spacing.md }}>
            <Space>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Varsayılan:
              </Text>
              <Select
                size="small"
                value={data.defaultStatus}
                onChange={(v) => onChange("defaultStatus", v)}
                options={data.statuses.map((s: string) => ({
                  label: s,
                  value: s,
                }))}
                style={{ width: 150 }}
              />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      {/* Attachment Settings */}
      <div
        style={{
          padding: spacing.md,
          background: backgrounds.neutral50,
          borderRadius: radius.md,
          marginBottom: spacing.lg,
        }}
      >
        <Space style={{ marginBottom: spacing.md }}>
          <Paperclip size={16} color={colors.textSecondary} />
          <Text strong>Ek Dosya Ayarları</Text>
        </Space>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Maksimum Boyut
            </Text>
            <Space>
              <InputNumber
                min={1}
                max={100}
                value={data.attachmentMaxSizeMB}
                onChange={(v) => onChange("attachmentMaxSizeMB", v)}
                style={{ width: 80 }}
              />
              <Text type="secondary">MB</Text>
            </Space>
          </Col>
          <Col span={12}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              İzin Verilen Türler
            </Text>
            <Text style={{ fontSize: 12 }}>
              {data.allowedAttachmentTypes.join(", ")}
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default TicketSettingsCard;
