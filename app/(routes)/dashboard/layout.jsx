// DashboardLayout.js
"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    if (result?.length == 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full md:w-64 z-50">
        <SideNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      </div>
      <div className="md:ml-64 flex-1">
        <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;