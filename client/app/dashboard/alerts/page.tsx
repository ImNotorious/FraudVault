"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertTriangle, CheckCircle, Search, AlertCircle } from "lucide-react"

// Sample alerts data - in a real app, this would come from your API
const sampleAlerts = [
  {
    id: "alert-1",
    transaction_id: "TXN123456789",
    date: "2023-12-01",
    amount: 12500.0,
    channel: "web",
    payment_mode: "card",
    payer_email: "john.doe@example.com",
    payee_id: "PAYEE001",
    fraud_score: 0.89,
    fraud_reason: "Unusual location and high amount",
    status: "new",
    reported: true,
  },
  {
    id: "alert-2",
    transaction_id: "TXN123456791",
    date: "2023-12-03",
    amount: 3500.0,
    channel: "web",
    payment_mode: "neft",
    payer_email: "robert.johnson@example.com",
    payee_id: "PAYEE003",
    fraud_score: 0.75,
    fraud_reason: "Multiple transactions in short time",
    status: "investigating",
    reported: false,
  },
  {
    id: "alert-3",
    transaction_id: "TXN123456793",
    date: "2023-12-05",
    amount: 12500.0,
    channel: "web",
    payment_mode: "card",
    payer_email: "michael.brown@example.com",
    payee_id: "PAYEE005",
    fraud_score: 0.95,
    fraud_reason: "Unusual amount and new device",
    status: "resolved",
    reported: true,
  },
  {
    id: "alert-4",
    transaction_id: "TXN123456795",
    date: "2023-12-07",
    amount: 8900.0,
    channel: "mobile",
    payment_mode: "upi",
    payer_email: "david.wilson@example.com",
    payee_id: "PAYEE002",
    fraud_score: 0.82,
    fraud_reason: "Suspicious IP address",
    status: "new",
    reported: false,
  },
  {
    id: "alert-5",
    transaction_id: "TXN123456797",
    date: "2023-12-09",
    amount: 15000.0,
    channel: "web",
    payment_mode: "card",
    payer_email: "emma.taylor@example.com",
    payee_id: "PAYEE004",
    fraud_score: 0.91,
    fraud_reason: "Unusual time and high amount",
    status: "investigating",
    reported: true,
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(sampleAlerts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [reportedFilter, setReportedFilter] = useState("")
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportDetails, setReportDetails] = useState("")
  const [reportingEntity, setReportingEntity] = useState("")

  // Filter alerts based on search and filters
  const filteredAlerts = alerts.filter((alert) => {
    // Search by transaction ID or payer email
    const matchesSearch =
      alert.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.payer_email.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by status
    const matchesStatus = !statusFilter || alert.status === statusFilter

    // Filter by reported status
    const matchesReported =
      reportedFilter === "" ||
      (reportedFilter === "reported" && alert.reported) ||
      (reportedFilter === "not-reported" && !alert.reported)

    return matchesSearch && matchesStatus && matchesReported
  })

  const handleStatusChange = (alertId: string, newStatus: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: newStatus } : alert)))
  }

  const handleReportFraud = () => {
    if (!selectedAlert || !reportingEntity) return

    // In a real app, this would call your API
    console.log("Reporting fraud:", {
      transaction_id: selectedAlert.transaction_id,
      reporting_entity_id: reportingEntity,
      fraud_details: reportDetails,
    })

    // Update the alert status
    setAlerts(
      alerts.map((alert) =>
        alert.id === selectedAlert.id ? { ...alert, reported: true, status: "investigating" } : alert,
      ),
    )

    // Close the dialog and reset form
    setReportDialogOpen(false)
    setReportDetails("")
    setReportingEntity("")
    setSelectedAlert(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>
      case "investigating":
        return <Badge className="bg-yellow-500">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fraud Alerts</h1>
        <p className="text-muted-foreground">Monitor and manage fraud alerts</p>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/10 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Alerts</p>
                <h3 className="text-2xl font-bold">{alerts.filter((alert) => alert.status === "new").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500/10 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investigating</p>
                <h3 className="text-2xl font-bold">
                  {alerts.filter((alert) => alert.status === "investigating").length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <h3 className="text-2xl font-bold">{alerts.filter((alert) => alert.status === "resolved").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Filters</CardTitle>
          <CardDescription>Filter alerts by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by ID or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reported Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Reported Status</label>
              <Select value={reportedFilter} onValueChange={setReportedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Alerts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="not-reported">Not Reported</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert List */}
      <Card>
        <CardHeader>
          <CardTitle>Fraud Alerts</CardTitle>
          <CardDescription>
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payer Email</TableHead>
                  <TableHead>Fraud Score</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.transaction_id}</TableCell>
                      <TableCell>{alert.date}</TableCell>
                      <TableCell>${alert.amount.toFixed(2)}</TableCell>
                      <TableCell>{alert.payer_email}</TableCell>
                      <TableCell>
                        <span className="text-red-500 font-medium">{alert.fraud_score.toFixed(2)}</span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={alert.fraud_reason}>
                        {alert.fraud_reason}
                      </TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell>
                        <Badge variant={alert.reported ? "default" : "outline"}>{alert.reported ? "Yes" : "No"}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {!alert.reported && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAlert(alert)
                                setReportDialogOpen(true)
                              }}
                            >
                              Report
                            </Button>
                          )}
                          {alert.status !== "resolved" && (
                            <Select value={alert.status} onValueChange={(value) => handleStatusChange(alert.id, value)}>
                              <SelectTrigger className="h-8 w-[130px]">
                                <SelectValue placeholder="Change Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="investigating">Investigating</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No alerts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Report Fraud Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Report Fraud</DialogTitle>
            <DialogDescription>Submit a fraud report for transaction {selectedAlert?.transaction_id}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reporting-entity" className="text-right">
                Reporting Entity
              </Label>
              <Input
                id="reporting-entity"
                value={reportingEntity}
                onChange={(e) => setReportingEntity(e.target.value)}
                className="col-span-3"
                placeholder="Enter your entity ID"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="fraud-details" className="text-right pt-2">
                Fraud Details
              </Label>
              <Textarea
                id="fraud-details"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                className="col-span-3"
                placeholder="Provide details about the fraudulent transaction"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReportFraud} disabled={!reportingEntity}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

