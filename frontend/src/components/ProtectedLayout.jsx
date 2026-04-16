import { Navigate, Outlet, } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

export default function ProtectedLayout({allowedRoles}){
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    if (!token || !user){
        return <Navigate to='/login' replace/>
   }

   if (!allowedRoles.includes(user.role)){
    return <Navigate to={getDefaultRouteByRole(user.role)} replace/>
   }

    // if (!isAuthenticated()){
    // }
    // }

    return <Outlet/>
}


function getDefaultRouteByRole(role){
    switch (role){
        case 'admin':
            return '/admin'
        case 'user':
            return '/sme'
        case 'fundManager':
            return '/fund-manager'
        default:
            return '/login'
    }
}