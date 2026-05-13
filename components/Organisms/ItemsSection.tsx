import React from "react";

export type ItemsSectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export const ItemsSection = ({
  title,
  children,
  className = "",
}: ItemsSectionProps) => {
  return (
    <section className={className}>
      {title && (
        <h2 className="flex flex-wrap items-center justify-center mt-12 sm:text-2xl">
          {title}
        </h2>
      )}

      <div className="flex flex-wrap items-center justify-center">
        {children}
      </div>
    </section>
  );
};
