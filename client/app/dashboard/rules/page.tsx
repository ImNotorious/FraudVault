"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, AlertTriangle } from "lucide-react"

// Sample rule data - in a real app, this would come from your API
const initialRules = [
  {
    id: "rule-1",
    name: "High Amount Transaction",
    description: "Flag transactions with amount greater than threshold",
    condition: "transaction_amount > 10000",
    field: "transaction_amount",
    operator: ">",
    value: "10000",
    active: true,
    priority: "high",
  },
  {
    id: "rule-2",
    name: "New Device Detection",
    description: "Flag transactions from new devices",
    condition: "payer_device is new",
    field: "payer_device",
    operator: "is",
    value: "new",
    active: true,
    priority: "medium",
  },
  {
    id: "rule-3",
    name: "Unusual Location",
    description: "Flag transactions from unusual locations",
    condition: "location != usual_location",
    field: "location",
    operator: "!=",
    value: "usual_location",
    active: false,
    priority: "high",
  },
  {
    id: "rule-4",
    name: "Multiple Transactions",
    description: "Flag multiple transactions in short time",
    condition: "transaction_count > 5 in 10 minutes",
    field: "transaction_count",
    operator: ">",
    value: "5 in 10 minutes",
    active: true,
    priority: "medium",
  },
  {
    id: "rule-5",
    name: "Blacklisted Payee",
    description: "Flag transactions to blacklisted payees",
    condition: "payee_id in blacklist",
    field: "payee_id",
    operator: "in",
    value: "blacklist",
    active: true,
    priority: "critical",
  },
]

