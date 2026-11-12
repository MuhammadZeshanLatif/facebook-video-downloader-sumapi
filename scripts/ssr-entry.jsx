import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from '../src/App.jsx';

export function renderRoute(route) {
  globalThis.__prerenderSeo = null;
  const html = renderToString(
    <StaticRouter location={route}>
      <AppRoutes />
    </StaticRouter>
  );
  return { html, seo: globalThis.__prerenderSeo };
}
