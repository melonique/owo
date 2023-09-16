import React, { PropsWithChildren }  from 'react';

const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="public-layout">{children}</div>
    </>
  )
}
export default PublicLayout;
