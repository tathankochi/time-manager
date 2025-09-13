"use client"
import { Navigation } from "@/components/layout/navigation";
import { UserProvider } from "@/lib/contexts/UserContext";
import { TaskProvider } from "@/lib/contexts/TaskContext";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <TaskProvider>
        <Navigation />
        <main className="pl-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </TaskProvider>
    </UserProvider>
  );
}
