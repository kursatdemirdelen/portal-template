import React from 'react';
import { Table, Tag, Button, Space, Statistic, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlayCircleOutlined, PauseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageContainer } from '@/shared/ui/PageContainer';
import { SectionCard } from '@/shared/ui/SectionCard';
import { colorPalette, spacing } from '@/shared/styles/styleConstants';

interface TimeEntry {
  id: string;
  date: string;
  project: string;
  task: string;
  startTime: string;
  endTime: string | null;
  duration: number;
  status: 'completed' | 'in-progress';
  notes?: string;
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: 'TRK001',
    date: '2025-01-20',
    project: 'Portal Intellium',
    task: 'API geliştirmesi',
    startTime: '09:00',
    endTime: '12:30',
    duration: 3.5,
    status: 'completed',
    notes: 'Authentication uçları tamamlandı',
  },
  {
    id: 'TRK002',
    date: '2025-01-20',
    project: 'Mobile App',
    task: 'UI tasarımı',
    startTime: '13:30',
    endTime: '17:45',
    duration: 4.25,
    status: 'completed',
    notes: 'Dashboard ekranları tasarlandı',
  },
  {
    id: 'TRK003',
    date: '2025-01-20',
    project: 'Scrumboard',
    task: 'Hata düzeltme',
    startTime: '10:00',
    endTime: '10:45',
    duration: 0.75,
    status: 'completed',
  },
  {
    id: 'TRK004',
    date: '2025-01-21',
    project: 'Portal Intellium',
    task: 'Veritabanı optimizasyonu',
    startTime: '09:15',
    endTime: null,
    duration: 2.5,
    status: 'in-progress',
  },
];

const getTodayTotal = () => {
  const today = new Date().toISOString().split('T')[0];
  return mockTimeEntries
    .filter((entry) => entry.date === today)
    .reduce((sum, entry) => sum + entry.duration, 0);
};

const getWeeklyTotal = () =>
  mockTimeEntries.reduce((sum, entry) => sum + entry.duration, 0);

const stats = (todayTotal: number, weeklyTotal: number) => [
  {
    title: 'Bugünkü Çalışma Süresi',
    value: todayTotal.toFixed(2),
    suffix: 'saat',
    color: colorPalette.primary,
  },
  {
    title: 'Bu Haftanın Toplam',
    value: weeklyTotal.toFixed(2),
    suffix: 'saat',
    color: '#52c41a',
  },
  {
    title: 'Hedef Saatler',
    value: '40',
    suffix: 'saat',
    color: colorPalette.textSecondary,
  },
];

const columns: ColumnsType<TimeEntry> = [
  {
    title: 'Tarih',
    dataIndex: 'date',
    key: 'date',
    width: 100,
  },
  {
    title: 'Proje',
    dataIndex: 'project',
    key: 'project',
    width: 150,
  },
  {
    title: 'Görev',
    dataIndex: 'task',
    key: 'task',
    width: 150,
  },
  {
    title: 'Başlama',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 90,
  },
  {
    title: 'Bitiş',
    dataIndex: 'endTime',
    key: 'endTime',
    width: 90,
    render: (endTime: string | null) => endTime || '-',
  },
  {
    title: 'Süre (Saat)',
    dataIndex: 'duration',
    key: 'duration',
    width: 110,
    render: (duration: number) => duration.toFixed(2),
  },
  {
    title: 'Durum',
    dataIndex: 'status',
    key: 'status',
    width: 110,
    render: (status: string) => (
      <Tag
        color={status === 'completed' ? '#52c41a' : colorPalette.primary}
      >
        {status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
      </Tag>
    ),
  },
  {
    title: 'Notlar',
    dataIndex: 'notes',
    key: 'notes',
    width: 200,
    ellipsis: true,
    render: (notes: string | undefined) => notes || '-',
  },
  {
    title: 'İşlemler',
    key: 'actions',
    width: 120,
    render: (_: unknown, record: TimeEntry) => (
      <Space size="small">
        {record.status === 'in-progress' ? (
          <>
            <Button
              type="text"
              size="small"
              icon={<PauseCircleOutlined />}
              title="Duraklat"
            />
          </>
        ) : (
          <>
            <Button
              type="text"
              size="small"
              icon={<PlayCircleOutlined />}
              title="Başlat"
            />
          </>
        )}
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          title="Sil"
        />
      </Space>
    ),
  },
];

const TimeTrackingPage: React.FC = () => {
  const todayTotal = getTodayTotal();
  const weeklyTotal = getWeeklyTotal();
  const statsRow = stats(todayTotal, weeklyTotal);

  return (
    <PageContainer
      title="Puantaj"
      subtitle="Zaman takip etme ve raporlama"
    >
      <Row gutter={[16, 16]} style={{ marginBottom: spacing['2xl'] }}>
        {statsRow.map(({ title, value, suffix, color }) => (
          <Col key={title} xs={24} sm={12} md={8}>
            <SectionCard variant="default">
              <Statistic title={title} value={value} suffix={suffix} valueStyle={{ color }} />
            </SectionCard>
          </Col>
        ))}
      </Row>

      <SectionCard variant="default">
        <Table
          columns={columns}
          dataSource={mockTimeEntries}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1300 }}
        />
      </SectionCard>
    </PageContainer>
  );
};

export default TimeTrackingPage;
