import React from 'react';

export default function PageContainer({
  children,
  scrollable = true
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <div className={`h-[calc(100dvh-52px)] w-full overflow-auto p-4 md:px-6`}>
      {children}
    </div>
  );
}
