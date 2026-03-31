import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Bell } from "lucide-react";
import profileImg from "@/assets/profile-image.jpg";

export const Header = () => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                OurVault
            </h1>

            <div className="flex items-center gap-x-3">
                
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                </button>

                <button className="btn-ghost size-10">
                    <Bell size={20} />
                </button>


                <button className="size-10 overflow-hidden rounded-full">
                    <img
                        src={profileImg}
                        alt="profile image"
                        className="size-full object-cover"
                    />
                </button>
            </div>
        </header>
    );
};