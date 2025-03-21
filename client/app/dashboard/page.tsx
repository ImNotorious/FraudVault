"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
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
} from "recharts"
import { AlertTriangle, CheckCircle, Clock, DollarSign, AlertCircle } from "lucide-react"
import { transactionsAPI } from "@/../../lib/api"
import { Button } from "@/components/ui/button"

// Sample data - in a real app, this would come from your API
const timeSeriesData = [
  { date: "2023-01", predicted: 65, reported: 45 },
  { date: "2023-02", predicted: 59, reported: 40 },
  { date: "2023-03", predicted: 80, reported: 55 },
  { date: "2023-04", predicted: 81, reported: 60 },
  { date: "2023-05", predicted: 56, reported: 45 },
  { date: "2023-06", predicted: 55, reported: 40 },
  { date: "2023-07", predicted: 40, reported: 30 },
  { date: "2023-08", predicted: 45, reported: 35 },
  { date: "2023-09", predicted: 60, reported: 45 },
  { date: "2023-10", predicted: 70, reported: 55 },
  { date: "2023-11", predicted: 65, reported: 50 },
  { date: "2023-12", predicted: 90, reported: 70 },
]

const channelData = [
  { name: "Web", predicted: 400, reported: 300 },
  { name: "Mobile", predicted: 300, reported: 250 },
  { name: "API", predicted: 200, reported: 150 },
  { name: "POS", predicted: 100, reported: 80 },
]

const paymentModeData = [
  { name: "Card", predicted: 500, reported: 400 },
  { name: "UPI", predicted: 300, reported: 250 },
  { name: "NEFT", predicted: 200, reported: 150 },
  { name: "IMPS", predicted: 100, reported: 80 },
]

const pieData = [
  { name: "True Positive", value: 400, color: "#10b981" },
  { name: "False Positive", value: 100, color: "#f59e0b" },
  { name: "True Negative", value: 800, color: "#3b82f6" },
  { name: "False Negative", value: 50, color: "#ef4444" },
]

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"]

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalTransactions: 0,
    fraudDetected: 0,
    fraudReported: 0,
    avgResponseTime: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from the API
      const data = await transactionsAPI.getTransactionStats()
      setMetrics({
        totalTransactions: data.totalTransactions || 0,
        fraudDetected: data.fraudDetected || 0,
        fraudReported: data.fraudReported || 0,
        avgResponseTime: data.avgResponseTime || 0,
      })
    } catch (err) {
      console.error("Error fetching metrics:", err)
      setError("Failed to load metrics. Using sample data instead.")

      // Fallback to sample data
      setMetrics({
        totalTransactions: 12500,
        fraudDetected: 450,
        fraudReported: 380,
        avgResponseTime: 120,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of fraud detection metrics and analytics</p>
        </div>
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        <Button onClick={fetchMetrics} disabled={loading}>
          {loading ? "Loading..." : "Refresh Data"}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-2xl font-bold">{metrics.totalTransactions.toLocaleString()}</h3>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500/10 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fraud Detected</p>
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-2xl font-bold">{metrics.fraudDetected.toLocaleString()}</h3>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500/10 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fraud Reported</p>
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-2xl font-bold">{metrics.fraudReported.toLocaleString()}</h3>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-2xl font-bold">{metrics.avgResponseTime} ms</h3>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Fraud Trends Over Time</CardTitle>
          <CardDescription>Comparison of predicted vs reported frauds over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Predicted Frauds"
                />
                <Line type="monotone" dataKey="reported" stroke="#ef4444" name="Reported Frauds" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Dimension Analysis */}
      <Tabs defaultValue="channel">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Fraud Analysis by Dimension</h2>
          <TabsList>
            <TabsTrigger value="channel">Channel</TabsTrigger>
            <TabsTrigger value="paymentMode">Payment Mode</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="channel">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
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
        </TabsContent>
        <TabsContent value="paymentMode">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={paymentModeData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
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
        </TabsContent>
      </Tabs>

      {/* Confusion Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Model Evaluation</CardTitle>
          <CardDescription>Confusion matrix and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-lg font-medium">Precision</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-muted rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                  <span className="ml-2 font-medium">80%</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">Recall</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-muted rounded-full h-4">
                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                  <span className="ml-2 font-medium">88%</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">F1 Score</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-muted rounded-full h-4">
                    <div className="bg-purple-500 h-4 rounded-full" style={{ width: "84%" }}></div>
                  </div>
                  <span className="ml-2 font-medium">84%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

