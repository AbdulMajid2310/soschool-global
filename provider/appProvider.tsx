'use client';

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProviders } from "@/provider/ThemeProviders";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProviders>
        {children}
      </ThemeProviders>
    </Provider>
  );
}