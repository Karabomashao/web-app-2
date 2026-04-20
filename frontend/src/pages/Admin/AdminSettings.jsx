import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"


export default function AdminSettings(){
    return (
         <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage system preferences and configurations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm">Organization Name</label>
            <Input defaultValue="DP World ESD Hub" className="mt-1" />
          </div>
          <div>
            <label className="text-sm">Contact Email</label>
            <Input defaultValue="admin@dpworld-esd.co.za" className="mt-1" />
          </div>
          <div>
            <label className="text-sm">Default Currency</label>
            <Select defaultValue="zar">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zar">ZAR (South African Rand)</SelectItem>
                <SelectItem value="usd">USD (US Dollar)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p>Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email alerts for critical events</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p>Compliance Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified about expiring certifications</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
    )   
}