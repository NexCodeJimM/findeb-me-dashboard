import NavigationDesktop from "@/components/common/modules/NavigationDesktop/NavigationDesktop";

export const metadata = {
  title: "Dashboard | FINDEB FZCO Admin Console",
  description: "Generated by create next app",
};

export default function DashboardLayout({ children }) {
  return <NavigationDesktop>{children}</NavigationDesktop>;
}
