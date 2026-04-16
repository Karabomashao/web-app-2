import TopNav from "./TopNav";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  PieChart,
  Bell,
  FileText
} from "lucide-react";

export default function AdminLayout() {

    const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard},
    { to: "sme-management", label: "SME Management", icon: Building2 },
    { to: "funding-pipeline", label: "Funding Pipeline", icon: PieChart },
    { to: "alerts", label: "Alerts", icon: Bell },
    { to: "reports", label: "Reports", icon: FileText },
    { to: "admin-settings", label: "Settings", icon: Settings },

  ]

    return (
         <div className="flex flex-col h-screen bg-background text-foreground">
                <TopNav/>
        
                <div className="flex flex-1 min-h-0">
                    <aside
                        className={
                            `${isCollapsed ? "justify-center px-0 py-2.5": "px-3 py-2.5 gap-3"}
                            border-r border-border bg-card h-full flex flex-col transition-all duration-300` 
                        }
                    >
                        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
                            {navItems.map((item) => {
                                const Icon = item.icon
        
                                return(
                                    <NavLink 
                                        key={item.to} 
                                        to={item.to}
                                        end={item.to === '/admin'}
                                    >
                                        {({ isActive }) => (
                                            <div
                                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-fast
                                                    ${
                                                        isActive 
                                                        ? "bg-primary text-primary-foreground"
                                                        : "text-foreground hover:bg-accent"
                                                    }
                                                `}
                                        >
                                            <Icon className="h-5 w-5 shrink-0" />
        
                                            {!isCollapsed && (
                                                <>
                                                <span className="flex-1 text-left">{item.label}</span>
                                                
                                                {/* This is for the badge */}
                                                {/* {item.badge && (
                                                    <Badge
                                                    className="ml-auto"
                                                    variant={isActive ? "secondary" : "default"}
                                                    >
                                                    {item.badge}
                                                    </Badge>
                                                )} */}
                                                </>
                                            )} 
                                        </div>
                                    )}
                                    </NavLink>
                                )
                            })}
                        </nav>
        
                        <div className="p-4 border-t">
                            <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={`
                                w-full flex items-center justify-center py-2 rounded-lg border border-gray-200 
                                text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200
                            `}
                            >
                            {isCollapsed ? (
                                <ChevronRight size={16} />
                            ) : (
                                <>
                                <ChevronLeft size={16} />
                                <span className="ml-2 text-sm font-medium">Collapse</span>
                                </>
                            )}
                            </button>
                        </div>
                    </aside>
        
                    <main className="flex-1 min-h-0 overflow-y-auto bg-background">
                        <Outlet/>
                    </main>
                </div>
            </div>
    )
}