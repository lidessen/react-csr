import { useState, useEffect } from 'react';
import React from 'react';

export const NoSSR: React.FC = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  return isClient ? <>{children}</> : <></>;
};

export function noSSR<P extends {}>(
  Any: React.FC<P> | (typeof React.Component)
): React.FC<P> {
  return props => (
    <NoSSR>
      <Any {...props} />
    </NoSSR>
  );
}
