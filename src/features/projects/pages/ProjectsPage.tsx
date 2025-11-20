import React from 'react';
import { Row, Col, Progress, Button, Space, Tag } from 'antd';
import { TeamOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@/shared/ui/PageContainer';
import { SectionCard } from '@/shared/ui/SectionCard';

interface Project {
  id: string;
  name: string;
  status: 'Active' | 'On Hold' | 'Completed';
  progress: number;
  team: number;
  startDate: string;
  endDate: string;
  description: string;
}

const ProjectsPage: React.FC = () => {
  const mockProjects: Project[] = [
    {
      id: 'PRJ-001',
      name: 'Portal Intellium',
      status: 'Active',
      progress: 76,
      team: 5,
      startDate: '2025-09-01',
      endDate: '2025-12-15',
      description: 'Kurumsal portal uygulaması',
    },
    {
      id: 'PRJ-002',
      name: 'Mobile Uygulama',
      status: 'Active',
      progress: 42,
      team: 3,
      startDate: '2025-10-01',
      endDate: '2026-01-30',
      description: 'iOS ve Android uygulaması',
    },
    {
      id: 'PRJ-003',
      name: 'Scrumboard',
      status: 'Active',
      progress: 23,
      team: 2,
      startDate: '2025-11-01',
      endDate: '2026-03-31',
      description: 'Proje yönetim aracı',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: 'success',
      'On Hold': 'warning',
      Completed: 'default',
    };
    return colors[status] || 'default';
  };

  return (
    <PageContainer 
      title="Projeler" 
      subtitle="Aktif ve geçmiş projeleri yönet"
      extra={<Button type="primary" icon={<PlusOutlined />}>Yeni Proje</Button>}
    >
      <Row gutter={[16, 16]}>
        {mockProjects.map((project) => (
          <Col key={project.id} xs={24} sm={12} lg={8}>
            <SectionCard title={project.name} subtitle={project.description} padding="medium">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Status Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tag color={getStatusColor(project.status)}>{project.status}</Tag>
                  <span style={{ color: '#7f8c8d', fontSize: 12 }}>ID: {project.id}</span>
                </div>

                {/* Progress */}
                <div>
                  <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: '#7f8c8d' }}>İlerleme</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#5b7aed' }}>{project.progress}%</span>
                  </div>
                  <Progress percent={project.progress} strokeColor="#5b7aed" format={() => null} />
                </div>

                {/* Team & Dates */}
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <TeamOutlined style={{ color: '#5b7aed', fontSize: 14 }} />
                      <span style={{ fontSize: 12, color: '#7f8c8d' }}>{project.team} kişi</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CalendarOutlined style={{ color: '#5b7aed', fontSize: 14 }} />
                      <span style={{ fontSize: 12, color: '#7f8c8d' }}>{project.endDate}</span>
                    </div>
                  </Col>
                </Row>

                {/* Actions */}
                <Space style={{ width: '100%', marginTop: 8 }}>
                  <Button type="text" size="small" style={{ flex: 1 }}>Detaylar</Button>
                  <Button type="text" size="small" style={{ flex: 1 }}>Düzenle</Button>
                </Space>
              </div>
            </SectionCard>
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};

export default ProjectsPage;
