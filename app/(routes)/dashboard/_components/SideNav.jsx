import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  Menu,
  X
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static h-screen p-5 border shadow-sm bg-white z-40
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64`}
      >
        <div className="flex flex-row items-center">
          <span className="text-blue-800 font-bold text-xl">Budgee</span>
        </div>

        <div className="mt-5">
          {menuList.map((menu, index) => (
            <Link 
              href={menu.path} 
              key={index}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <h2
                className={`flex gap-2 items-center
                  text-gray-500 font-medium
                  mb-2 p-4 cursor-pointer rounded-full
                  hover:text-primary hover:bg-blue-100
                  ${path === menu.path && "text-primary bg-blue-100"}
                `}
              >
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-10 p-5 flex gap-2 items-center">
          <UserButton />
          <span>Profile</span>
        </div>
      </div>
    </>
  );
}

export default SideNav;