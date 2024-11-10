import { auth } from "@/auth";
import AppSidebar from "@/components/globals/sidebar";
import { Button } from "@/components/ui/button";
import { BellDot } from "lucide-react";

const MainLayout = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className="flex flex-col">
            <AppSidebar />
            <div className="flex-1 overflow-y-auto md:ml-64">
                <AppHeader />
                <main className="container p-4 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

const AppHeader = async () => {
    const session = await auth();
    const user = session?.user;
    if (!user) return null;

    return (
        <div className="shadow-md sticky top-0 flex items-center justify-between p-4 h-16 bg-primary-foreground text-primary-background border-b border-primary-background">
            <h2 className="text-2xl font-semibold p-4">
                Welcome back, {user.name}!
            </h2>
            <>
                <Button
                    className="flex items-center space-x-2"
                    variant="ghost"
                    size="sm"
                >
                    <BellDot />
                </Button>
            </>
        </div>
    );
}
 
export default MainLayout;