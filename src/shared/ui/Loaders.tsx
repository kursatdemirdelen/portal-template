import React from "react";
import { Spin, Skeleton } from "antd";

export const PageLoader: React.FC<{ minHeight?: number }> = ({
  minHeight = 400,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight,
    }}
  >
    <Spin size="large" />
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 6 }) => (
  <div>
    <Skeleton active paragraph={{ rows: 1 }} />
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton
        key={i}
        active
        title={false}
        paragraph={{ rows: 1, width: "80%" }}
      />
    ))}
  </div>
);

export const CardSkeleton: React.FC = () => (
  <Skeleton active title={{ width: 180 }} paragraph={{ rows: 3 }} />
);
