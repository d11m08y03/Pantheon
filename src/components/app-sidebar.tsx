import { Bot, Calculator, CodeXml, LucideIcon, Waves } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LinksEnum } from "@/lib/LinksEnum";
import { NavUser } from "./nav-user";

interface Links {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface SidebarSectionProps {
  sectionName: string;
  links: Links[];
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  sectionName,
  links,
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{sectionName}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.title}>
              <SidebarMenuButton asChild>
                <a href={link.url}>
                  <link.icon />
                  <span>{link.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const AppSidebar = () => {
  const events: Links[] = [
    {
      title: "Outings",
      url: LinksEnum.OUTINGS,
      icon: Waves,
    },
    {
      title: "App Cup",
      url: LinksEnum.APP_CUP,
      icon: CodeXml,
    },
  ];

  const utilities: Links[] = [
    {
      title: "CPA Calculator",
      url: LinksEnum.CPA_CALCULATOR,
      icon: Calculator,
    },
    {
      title: "AI Detector",
      url: LinksEnum.AI_DETECTOR,
      icon: Bot,
    },
  ];

  const user = {
    name: "hello",
    email: "hello@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarSection sectionName="Events" links={events} />
        <SidebarSeparator />
        <SidebarSection sectionName="Utilities" links={utilities} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
