import React from "react";
import { PageContainer, SectionCard } from "@/shared/ui";
import { AssignmentsTable } from "@/features/assignments/ui/AssignmentsTable";
import { mockAssignments } from "@/shared/data/mocks";

const AssignmentsPage: React.FC = () => (
  <PageContainer
    title="Zimmetler"
    subtitle="Atanan görevleri ve zimmetleri yönetin"
  >
    <SectionCard variant="default">
      <AssignmentsTable assignments={mockAssignments} />
    </SectionCard>
  </PageContainer>
);

export default AssignmentsPage;
