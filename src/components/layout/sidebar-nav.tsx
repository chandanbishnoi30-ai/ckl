
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Trophy, 
  Calendar, 
  BarChart3, 
  Settings,
  PlusCircle,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Stats Entry", icon: PlusCircle, href: "/stats/entry" },
  { name: "Matches", icon: Trophy, href: "/matches" },
  { name: "Schedule", icon: Calendar, href: "/schedule" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Trophy className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight group-data-[collapsible=icon]:hidden font-headline">
            CKL Official
          </span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu className="px-2 py-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarSeparator className="my-2" />
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/coach/100/100" />
                <AvatarFallback>CH</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden text-sm">
                <span className="font-medium truncate">Coach Harrison</span>
                <span className="text-xs text-muted-foreground truncate">Head Coach</span>
              </div>
              <button className="ml-auto p-1 hover:bg-muted rounded-md transition-colors">
                <LogOut className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
