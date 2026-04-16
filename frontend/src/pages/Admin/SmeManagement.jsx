import { useEffect, useState } from 'react';
import {  Download, Filter,  Settings as Search, UserPlus } from "lucide-react";
import { Form, useNavigation, useActionData } from 'react-router-dom';

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

  const smeList = [
    {
      name: "TechStart Solutions",
      sector: "Technology",
      employees: 45,
      location: "Johannesburg",
      bbee: "Level 2",
      roadmap: 75,
      funding: "R 500K",
      status: "active",
    },
    {
      name: "BuildRight Construction",
      sector: "Construction",
      employees: 32,
      location: "Cape Town",
      bbee: "Level 3",
      roadmap: 45,
      funding: "R 750K",
      status: "active",
    },
    {
      name: "Fresh Foods Co.",
      sector: "Agriculture",
      employees: 28,
      location: "Durban",
      bbee: "Level 4",
      roadmap: 60,
      funding: "R 350K",
      status: "pending",
    },
    {
      name: "Digital Solutions Inc.",
      sector: "Technology",
      employees: 18,
      location: "Pretoria",
      bbee: "Level 2",
      roadmap: 85,
      funding: "R 420K",
      status: "active",
    },
  ];

export async function action({request}){

    const formData = await request.formData()
    const username = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const companyName = formData.get('companyName')
    const registrationNumber = formData.get('registrationNumber')
    const role = 'user'

    if (password !== confirmPassword){
        return{error : "Passwords do not match!"}
    }

    const res = await fetch('https://web-app-backend-bqf8bhgvdmg4edbc.southafricanorth-01.azurewebsites.net/auth/register',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(
            {
                username, 
                password,
                role, 
                companyName, 
                registrationNumber
            })
    })

    const data = await res.json()

    if (!res.ok){
        return {error: data.error}
    }

    
}  


export function SmeManagement(){

    const [showCreateSME, setShowCreateSME] = useState(false);
    const actionData = useActionData()
    const navigation = useNavigation()


    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl mb-1">SME Management</h1>
                    <p className="text-muted-foreground">Manage and monitor all participating SMEs</p>
                </div>

                <div className="flex gap-2">
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
                                    Register a new SME user in the ESD Hub platform
                                </DialogDescription>
                            </DialogHeader>

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
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Create a secure password"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Create a secure password"
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
                                    <Button type="submit" disabled={navigation.state === "submitting"}>
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
              {smeList.map((sme, i) => (
                <TableRow key={i}>
                  <TableCell>{sme.name}</TableCell>
                  <TableCell>{sme.sector}</TableCell>
                  <TableCell>{sme.location}</TableCell>
                  <TableCell className="tabular-nums">{sme.employees}</TableCell>
                  <TableCell>
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
                    {/* <StatusBadge status={sme.status} /> */}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}