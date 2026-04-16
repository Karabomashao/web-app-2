// const API_BASE = "https://esdhub-backend-a0atcvdzbddegfac.southafricanorth-01.azurewebsites.net"

// export async function getCurrentUser() {
//   const res = await fetch(`${API_BASE}/auth/session`, {
//     credentials: "include",
//   })

//   const session = await res.json()
//   return session?.user || null
// }

export function isAuthenticated() {
  return !!localStorage.getItem('token')
}

// export function loginWithGoogle() {
//   window.location.href =
//     `${API_BASE}/auth/signin?callbackUrl=https://thankful-ground-04f584e0f.4.azurestaticapps.net`
// }

export function logoutUser() {
  localStorage.removeItem('token')

}
