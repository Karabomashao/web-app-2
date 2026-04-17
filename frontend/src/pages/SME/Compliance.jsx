import { Shield, AlertTriangle, CheckCircle2, Upload, Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, useNavigation } from "react-router-dom";



export async function uploadDocumentAction({ request, params }) {
    const formData = await request.formData()
    const file = formData.get("pdf")
    const userID = formData.get("userID")
    const documentType = formData.get("documentType")

    if (!file || file.size === 0) {
        return ({ error: "Please select a PDF file" }, { status: 400 })
    }

    const apiFormData = new FormData()
    apiFormData.append("pdf", file)

    try {
        const response = await fetch(
            `http://localhost:3000/api/users/${userID}/documents`,
            {
                method: "POST",
                body: apiFormData,
            }
        )

        const result = await response.json()

        if (!response.ok) {
            return (
                { error: result.message || "Upload failed" },
                { status: response.status }
            )
        }

        return json({
            success: true,
            message: result.message,
            document: result.document,
            documentType,
        })
    } catch (error) {
        return (
            { error: "Something went wrong while uploading" },
            { status: 500 }
        )
    }
}


export function Compliance(){

  const userID = JSON.parse(localStorage.getItem('user')).id
  console.log(userID)
  const navigation = useNavigation()


    const documents = [
        {
            type: "B-BBEE Certificate",
            status: "valid",
            expiryDate: "2026-03-15",
            daysToExpiry: 145,
            requirement: "B-BBEE Level 1-4",
        },
        {
            type: "Tax Clearance",
            status: "expiring",
            expiryDate: "2025-11-20",
            daysToExpiry: 30,
            requirement: "Valid tax clearance",
        },
        {
            type: "FICA/KYC Documents",
            status: "valid",
            expiryDate: "2027-01-10",
            daysToExpiry: 445,
            requirement: "Company verification",
        },
        {
            type: "Bank Account Verification",
            status: "valid",
            expiryDate: "N/A",
            daysToExpiry: null,
            requirement: "Bank details on file",
        },
        {
            type: "Insurance Certificate",
            status: "expired",
            expiryDate: "2025-09-30",
            daysToExpiry: -21,
            requirement: "Public liability cover",
        },
    ]

    const expiringDocs = documents.filter((d) => d.status === "expiring").length;
    const validDocs = documents.filter((d) => d.status === "valid").length;
    const expiredDocs = documents.filter((d) => d.status === "expired").length;


    const getStatusColor = (status) => {
        if (status === "valid") return "text-success-color";
        if (status === "expiring") return "text-warning-color";
        return "text-danger-color";
    }


    const getStatusBadge = (status) => {
        if (status === "valid") return <Badge className="bg-green-100 text-green-800">Valid</Badge>;
        if (status === "expiring") return <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
    }

    return(
        <div className="space-y-6 max-w-5xl mx-auto" >

            <div>
                <h1 className="text-3xl mb-2">B-BBEE & Compliance</h1>
                <p className="text-muted-foreground">
                    Track your B-BBEE score, manage compliance documents, and optimize your ESD contribution
                </p>
            </div>

      {/* Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl mb-1">Level 2</div>
            <p className="text-sm text-muted-foreground">B-BBEE Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1 text-success-color">{validDocs}</div>
            <p className="text-sm text-muted-foreground">Valid Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1 text-warning-color">{expiringDocs}</div>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1 text-danger-color">{expiredDocs}</div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scorecard">
        <TabsList>
          <TabsTrigger value="scorecard">B-BBEE Scorecard</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="scorecard">
          
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documents</CardTitle>
              <CardDescription>
                Manage and track all required compliance documentation
              </CardDescription>
              </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Requirement</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc, i) => (
                        <TableRow key={i}>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {doc.requirement}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{doc.expiryDate}</div>
                              {doc.daysToExpiry !== null && (
                              <div className={`text-xs ${getStatusColor(doc.status)}`}>
                                {doc.daysToExpiry > 0
                                ? `${doc.daysToExpiry} days remaining`
                                : `Expired ${Math.abs(doc.daysToExpiry)} days ago`}
                              </div>
                              )}
                              </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(doc.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2 items-center">
                              <Button size="sm" variant="outline" type="button">
                                View
                              </Button>

                              <Form
                                method="post"
                                encType="multipart/form-data"
                                className="flex items-center gap-2"
                              >
                                <input type="hidden" name="userID" value={userID} />
                                <input type="hidden" name="documentType" value={doc.type} />

                                <input
                                  id={`pdf-${i}`}
                                  type="file"
                                  name="pdf"
                                  accept="application/pdf"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.currentTarget.files?.length) {
                                      e.currentTarget.form?.requestSubmit();
                                    }
                                  }}
                                />

                                <Button
                                  size="sm"
                                  type="button"
                                  disabled={navigation.state === "submitting"}
                                  onClick={() => document.getElementById(`pdf-${i}`)?.click()}
                                >
                                  <Upload className="h-3 w-3 mr-1" />
                                  {navigation.state === "submitting" ? "Uploading..." : "Upload"}
                                </Button>
                              </Form>
                      </div>
                  </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {(expiringDocs > 0 || expiredDocs > 0) && (
                <div className="mt-4 p-4 bg-warning-color/10 border border-warning-color/20 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning-color mt-0.5" />
                  <div className="flex-1">
                    <p className="mb-1">Action Required</p>
                    <p className="text-sm text-muted-foreground">
                      You have {expiringDocs + expiredDocs} document(s) that need attention.
                      Please update expired documents to maintain compliance.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

       
      </Tabs>
    </div>
  );
    
}