// src/components/app-sidebar.tsx
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@workspace/ui/components/sidebar"
import {
  Package,
  ShoppingCart,
  Box
} from "lucide-react"

const navigationItems = [
  {
    title: "Products",
    url: "/", // Main products dashboard route
    icon: Package,
  },
  {
    title: "Sales",
    url: "/sales", // Sales page route
    icon: ShoppingCart,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Box className="h-5 w-5 shrink-0" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none truncate group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm truncate">Inventory Manager</span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 group-data-[collapsible=icon]:hidden">
        <div className="text-xs text-muted-foreground">
          System Status: <span className="text-emerald-500 font-medium">Online</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
