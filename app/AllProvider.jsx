"use client";

import { StoreProvider } from "../RTK/storcontext";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ReduxProvider from "../RTK/ReduxProvider";

export default function AllProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReduxProvider>
        <StoreProvider>
          {children}
          <Toaster richColors position="bottom-right" />{" "}
        </StoreProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
