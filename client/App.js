import "react-native-gesture-handler";
import React from "react";
import Navigation from "./screens/components/Navigation/Navigation";
import { AuthContextProvider } from "./context/AuthContex";
import { DarkModeContextProvider } from "./context/DarkMode";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DarkModeContextProvider>
          <Navigation />
        </DarkModeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
