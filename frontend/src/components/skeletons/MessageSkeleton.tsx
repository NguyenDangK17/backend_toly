import React from "react";
import styled from "styled-components";

const SkeletonCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
`;

const SkeletonRect = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ccc;
`;

const SkeletonContainer = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const MessageSkeleton: React.FC = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonCircle className="shrink-0" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <SkeletonRect />
          <SkeletonRect />
        </div>
      </SkeletonContainer>
      <SkeletonContainer style={{ justifyContent: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <SkeletonRect />
        </div>
        <SkeletonCircle className="shrink-0" />
      </SkeletonContainer>
    </>
  );
};

export default MessageSkeleton;
