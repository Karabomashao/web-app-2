import { Plus, FileText, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const applications = [
  {
    id: "FND-001",
    purpose: "Working Capital Loan",
    amount: 500000,
    instrument: "Loan",
    stage: "approved",
    submittedDate: "2025-09-15",
    approvedAmount: 500000,
    conditions: ["Monthly financial reports", "Quarterly business review"],
    tranches: [
      { number: 1, amount: 300000, status: "disbursed", date: "2025-10-01" },
      { number: 2, amount: 200000, status: "pending", milestone: "Q4 revenue target" },
    ],
  },
  {
    id: "FND-002",
    purpose: "Equipment Grant",
    amount: 250000,
    instrument: "Grant",
    stage: "under-review",
    submittedDate: "2025-10-16",
    riskScore: "Medium",
  },
  {
    id: "FND-003",
    purpose: "Expansion Funding",
    amount: 1000000,
    instrument: "Equity",
    stage: "draft",
    progress: 45,
  },
]

const milestones = [
  {
    title: "Q4 Revenue Target Achievement",
    description: "Achieve R1.5M revenue in Q4 2025",
    dueDate: "2025-12-31",
    status: "active",
    linkedTo: "FND-001 - Tranche 2",
  },
  {
    title: "Equipment Installation Complete",
    description: "Complete installation and commissioning of new equipment",
    dueDate: "2025-11-30",
    status: "pending",
    linkedTo: "FND-002",
  },
]
const totalFunding = applications.reduce((sum, app) => {
    if (app.stage === "approved" || app.stage === "disbursed") {
        return sum + (app.approvedAmount || app.amount);
    }
    return sum;
}, 0);

const disbursed = applications.reduce((sum, app) => {
    if (app.tranches) {
      return (
        sum +
        app.tranches
          .filter((t) => t.status === "disbursed")
          .reduce((s, t) => s + t.amount, 0)
      );
    }
    return sum;
}, 0);

export default function Funding(){
    return(
  <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2">Funding</h1>
          <p className="text-muted-foreground">
            Manage your funding applications and track disbursements
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Funding Request
        </Button>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1">R {(totalFunding / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Total Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1 text-success-color">
              R {(disbursed / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-muted-foreground">Disbursed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1 text-warning-color">
              R {((totalFunding - disbursed) / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="repayments">Repayments</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{app.purpose}</CardTitle>
                      <StatusBadge status={app.stage} />
                    </div>
                    <CardDescription>
                      Application {app.id} • {app.instrument}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl tabular-nums">
                      R {(app.amount / 1000).toFixed(0)}K
                    </div>
                    <p className="text-sm text-muted-foreground">Requested</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {app.stage === "draft" && app.progress !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Application Progress</span>
                      <span className="text-sm tabular-nums">{app.progress}%</span>
                    </div>
                    <Progress value={app.progress} className="h-2" />
                    <Button className="w-full mt-3">Continue Application</Button>
                  </div>
                )}

                {app.stage === "under-review" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-warning-color" />
                        <div>
                          <p>Under Review</p>
                          <p className="text-sm text-muted-foreground">
                            Submitted on {app.submittedDate}
                          </p>
                        </div>
                      </div>
                      {app.riskScore && (
                        <Badge variant="outline">Risk: {app.riskScore}</Badge>
                      )}
                    </div>
                    <Button variant="outline" className="w-full">
                      View Application Details
                    </Button>
                  </div>
                )}

                {app.stage === "approved" && (
                  <div className="space-y-4">
                    {app.conditions && (
                      <div>
                        <p className="text-sm mb-2">Approval Conditions:</p>
                        <ul className="space-y-1">
                          {app.conditions.map((condition, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-success-color mt-0.5 flex-shrink-0" />
                              <span>{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {app.tranches && (
                      <div>
                        <p className="text-sm mb-2">Tranche Schedule:</p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tranche</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Milestone</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {app.tranches.map((tranche) => (
                              <TableRow key={tranche.number}>
                                <TableCell>Tranche {tranche.number}</TableCell>
                                <TableCell className="tabular-nums">
                                  R {(tranche.amount / 1000).toFixed(0)}K
                                </TableCell>
                                <TableCell>
                                  {tranche.milestone || tranche.date || "-"}
                                </TableCell>
                                <TableCell>
                                  <StatusBadge status={tranche.status} />
                                </TableCell>
                                <TableCell>
                                  {tranche.status === "pending" && (
                                    <Button size="sm" variant="outline">
                                      Submit Evidence
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {milestones.map((milestone, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{milestone.title}</CardTitle>
                    <CardDescription>{milestone.description}</CardDescription>
                  </div>
                  <StatusBadge status={milestone.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p>{milestone.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Linked to</p>
                    <Badge variant="secondary">{milestone.linkedTo}</Badge>
                  </div>
                  <Button variant="outline">Upload Evidence</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="repayments">
          <Card>
            <CardHeader>
              <CardTitle>Repayment Schedule</CardTitle>
              <CardDescription>Track loan repayments and obligations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Application</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2025-11-01</TableCell>
                    <TableCell>FND-001</TableCell>
                    <TableCell className="tabular-nums">R 15,000</TableCell>
                    <TableCell className="tabular-nums">R 12,500</TableCell>
                    <TableCell className="tabular-nums">R 2,500</TableCell>
                    <TableCell>
                      <StatusBadge status="complete" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2025-12-01</TableCell>
                    <TableCell>FND-001</TableCell>
                    <TableCell className="tabular-nums">R 15,000</TableCell>
                    <TableCell className="tabular-nums">R 12,500</TableCell>
                    <TableCell className="tabular-nums">R 2,500</TableCell>
                    <TableCell>
                      <StatusBadge status="pending" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    )
}