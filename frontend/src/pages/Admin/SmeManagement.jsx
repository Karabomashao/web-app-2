import { use, useEffect, useState } from 'react';
import { Users, Download, Filter,  Settings as Search, UserPlus } from "lucide-react";
import { Form, useNavigation, useActionData, useLoaderData } from 'react-router-dom';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
}
from '@/components/ui/dialog'

import {
    Label
}
from '@/components/ui/label'

import {
    Input
}
from '@/components/ui/input'

import {
    Button
}
from '@/components/ui/button'

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
}
from '@/components/ui/select'

import {
    Card,
    CardContent
}
from '@/components/ui/card'

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
}
from '@/components/ui/table'

import { 
    Badge,
} 
from '@/components/ui/badge';

export async function action({request}){

    const formData = await request.formData()
    const intent = formData.get('intent')
    const companyName = formData.get('companyName')
    const registrationNumber = formData.get('registrationNumber')
    const companyEmail = formData.get("email")?.trim().toLowerCase();

    if (intent === 'createSMEAccont'){

      const res = await fetch('https://web-app-backend-bqf8bhgvdmg4edbc.southafricanorth-01.azurewebsites.net/api/auth/register',{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(
          {
                companyEmail, 
                companyName, 
                registrationNumber
              })
            })

    const data = await res.json()

    if (!res.ok){
      return {error: data.error}
    }
  }

  if (intent === 'createUserAccount'){

    const userEmail = formData.get('userEmail')
    const password = formData.get('password')
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const assignSME = formData.get('assignSME')


    const res = await fetch('https://web-app-backend-bqf8bhgvdmg4edbc.southafricanorth-01.azurewebsites.net/api/auth/register-user',{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(
          {
                userEmail, 
                password, 
                firstName,
                lastName,
                assignSME
              })
            })

    const data = await res.json()

    if (!res.ok){
      return {error: data.error}
    }

    console.log(assignSME)
  }
}  

export function SmeManagement(){

  const [showCreateSME, setShowCreateSME] = useState(false)
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [companies, setCompanies] = useState([])
  const [companyId, setCompanyId] = useState("")
  const [loading, setLoading] = useState(true)
  const actionData = useActionData()
  const navigation = useNavigation()

  useEffect(() => {
    async function loadCompanies(){
      try{
        
        const token = localStorage.getItem('token')
        const res = await fetch("https://web-app-backend-bqf8bhgvdmg4edbc.southafricanorth-01.azurewebsites.net/users/companies",{
          headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
        })
      
        if (!res.ok) {
        throw new Response("Failed to load companies", { status: res.status });
        }        
        const data = await res.json()
        setCompanies(data.companies)
      }catch(error){
        console.log(error)
        setCompanies(error.message)
        } finally{
          setLoading(false)
        }
      }
      loadCompanies();
    }, [])
    


  return (
    
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1">SME Management</h1>
          <p className="text-muted-foreground">Manage and monitor all participating SMEs</p>
        </div>

        <div className="flex gap-2">
          
          {/* Dialog for SME account */}
          <Dialog open={showCreateSME} onOpenChange={setShowCreateSME}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Create SME Account
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New SME Account</DialogTitle>
                  <DialogDescription>
                    Register a new SME
                  </DialogDescription>
              </DialogHeader>


              {/* Create SME account form */}
              <Form method='POST'>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="user@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      type="text"
                      name="companyName"
                      placeholder="Enter company name"
                      required
                      />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Business Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      type="text"
                      name="registrationNumber"
                      placeholder="e.g., 2021/123456/07"
                    />
                  </div>

                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setShowCreateSME(false);
                      }
                    }
                  >
                    Cancel
                  </Button>

                  <Button type="submit" name="intent" value="createSMEAccont" disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
            </Form>

            {actionData?.error && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {actionData.error}
              </p>
            )}

            </DialogContent>
          </Dialog>
          {/* ends here */}

          {/* Dialog for creating user */}
          <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Create User Account
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New User Account</DialogTitle>
                <DialogDescription>
                  Register a new coach, admin, or fund manager account
                </DialogDescription>
              </DialogHeader>


              {/* Form for creating user */}
              <Form method='post'>
                <input type="hidden" name="assignSME" value={companyId}/>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email Address</Label>
                    <Input
                      id="user-email"
                      name="userEmail"
                      type="email"
                      placeholder="user@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      name="password"
                      type="password"
                      placeholder="Create a secure password"
                      required
                      
                    />
                  </div>
    
                  <div className="grid grid-cols-2 gap-4">
                    
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First name"
                      />
                    </div>
                  
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  

                  <div className="space-y-2">
                    <Label htmlFor="company">Assign to SME Company</Label>
                    <Select
                      onValueChange={setCompanyId}
                      required
                    >
                      <SelectTrigger id="company">
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((sme, i) => (
                          <SelectItem key={sme.CompanyID} value={String(sme.CompanyID)}>
                            {sme.CompanyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateUser(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    name="intent"
                    value="createUserAccount"
                    disabled={navigation.state === "submitting"}
                    // onClick={() => {
                    //   setShowCreateUser(false);
                    // }}
                    >
                   {navigation.state === "submitting" ? "Creating account..." : "Create User Account"}
                   
                  </Button>
                </div>
              </Form>              

            </DialogContent>
          </Dialog>


          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search SMEs by name, sector, or location..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>B-BBEE</TableHead>
                <TableHead>Roadmap</TableHead>
                <TableHead>Funding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { loading ? (
                [...Array(4)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                    </TableCell>
                  </TableRow>
                  ))
                ) : companies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No companies found
                  </TableCell>
                </TableRow>
                ) : (
                companies.map((sme, i) => (
                  <TableRow key={i}>
                    <TableCell>{sme.CompanyName}</TableCell>
                    <TableCell>{sme.IndustrySector}</TableCell>
                    <TableCell>{sme.PhysicalLocation}</TableCell>
                    <TableCell className="tabular-nums">{sme.NumberOfEmployees}</TableCell>
                  {/* <TableCell>
                    <Badge variant="secondary">{sme.bbee}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${sme.roadmap}%` }}
                        />
                      </div>
                      <span className="text-sm tabular-nums">{sme.roadmap}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="tabular-nums">{sme.funding}</TableCell>
                  <TableCell>
                    <StatusBadge status={sme.status} />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </TableCell> */}
                </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}