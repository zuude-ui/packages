import "@workspace/ui/globals.css";
import { AppWrapper } from "@workspace/ui/provider/app-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppWrapper>{children}</AppWrapper>;
}
