import { AppShell } from '@mantine/core';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

import { AdvertisementPage, HomePage, NotFoundPage, StatsPage } from '@/pages';
import { ROUTES } from '@/shared/lib';
import { Footer, Header } from '@/shared/ui';

const Layout = () => (
  <AppShell padding={{ base: 'md', lg: 'xl' }}>
    <Header />
    <Outlet />
    <Footer />
  </AppShell>
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.ADVERTISEMENT, element: <AdvertisementPage /> },
      { path: ROUTES.STATISTIC, element: <StatsPage /> }
    ]
  }
]);

export const App = () => <RouterProvider router={router} />;
