import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div>
        <AppSidebar pageName={"admin"} />
      </div>
      <div className="py-[65px] w-full">{children}</div>
    </SidebarProvider>
  );
};

export default AdminLayout;
