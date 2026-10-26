import { AppShell } from "@/components/app-shell";

export default function QcLayout({ children }: LayoutProps<"/qc">) {
  return <AppShell area="qc">{children}</AppShell>;
}
