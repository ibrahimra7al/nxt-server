import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { WidgetDataProvider } from '@atypon/nxt-utils/providers/widget-data';
import App from '@atypon/nxt-utils/core/pages';
import { DropzoneDataProvider } from '@atypon/nxt-utils/providers/dropzone-data';

export default ({
  data,
  dropzones,
  location,
  pages,
}: {
  data: any;
  dropzones: any;
  pages: any;
  location: string;
}) => {
  return (
    <DropzoneDataProvider value={dropzones}>
      <WidgetDataProvider value={data}>
        <StaticRouter location={location}>
          <App pages={pages} />
        </StaticRouter>
      </WidgetDataProvider>
    </DropzoneDataProvider>
  );
};
