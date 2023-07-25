import React, { PropsWithChildren }  from 'react';

const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="bg-primary">{children}</main>
    </>
  )
}
export default PublicLayout;
