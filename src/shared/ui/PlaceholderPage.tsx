import React from "react";
import { Typography } from "antd";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
  description?: string;
  checklist?: string[];
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle,
  description,
  checklist = [],
}) => {
  return (
    <PageContainer title={title} subtitle={subtitle ?? "İçerik yakında eklenecek"}>
      <SectionCard variant="default">
        {description && (
          <Typography.Paragraph style={{ marginBottom: 16 }}>
            {description}
          </Typography.Paragraph>
        )}
        {checklist.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {checklist.map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>
                <Typography.Text>{item}</Typography.Text>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </PageContainer>
  );
};

export default PlaceholderPage;
