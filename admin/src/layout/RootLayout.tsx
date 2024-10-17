import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuthStore } from "../store/authStore";
import { Menu } from "../Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section>
      {isAuthenticated && <Menu />}
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </section>
  );
};
