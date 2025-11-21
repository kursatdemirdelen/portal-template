import React from "react";
import { PageContainer, SectionCard } from "@/shared/ui";
import { AssignmentDetailsTable } from "@/features/assignments/ui/AssignmentDetailsTable";
import type { AssignmentDetail } from "@/features/assignments/model";

const assignmentDetails: AssignmentDetail[] = [
  {
    id: "ZB-001",
    asset: "MacBook Pro 14”",
    owner: "Ahmet Yılmaz",
    location: "İstanbul",
    status: "active",
    checkoutDate: "2025-01-05",
    dueDate: "2025-12-31",
  },
  {
    id: "ZB-002",
    asset: "Dell Monitor 27”",
    owner: "Zeynep Demir",
    location: "Remote",
    status: "maintenance",
    checkoutDate: "2024-11-12",
    dueDate: "2025-02-10",
  },
  {
    id: "ZB-003",
    asset: "Logitech MX Keys",
    owner: "Can Çimşek",
    location: "Ankara",
    status: "returned",
    checkoutDate: "2024-05-10",
    dueDate: "2024-12-01",
  },
];

const AssignmentInfoPage: React.FC = () => (
  <PageContainer
    title="Zimmet Bilgileri"
    subtitle="Ekipman zimmetlerini detaylı görüntüleyin"
  >
    <SectionCard variant="default">
      <AssignmentDetailsTable assignments={assignmentDetails} />
    </SectionCard>
  </PageContainer>
);

export default AssignmentInfoPage;
