import React from 'react';

export default (
  ServerApp: (location) => JSX.Element,
  data: any,
  dropzones: any,
  pages: any,
  location: string,
  boilerplate:boolean,

) => {
  return (
    <ServerApp
      location={location}
      data={data}
      dropzones={dropzones}
      pages={pages}
      boilerplate={boilerplate}
    />
  );
};
