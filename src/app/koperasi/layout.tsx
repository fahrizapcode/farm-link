import { AppShell } from "@/components/app-shell";

export default function KoperasiLayout({ children }: LayoutProps<"/koperasi">) {
  return <AppShell area="koperasi">{children}</AppShell>;
}
