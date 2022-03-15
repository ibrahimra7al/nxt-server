import React from 'react';

export default (
  ServerApp: (location) => JSX.Element,
  data: any,
  dropzones: any,
  pages: any,
  location: string,
) => {
  return (
    <ServerApp
      location={location}
      data={data}
      dropzones={dropzones}
      pages={pages}
    />
  );
};