export default function RulesPage() {
  const [rules, setRules] = useState(initialRules)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentRule, setCurrentRule] = useState<any>(null)
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    field: "",
    operator: "",
    value: "",
    priority: "medium",
    active: true,
  })

  const handleAddRule = () => {
    const rule = {
      ...newRule,
      id: `rule-${Date.now()}`,
      condition: `${newRule.field} ${newRule.operator} ${newRule.value}`,
    }
    setRules([...rules, rule])
    setNewRule({
      name: "",
      description: "",
      field: "",
      operator: "",
      value: "",
      priority: "medium",
      active: true,
    })
    setIsAddDialogOpen(false)
  }

  const handleEditRule = () => {
    if (!currentRule) return

    const updatedRule = {
      ...currentRule,
      condition: `${currentRule.field} ${currentRule.operator} ${currentRule.value}`,
    }

    setRules(rules.map((rule) => (rule.id === currentRule.id ? updatedRule : rule)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const handleToggleRule = (id: string) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, active: !rule.active } : rule)))
  }

  const handleEditClick = (rule: any) => {
    setCurrentRule(rule)
    setIsEditDialogOpen(true)
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rule Engine</h1>
          <p className="text-muted-foreground">Configure and manage fraud detection rules</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Rule</DialogTitle>
              <DialogDescription>Create a new rule for fraud detection. Fill in the details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="field" className="text-right">
                  Field
                </Label>
                <Select value={newRule.field} onValueChange={(value) => setNewRule({ ...newRule, field: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transaction_amount">Transaction Amount</SelectItem>
                    <SelectItem value="transaction_channel">Transaction Channel</SelectItem>
                    <SelectItem value="transaction_payment_mode">Payment Mode</SelectItem>
                    <SelectItem value="payer_device">Payer Device</SelectItem>
                    <SelectItem value="payer_browser">Payer Browser</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="transaction_count">Transaction Count</SelectItem>
                    <SelectItem value="payee_id">Payee ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="operator" className="text-right">
                  Operator
                </Label>
                <Select value={newRule.operator} onValueChange={(value) => setNewRule({ ...newRule, operator: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=">">Greater Than (&gt;)</SelectItem>
                    <SelectItem value="<">Less Than (&lt;)</SelectItem>
                    <SelectItem value="==">Equals (==)</SelectItem>
                    <SelectItem value="!=">Not Equals (!=)</SelectItem>
                    <SelectItem value="in">In List</SelectItem>
                    <SelectItem value="not in">Not In List</SelectItem>
                    <SelectItem value="is">Is</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Value
                </Label>
                <Input
                  id="value"
                  value={newRule.value}
                  onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select value={newRule.priority} onValueChange={(value) => setNewRule({ ...newRule, priority: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="active" className="text-right">
                  Active
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={newRule.active}
                    onCheckedChange={(checked) => setNewRule({ ...newRule, active: checked })}
                  />
                  <Label htmlFor="active">{newRule.active ? "Enabled" : "Disabled"}</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRule}>Save Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Rules</CardTitle>
          <CardDescription>Rules that are currently active in the fraud detection system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>{rule.description}</TableCell>
                    <TableCell>
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {rule.condition}
                      </code>
                    </TableCell>
                    <TableCell>{getPriorityBadge(rule.priority)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch checked={rule.active} onCheckedChange={() => handleToggleRule(rule.id)} />
                        <span>{rule.active ? "Active" : "Inactive"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditClick(rule)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Rule</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this rule? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteRule(rule.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {rules.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No rules found. Add a rule to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Rule Dialog */}
      {currentRule && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Rule</DialogTitle>
              <DialogDescription>Update the rule details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentRule.name}
                  onChange={(e) => setCurrentRule({ ...currentRule, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={currentRule.description}
                  onChange={(e) => setCurrentRule({ ...currentRule, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-field" className="text-right">
                  Field
                </Label>
                <Select
                  value={currentRule.field}
                  onValueChange={(value) => setCurrentRule({ ...currentRule, field: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transaction_amount">Transaction Amount</SelectItem>
                    <SelectItem value="transaction_channel">Transaction Channel</SelectItem>
                    <SelectItem value="transaction_payment_mode">Payment Mode</SelectItem>
                    <SelectItem value="payer_device">Payer Device</SelectItem>
                    <SelectItem value="payer_browser">Payer Browser</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="transaction_count">Transaction Count</SelectItem>
                    <SelectItem value="payee_id">Payee ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-operator" className="text-right">
                  Operator
                </Label>
                <Select
                  value={currentRule.operator}
                  onValueChange={(value) => setCurrentRule({ ...currentRule, operator: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=">">Greater Than (&gt;)</SelectItem>
                    <SelectItem value="<">Less Than (&lt;)</SelectItem>
                    <SelectItem value="==">Equals (==)</SelectItem>
                    <SelectItem value="!=">Not Equals (!=)</SelectItem>
                    <SelectItem value="in">In List</SelectItem>
                    <SelectItem value="not in">Not In List</SelectItem>
                    <SelectItem value="is">Is</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">
                  Value
                </Label>
                <Input
                  id="edit-value"
                  value={currentRule.value}
                  onChange={(e) => setCurrentRule({ ...currentRule, value: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-priority" className="text-right">
                  Priority
                </Label>
                <Select
                  value={currentRule.priority}
                  onValueChange={(value) => setCurrentRule({ ...currentRule, priority: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-active" className="text-right">
                  Active
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="edit-active"
                    checked={currentRule.active}
                    onCheckedChange={(checked) => setCurrentRule({ ...currentRule, active: checked })}
                  />
                  <Label htmlFor="edit-active">{currentRule.active ? "Enabled" : "Disabled"}</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditRule}>Update Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Rule Engine Information</CardTitle>
          <CardDescription>How the rule engine works in the fraud detection system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-orange-500 mt-1" />
              <div>
                <h3 className="font-medium">Rule Evaluation</h3>
                <p className="text-sm text-muted-foreground">
                  Rules are evaluated in order of priority (Critical, High, Medium, Low). If any rule matches, the
                  transaction is flagged as potentially fraudulent.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-orange-500 mt-1" />
              <div>
                <h3 className="font-medium">AI Integration</h3>
                <p className="text-sm text-muted-foreground">
                  The rule engine works alongside the AI model. Rules provide deterministic checks, while the AI model
                  provides probabilistic fraud detection.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-orange-500 mt-1" />
              <div>
                <h3 className="font-medium">Performance Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Adding too many complex rules may impact the performance of the fraud detection API. Monitor the API
                  latency after adding new rules.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

