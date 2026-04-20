import { useState } from "react";
import { Users, Link as LinkIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Form, useNavigation } from "react-router-dom";


export async function action({request}){
    const formData = await request.formData()
    const intent = formData.get('intent')
    const token = formData.get('token')
    const userId = formData.get('userId')


    // update personal information
    if (intent === "updatePersonal"){

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const phoneNumber = formData.get("phoneNumber");  

    const res = await fetch(`https://web-app-backend-bqf8bhgvdmg4edbc.southafricanorth-01.azurewebsites.net/${userId}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({firstName, lastName, phoneNumber})
    })

    const data = await res.json()

    if(!res.ok){
        return {error: data.error}
      }
    }

  if (intent === "updateCompany"){

    const companyName = formData.get("company-name")
    const industrySector = formData.get("industrySector")
    const phoneNumber = formData.get("phone")
    const physicalAddress = formData.get("address")
    const numberOfEmployees = formData.get("employees")
    const companyEmail = formData.get("email")
    
    const res = await fetch (`https://web-app-backend-bqf8bhgvdmg4edbc.southafricanorth-01.azurewebsites.net/${userId}`,
      {                                     
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          companyName,
          industrySector,
          phoneNumber,
          physicalAddress,
          numberOfEmployees,
          companyEmail
        })
      })

      const data = await res.json()

      if(!res.ok){
        return {error: data.error}
      }

      return {error: "Successfuly updated company profile"}
  }

  
  }

export function Settings(){


    // const user = JSON.parse(localStorage.getItem(user))
    // const userId = user.id
    const [industrySector, setIndustrySector] = useState("technology");
    const userDetails = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const navigation = useNavigation()

    // console.log(userDetails.id)



    const teamMembers = [
        {
            name: "Thabo Mthembu",
            email: "thabo@techstart.co.za",
            role: "Owner",
            status: "Active",
        },
        {
            name: "Sarah Nkosi",
            email: "sarah@techstart.co.za",
            role: "Finance Manager",
            status: "Active",
        },
        {
            name: "John Botha",
            email: "john@techstart.co.za",
            role: "Operations Manager",
            status: "Active",
        },
        ]

    
    return(
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl mb-2">Settings</h1>
                <p className="text-muted-foreground">
                Manage your account, team, and platform preferences
                </p>
            </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {/* <TabsTrigger value="team">Team</TabsTrigger> */}
          {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
          <TabsTrigger value="security">Security</TabsTrigger>
          {/* <TabsTrigger value="integrations">Integrations</TabsTrigger> */}
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Update your company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <Form method="put">
              <input type="hidden" name="token" value={token}/>
              <input type="hidden" name="userId" value={userDetails.id} />
              <input type="hidden" name="industrySector" value={industrySector} />

              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">TS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3>TechStart Solutions</h3>
                  <p className="text-sm text-muted-foreground">Registration: 2019/123456/07</p>
                </div>
                <Button variant="outline">Change Logo</Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name" 
                    name="company-name"
                    type="text"
                    defaultValue="TechStart Solutions" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-number">Registration Number</Label>
                  <Input 
                    id="reg-number"
                    name="reg-number"
                    type="text" 
                    defaultValue="2019/123456/07" 
                    disabled 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry Sector</Label>
                  <Select 
                    value={industrySector} onValueChange={setIndustrySector}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>

                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input 
                    id="employees" 
                    type="number"
                    name="employees" 
                    defaultValue="45" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    name="phone" 
                    defaultValue="+27 11 123 4567" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <Input 
                    id="email"
                    name="email" 
                    type="email" 
                    defaultValue="info@techstart.co.za" 
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Physical Address</Label>
                <Input 
                  id="address"
                  name="address"
                  type="text" 
                  defaultValue="123 Innovation Drive, Johannesburg, 2000" 
                />
              </div>

              <Button type="submit" name="intent" value="updateCompany" disabled={navigation.state === "submitting"}>
                <Save className="h-4 w-4 mr-2" />
                {navigation.state === "submitting" ? "Saving..." : "Save Changes"}
              </Button>
            </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form method="put">

                    <input type="hidden" name="token" value={token}/>
                    <input type="hidden" name="userId" value={userDetails.id} />

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input 
                                id="first-name" 
                                defaultValue={userDetails.firstName}
                                type="text"
                                name="firstName"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input 
                                id="last-name" 
                                defaultValue={userDetails.lastName}
                                type="text"
                                name="lastName" 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="personal-email">Email</Label>
                            <Input 
                                id="personal-email" 
                                type="email" 
                                defaultValue={userDetails.username} 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input 
                                id="mobile" 
                                type="tel" 
                                defaultValue={userDetails.phoneNumber}
                                name="phoneNumber" 
                            />
                        </div>
                    </div>

                    <Button type="submit" name="intent" value="updatePersonal" disabled={navigation.state === "submitting"}>
                        <Save className="h-4 w-4 mr-2" />
                        {navigation.state === "submitting" ? "Updating..." : "Update Personal Info"}
                    </Button>
                </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage who has access to your ESD Hub account</CardDescription>
                </div>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{member.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800" variant="secondary">
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Roadmap task reminders", desc: "Get notified about upcoming task deadlines" },
                { label: "Funding application updates", desc: "Status changes and approvals" },
                { label: "Coaching session reminders", desc: "24 hours before scheduled sessions" },
                { label: "Learning module recommendations", desc: "Personalized course suggestions" },
                { label: "Compliance alerts", desc: "Document expiry and renewal reminders" },
                { label: "Weekly progress summary", desc: "Weekly digest of your activity" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p>{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={i < 4} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
              <CardDescription>Manage platform notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Show desktop notifications", desc: "Browser notifications for important updates" },
                { label: "Sound alerts", desc: "Play sound for new notifications" },
                { label: "Message notifications", desc: "Alerts for new messages from coaches and admins" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p>{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={i === 0 || i === 2} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password regularly for security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p>Two-factor authentication (2FA)</p>
                  <p className="text-sm text-muted-foreground">
                    Secure your account with 2FA using authenticator app
                  </p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active login sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Chrome on Windows</p>
                    <p className="text-sm text-muted-foreground">Johannesburg, South Africa • Active now</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">
                    Current
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Safari on iPhone</p>
                    <p className="text-sm text-muted-foreground">Cape Town, South Africa • 2 days ago</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Revoke
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect external tools and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "Xero Accounting",
                    desc: "Sync financial data automatically",
                    connected: false,
                  },
                  {
                    name: "Google Calendar",
                    desc: "Sync coaching sessions and deadlines",
                    connected: true,
                  },
                  {
                    name: "Microsoft Teams",
                    desc: "Enable video calls for coaching sessions",
                    connected: false,
                  },
                  {
                    name: "Slack",
                    desc: "Receive notifications in your workspace",
                    connected: false,
                  },
                ].map((integration, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <LinkIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p>{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.desc}</p>
                      </div>
                    </div>
                    {integration.connected ? (
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    ) : (
                      <Button size="sm">Connect</Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}






