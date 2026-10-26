import { AppShell } from "@/components/app-shell";

export default function SupervisorLayout({ children }: LayoutProps<"/supervisor">) {
  return <AppShell area="supervisor">{children}</AppShell>;
}
