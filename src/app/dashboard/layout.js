import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="">
        <div className="flex ">
          <div className="">
            <AppSidebar pageName={"dashboard"} />
          </div>
          <div className="py-20">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
