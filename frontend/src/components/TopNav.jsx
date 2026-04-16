import { Button } from "./ui/button"
import { Bell, ChevronDown, Menu } from "lucide-react"
import {
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem 
} from "./ui/dropdown-menu"

import { Avatar, AvatarFallback } from "./ui/avatar"
import { logoutUser } from "@/utils/auth"
import { useNavigate } from "react-router-dom"

export default function TopNav(){

    const userName = "LeanTechnovations"
    const navigate = useNavigate()


    function logoutButton(){
        logoutUser()
        navigate("/login", {replace: true})
    }

    return(
        <>
            <div className="border-b bg-card sticky top-0 z-40">
                <div className="flex items-center justify-between px-4 lg:px-6 h-16">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground uppercase tracking-wider">
                            Menu
                            </span>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary-foreground">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <span className="hidden sm:inline">DP World ESD Hub</span>
                    </div>        

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-danger-color rounded-full" />
                        </Button>

                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2">
                                <Avatar className="h-8 w-8">
                                <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="hidden sm:inline">{userName}</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logoutButton}>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>
        </>

    )
}
