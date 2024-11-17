'use client';

import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmog, faChartSimple, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import clsx from 'clsx';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon:  faSmog,
  },
  {
    title: "Support",
    url: "/support",
    icon: faCommentDots,
  },
]

export function AppSidebar() {
    const pathname = usePathname();
    return (
      <Sidebar className="dark">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <Link href={item.url}  className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 text-white',
                        {
                            'bg-slate-800 text-white': pathname === item.url,
                        },
                        )}>   
                        
                         <FontAwesomeIcon icon={item.icon} />
                         {item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  } 