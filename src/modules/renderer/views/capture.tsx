import React from 'react';
import {Capture} from '@react-loadable/revised';

export default (
  ServerApp: (location) => JSX.Element,
  data: any,
  dropzones: any,
  location: string,
  modules: any,
  pages: any,
) => {
  return (
    <Capture report={(moduleName) => modules.push(moduleName)}>
      <ServerApp location={location} data={data} dropzones={dropzones} pages={pages} />
    </Capture>
  );
};
