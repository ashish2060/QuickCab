import { Calendar, Home, Inbox, Search, Settings, Car } from "lucide-react"
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
import Link from "next/link"



export default function AppSidebar({ pageName }) {

    // Menu items.
    const items = pageName == "dashboard" ? [
        {
            title: "Cab Rides",
            url: "/dashboard/cabrides",
            icon: Home,
        },
        {
            title: "Bookings",
            url: "/dashboard",
            icon: Car,
        },

        {
            title: "History",
            url: "/dashboard/history",
            icon: Calendar,
        },

    ] : [
        {
            title: "New Cab Rides",
            url: "/admin/cabrides",
            icon: Home,
        },
        {
            title: "New Bookings",
            url: "/admin",
            icon: Car,
        },
        {
            title: "Add Cars",
            url: "/admin/addcars",
            icon: Inbox,
        },
        {
            title: "Delete Cars",
            url: "/admin/deletecars",
            icon: Calendar,
        },
        {
            title: "All Bookings",
            url: "/admin/allbookings",
            icon: Settings,
        },
    ]

    return (
        <Sidebar>
            <SidebarContent className="py-14">
                <SidebarGroup>
                    <SidebarGroupLabel>{pageName == "admin" ? "Admin" : "Dashboard"}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
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
