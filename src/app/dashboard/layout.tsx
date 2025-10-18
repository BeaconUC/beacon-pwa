import type { Metadata } from "next";
import Header from "../../components/shared/Header";

export const metadata: Metadata = {
  title: "Smart Outage Manager Dashboard",
  description: "Dashboard for efficient outage reporting and dispatch system.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </>
  );
}