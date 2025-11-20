import React from 'react';
import { Table, Badge, Button, Space, Tag } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageContainer } from '@/shared/ui/PageContainer';
import { SectionCard } from '@/shared/ui/SectionCard';

interface Ticket {
  id: string;
  title: string;
  project: string;
  status: 'Open' | 'In Progress' | 'Review' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  createdAt: string;
}

const TicketsPage: React.FC = () => {
  const mockTickets: Ticket[] = [
    {
      id: 'TKT-001',
      title: 'Login sayfası tasarla',
      project: 'Portal',
      status: 'Done',
      priority: 'High',
      assignee: 'Ahmet Yılmaz',
      createdAt: '2025-11-15',
    },
    {
      id: 'TKT-002',
      title: 'API entegrasyonu',
      project: 'Portal',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Ayşe Kaya',
      createdAt: '2025-11-18',
    },
    {
      id: 'TKT-003',
      title: 'Responsive tasarım',
      project: 'Mobile App',
      status: 'Review',
      priority: 'Medium',
      assignee: 'Mehmet Demir',
      createdAt: '2025-11-10',
    },
    {
      id: 'TKT-004',
      title: 'Database schema',
      project: 'Backend',
      status: 'Open',
      priority: 'High',
      assignee: 'Fatih Yıldız',
      createdAt: '2025-11-20',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Open: 'default',
      'In Progress': 'processing',
      Review: 'warning',
      Done: 'success',
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      High: '#e74c3c',
      Medium: '#f39c12',
      Low: '#27ae60',
    };
    return colors[priority];
  };

  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: 'Başlık',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Proje',
      dataIndex: 'project',
      key: 'project',
      width: 120,
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Badge status={getStatusColor(status) as 'success' | 'processing' | 'default' | 'error' | 'warning'} text={status} />
      ),
    },
    {
      title: 'Öncelik',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)} style={{ marginRight: 0 }}>
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Atanan Kişi',
      dataIndex: 'assignee',
      key: 'assignee',
      width: 150,
    },
    {
      title: 'Tarih',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: 'İşlemler',
      key: 'actions',
      width: 120,
      render: () => (
        <Space size="small">
          <Button type="text" size="small" icon={<EyeOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title="Biletler" subtitle="Proje biletlerini yönet">
      <SectionCard title="Tüm Biletler" padding="medium">
        <Table
          columns={columns}
          dataSource={mockTickets.map((ticket, idx) => ({ ...ticket, key: idx }))}
          pagination={{ pageSize: 10 }}
          bordered={false}
          style={{ marginTop: 12 }}
        />
      </SectionCard>
    </PageContainer>
  );
};

export default TicketsPage;
