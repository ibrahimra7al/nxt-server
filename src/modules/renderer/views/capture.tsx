import React from 'react';
import Loadable from 'react-loadable';

export default (
  ServerApp: (location) => JSX.Element,
  data: any,
  location: string,
  modules: any,
) => {
  return (
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
      <ServerApp location={location} data={data} />
    </Loadable.Capture>
  );
};
