import React from "react";
import { Row, Col } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "@/shared/ui";
import type { BreadcrumbItem } from "@/shared/hooks/useBreadcrumbs";
import {
  TicketMetaCard,
  TicketDescription,
  TicketAttachments,
  TicketEfforts,
  TicketTimeline,
  TicketProjectCard,
  TicketComments,
} from "../ui/ticket-detail";
import { TicketHeader } from "../ui/shared";
import { mockTicketDetail } from "../data/ticketDetail";

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - gerçek uygulamada API'den gelecek
  const ticket = mockTicketDetail;

  const handleStatusChange = (status: string) => {
    console.log("Status changed to:", status);
    // TODO: API call
  };

  const handleEdit = () => {
    navigate(`/tickets/${id}/edit`);
  };

  const handleAddComment = (content: string) => {
    console.log("New comment:", content);
    // TODO: API call
  };

  const handleAddEffort = (effort: {
    date: string;
    time: string;
    hours: number;
    description: string;
  }) => {
    console.log("New effort:", effort);
    // TODO: API call
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Biletler", href: "/tickets" },
    { title: ticket.id },
  ];

  return (
    <PageContainer
      title={ticket.title}
      breadcrumbs={breadcrumbs}
      showBackButton
      extra={
        <TicketHeader
          status={ticket.status}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
        />
      }
    >
      <Row gutter={[24, 24]}>
        {/* Sağ Kolon - Meta Bilgiler (Mobilde Üstte) */}
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 8, order: 2 }}>
          <TicketMetaCard
            status={ticket.status}
            resolved={ticket.resolved}
            assignee={ticket.assignee}
            project={ticket.project}
            assignedDate={ticket.assignedDate}
            resolvedAt={ticket.resolvedAt}
          />

          {ticket.projectInfo && (
            <div style={{ marginTop: 16 }}>
              <TicketProjectCard {...ticket.projectInfo} />
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <TicketTimeline history={ticket.history} />
          </div>
        </Col>

        {/* Sol Kolon - Ana İçerik (Mobilde Altta) */}
        <Col xs={{ span: 24, order: 2 }} lg={{ span: 16, order: 1 }}>
          <TicketDescription
            description={ticket.description}
            createdBy={ticket.createdBy}
            createdAt={ticket.createdAt}
            requestType={ticket.requestType}
            closedDate={ticket.closedDate}
          />

          <TicketAttachments attachments={ticket.attachments} />

          <TicketEfforts
            efforts={ticket.efforts}
            onAddEffort={handleAddEffort}
          />

          <TicketComments
            comments={ticket.comments}
            onAddComment={handleAddComment}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default TicketDetailPage;
