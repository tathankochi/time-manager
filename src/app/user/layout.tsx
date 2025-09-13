"use client"
import { Navigation } from "@/components/layout/navigation";
import { UserProvider } from "@/lib/contexts/UserContext";
import { TaskProvider } from "@/lib/contexts/TaskContext";
import { useState } from "react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeModule, setActiveModule] = useState("dashboard");

  return (
    <UserProvider>
      <TaskProvider>
        <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="pl-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </TaskProvider>
    </UserProvider>
  );
}
