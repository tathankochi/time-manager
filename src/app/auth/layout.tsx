import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProvider } from "@/lib/contexts/UserContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              StudyFlow
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ứng dụng quản lý thời gian dành cho sinh viên Việt Nam
            </p>
          </div>

          <Card className="w-full shadow-xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </UserProvider>
  );
}