import type { Metadata } from "next";
import { LoginView } from "./login-view";

export const metadata: Metadata = { title: "Masuk" };

export default function MasukPage() {
  return <LoginView />;
}
