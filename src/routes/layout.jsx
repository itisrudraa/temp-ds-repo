import { Outlet } from "react-router-dom";
import { Header } from "@/layouts/header";

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <Header />
            <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;