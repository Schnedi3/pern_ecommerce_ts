import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Footer, Menu } from "../Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Menu />
      <Outlet />
      <Footer />
    </QueryClientProvider>
  );
};
