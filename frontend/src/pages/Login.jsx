import { useNavigation, Form, redirect, useActionData } from "react-router-dom"

import { 
    Card, 
    CardHeader, 
    CardTitle,
    CardDescription,
    CardContent 
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import getDefaultRouteByRole from "@/utils/helperFunctions"

// //This request is deconstructed to return a request param
export async function Action({ request }) {
    const devURL_ = "http://localhost:3000"
    const devURL = "https://web-app-backend-bqf8bhgvdmg4edbc.southafricanorth-01.azurewebsites.net"
    const formData = await request.formData()
    const username = formData.get('username')
    const password = formData.get('password')

    const res = await fetch(`${devURL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    const data = await res.json()
    console.log(data)

    if(!res.ok){
        return {error: data.error}
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))


    const targetRoute = getDefaultRouteByRole(data.user.role)
    return redirect(targetRoute)
}

export function Login() {
    const actionData = useActionData()
    const navigation = useNavigation()

    return (

        <div className="min-h-screen flex items-center justify-center bg-bg-alt p-4">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-primary-foreground">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                            <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <h1 className="text-3xl mb-2">DP World ESD Hub</h1>
                    <p className="text-muted-foreground">Enterprise & Supplier Development Platform</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>

                    <CardContent>
                       <Form method="post" className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Email</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="admin"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    name="password"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="rounded" />
                                    Remember me
                                </label>

                                <Button variant="link" className="p-0 h-auto text-sm" type="button">
                                    Forgot password?
                                </Button>
                            </div>

                            <Button type="submit" className="w-full" disabled={navigation.state === "submitting"}>
                                {navigation.state === "submitting" ? "Signing in..." : "Sign in"}
                            </Button>
                        </Form>

                        {actionData?.error && (
                            <p className="mt-4 text-sm text-red-500 text-center">
                                {actionData.error}
                            </p>
                        )}

                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Button variant="link" className="p-0 h-auto" type="button">
                                Request account
                            </Button>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}