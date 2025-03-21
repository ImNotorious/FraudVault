"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  PieChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Pie,
  Cell,
  ComposedChart,
  Area,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

// Sample data - in a real app, this would come from your API
const timeSeriesData = [
  { date: "2023-01", predicted: 65, reported: 45, total: 1200 },
  { date: "2023-02", predicted: 59, reported: 40, total: 1300 },
  { date: "2023-03", predicted: 80, reported: 55, total: 1400 },
  { date: "2023-04", predicted: 81, reported: 60, total: 1500 },
  { date: "2023-05", predicted: 56, reported: 45, total: 1600 },
  { date: "2023-06", predicted: 55, reported: 40, total: 1700 },
  { date: "2023-07", predicted: 40, reported: 30, total: 1800 },
  { date: "2023-08", predicted: 45, reported: 35, total: 1900 },
  { date: "2023-09", predicted: 60, reported: 45, total: 2000 },
  { date: "2023-10", predicted: 70, reported: 55, total: 2100 },
  { date: "2023-11", predicted: 65, reported: 50, total: 2200 },
  { date: "2023-12", predicted: 90, reported: 70, total: 2300 },
]

const channelData = [
  { name: "Web", predicted: 400, reported: 300, total: 5000 },
  { name: "Mobile", predicted: 300, reported: 250, total: 4000 },
  { name: "API", predicted: 200, reported: 150, total: 3000 },
  { name: "POS", predicted: 100, reported: 80, total: 2000 },
]

const paymentModeData = [
  { name: "Card", predicted: 500, reported: 400, total: 6000 },
  { name: "UPI", predicted: 300, reported: 250, total: 4000 },
  { name: "NEFT", predicted: 200, reported: 150, total: 3000 },
  { name: "IMPS", predicted: 100, reported: 80, total: 2000 },
]

const bankData = [
  { name: "HDFC", predicted: 350, reported: 300, total: 5000 },
  { name: "SBI", predicted: 250, reported: 200, total: 4000 },
  { name: "ICICI", predicted: 200, reported: 150, total: 3000 },
  { name: "Axis", predicted: 150, reported: 120, total: 2500 },
  { name: "Others", predicted: 100, reported: 80, total: 2000 },
]

const payerData = [
  { name: "User 1", predicted: 50, reported: 40, total: 500 },
  { name: "User 2", predicted: 40, reported: 30, total: 400 },
  { name: "User 3", predicted: 30, reported: 25, total: 300 },
  { name: "User 4", predicted: 20, reported: 15, total: 200 },
  { name: "Others", predicted: 10, reported: 5, total: 100 },
]

const payeeData = [
  { name: "Merchant 1", predicted: 60, reported: 50, total: 600 },
  { name: "Merchant 2", predicted: 50, reported: 40, total: 500 },
  { name: "Merchant 3", predicted: 40, reported: 30, total: 400 },
  { name: "Merchant 4", predicted: 30, reported: 20, total: 300 },
  { name: "Others", predicted: 20, reported: 10, total: 200 },
]

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [dimension, setDimension] = useState("channel")
  const [timeFrame, setTimeFrame] = useState("monthly")

  // Get the appropriate data based on the selected dimension
  const getDimensionData = () => {
    switch (dimension) {
      case "channel":
        return channelData
      case "paymentMode":
        return paymentModeData
      case "bank":
        return bankData
      case "payer":
        return payerData
      case "payee":
        return payeeData
      default:
        return channelData
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Analyze fraud patterns and trends across different dimensions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Filters</CardTitle>
          <CardDescription>Filter analytics by date range and dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={dateRange} onSelect={(range) => setDateRange(range)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Dimension Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Dimension</label>
              <Select value={dimension} onValueChange={setDimension}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Dimension" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="channel">Transaction Channel</SelectItem>
                  <SelectItem value="paymentMode">Payment Mode</SelectItem>
                  <SelectItem value="bank">Gateway Bank</SelectItem>
                  <SelectItem value="payer">Payer ID</SelectItem>
                  <SelectItem value="payee">Payee ID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Frame Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Frame</label>
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Time Frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Fraud Trends Over Time</CardTitle>
          <CardDescription>Comparison of predicted vs reported frauds over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={timeSeriesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="total"
                  fill="#8884d8"
                  stroke="#8884d8"
                  name="Total Transactions"
                  opacity={0.2}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Predicted Frauds"
                />
                <Line yAxisId="left" type="monotone" dataKey="reported" stroke="#ef4444" name="Reported Frauds" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Dimension Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Fraud Analysis by {dimension.charAt(0).toUpperCase() + dimension.slice(1)}</CardTitle>
          <CardDescription>Comparison of predicted vs reported frauds by {dimension}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getDimensionData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="predicted" name="Predicted Frauds" fill="#3b82f6" />
                <Bar dataKey="reported" name="Reported Frauds" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Fraud Rate Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Fraud Rate Analysis</CardTitle>
          <CardDescription>Percentage of transactions flagged as fraudulent</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="channel">
            <TabsList className="mb-4">
              <TabsTrigger value="channel">Channel</TabsTrigger>
              <TabsTrigger value="paymentMode">Payment Mode</TabsTrigger>
              <TabsTrigger value="bank">Gateway Bank</TabsTrigger>
            </TabsList>
            <TabsContent value="channel">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData.map((item) => ({
                        name: item.name,
                        value: (item.predicted / item.total) * 100,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="paymentMode">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentModeData.map((item) => ({
                        name: item.name,
                        value: (item.predicted / item.total) * 100,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    >
                      {paymentModeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="bank">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bankData.map((item) => ({
                        name: item.name,
                        value: (item.predicted / item.total) * 100,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    >
                      {bankData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

