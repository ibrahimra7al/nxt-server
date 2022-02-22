import React from 'react';

export default (
  ServerApp: (location) => JSX.Element,
  data: any,
  location: string,
) => {
  return <ServerApp location={location} data={data} />;
};
