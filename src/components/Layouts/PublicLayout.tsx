import React, { PropsWithChildren }  from 'react';

const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="public-layout bg-primary">{children}</div>
    </>
  )
}
export default PublicLayout;
