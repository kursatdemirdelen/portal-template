import React, { useState } from "react";
import {
  Typography,
  Tag,
  Space,
  Button,
  DatePicker,
  TimePicker,
  InputNumber,
  Input,
} from "antd";
import type { TicketEffort } from "../../model/types";
import { SectionCard } from "@/shared/ui";
import { Clock, Plus, Trash2 } from "lucide-react";
import { theme } from "@/shared/styles/styleConstants";
import { ticketDetailStyles } from "../shared/ticketDetailStyles";
import type { Dayjs } from "dayjs";

const { Text } = Typography;
const { TextArea } = Input;

interface TicketEffortsProps {
  efforts: TicketEffort[];
  loading?: boolean;
  onDeleteEffort?: (id: string) => void;
  onAddEffort?: (effort: {
    date: string;
    time: string;
    hours: number;
    description: string;
  }) => void;
}

export const TicketEfforts: React.FC<TicketEffortsProps> = ({
  efforts,
  loading = false,
  onDeleteEffort,
  onAddEffort,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (
      selectedDate &&
      selectedTime &&
      duration &&
      description.trim() &&
      onAddEffort
    ) {
      onAddEffort({
        date: selectedDate.format("DD.MM.YYYY"),
        time: selectedTime.format("HH:mm"),
        hours: duration,
        description: description.trim(),
      });
      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setDuration(null);
      setDescription("");
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setDuration(null);
    setDescription("");
    setShowForm(false);
  };

  const isFormValid =
    selectedDate &&
    selectedTime &&
    duration &&
    duration > 0 &&
    description.trim().length > 0;

  // Responsive now handled purely with flex wrapping; no breakpoint hook needed.

  const totalMinutes = efforts.reduce((sum, e) => sum + e.hours, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <SectionCard
      title="Efor"
      loading={loading}
      extra={
        <Space size={8}>
          <Tag color="blue" style={ticketDetailStyles.effortTotal}>
            Toplam: {totalMinutes} dk ({totalHours}s)
          </Tag>
          <Button
            size="small"
            type="primary"
            icon={<Plus size={14} />}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Kapat" : "Ekle"}
          </Button>
        </Space>
      }
    >
      {showForm && (
        <div style={ticketDetailStyles.effortForm}>
          <div style={ticketDetailStyles.effortFormRow}>
            <div style={ticketDetailStyles.effortFormField}>
              <Text style={ticketDetailStyles.effortFormLabel}>Tarih</Text>
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Tarih seçin"
                format="DD.MM.YYYY"
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
            <div style={ticketDetailStyles.effortFormField}>
              <Text style={ticketDetailStyles.effortFormLabel}>Saat</Text>
              <TimePicker
                style={{ width: "100%" }}
                placeholder="Saat seçin"
                format="HH:mm"
                value={selectedTime}
                onChange={setSelectedTime}
              />
            </div>
            <div style={ticketDetailStyles.effortFormField}>
              <Text style={ticketDetailStyles.effortFormLabel}>Süre (dk)</Text>
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Dakika"
                min={1}
                value={duration}
                onChange={setDuration}
              />
            </div>
          </div>
          <div>
            <Text style={ticketDetailStyles.effortFormLabel}>Açıklama</Text>
            <TextArea
              rows={2}
              placeholder="Efor açıklaması..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div style={ticketDetailStyles.effortFormActions}>
            <Button size="small" onClick={handleCancel}>
              İptal
            </Button>
            <Button
              size="small"
              type="primary"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              Kaydet
            </Button>
          </div>
        </div>
      )}
      <div>
        {efforts.map((effort) => {
          const [isHovered, setIsHovered] = useState(false);
          return (
            <div
              key={effort.id}
              style={{
                ...ticketDetailStyles.effortItem,
                ...(isHovered && ticketDetailStyles.effortItemHover),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div style={ticketDetailStyles.effortHeader}>
                <div style={ticketDetailStyles.effortTime}>
                  <Clock size={14} color={theme.colors.primary} />
                  <Text>
                    {effort.date} • {effort.time}
                  </Text>
                </div>
                <Tag color="green" style={ticketDetailStyles.effortDuration}>
                  {effort.hours} dk
                </Tag>
              </div>
              <Text style={ticketDetailStyles.effortDescription}>
                {effort.description}
              </Text>
              <div style={ticketDetailStyles.effortFooter}>
                <Button
                  size="small"
                  type="text"
                  icon={<Trash2 size={14} />}
                  danger
                  onClick={() => onDeleteEffort?.(effort.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};
