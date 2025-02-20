import React, { forwardRef, ReactNode } from "react";

type SpaceProps = {
  children: ReactNode;
  style?: string;
};

const Space = forwardRef<HTMLDivElement, SpaceProps>(({ children, style }, ref) => {
  return (
    <div ref={ref} className={`${style} text-lg`}>
      {children}
    </div>
  );
});

export default Space;
