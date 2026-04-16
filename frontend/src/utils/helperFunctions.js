export default function getDefaultRouteByRole(role){
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