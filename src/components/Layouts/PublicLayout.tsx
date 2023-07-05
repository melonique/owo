import React, { PropsWithChildren }  from 'react';

const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
export default PublicLayout;
