import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { WidgetDataProvider } from '@atypon/nxt-utils/providers/widget-data';
import App from '@atypon/nxt-utils/core/pages';

export default ({ data, location }: { data: any; location: string }) => {
  return (
    <WidgetDataProvider value={data}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </WidgetDataProvider>
  );
};
