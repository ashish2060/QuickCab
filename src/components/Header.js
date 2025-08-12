"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { MapContext } from "@react-google-maps/api";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  CarTaxiFront,
  KeySquare,
  LayoutDashboard,
  PackageOpen,
  PenBoxIcon,
} from "lucide-react";

const navItems = [
  {
    id: 1,
    title: "Ride",
    // icon: "/taxi.png",
    nav: "/",
    icon: <CarTaxiFront size={18} />,
  },
  // {
  //   id: 2,
  //   title: "Package",
  //   // icon: "/package.png",
  //   nav: "/package",
  //   icon: <PackageOpen size={18} />,
  // },
  {
    id: 3,
    title: "Rent",
    // icon: "/rent.png",
    nav: "/rentcar",
    icon: <KeySquare size={18} />,
  },
];

const Header = () => {
  // const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div className=" fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b flex p-3 px-6 items-center justify-between">
      <i className="text-md sm:text-2xl font-bold text-blue-800">Quick Cab</i>

      <SignedIn>
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center cursor-pointer relative"
              >
                <Link
                  href={item.nav}
                  className="text-gray-600 hover:text-blue-600 "
                >
                  <Button variant="outline" className="flex items-center">
                    {/* <CarTaxiFront size={18} /> */}
                    {item.icon}

                    <span className="hidden md:inline">{item.title}</span>
                  </Button>
                </Link>
                {/* {activeIndex == item.id && (
                  <div className="w-full h-[2px] bg-blue-400 absolute bottom-0"></div>
                )} */}
              </div>
            );
          })}
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <Link href={"/dashboard"}>
              <Button>
                <PenBoxIcon />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>
          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
