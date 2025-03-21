"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"

// Sample transaction data - in a real app, this would come from your API
const sampleTransactions = [
  {
    transaction_id: "TXN123456789",
    transaction_date: "2023-12-01",
    transaction_amount: 1250.0,
    transaction_channel: "web",
    transaction_payment_mode: "card",
    payment_gateway_bank: "HDFC",
    payer_email: "john.doe@example.com",
    payer_mobile: "9876543210",
    payer_card_brand: "Visa",
    payer_device: "Windows PC",
    payer_browser: "Chrome",
    payee_id: "PAYEE001",
    is_fraud_predicted: true,
    is_fraud_reported: true,
    fraud_score: 0.89,
    fraud_reason: "Unusual location and high amount",
  },
  {
    transaction_id: "TXN123456790",
    transaction_date: "2023-12-02",
    transaction_amount: 450.0,
    transaction_channel: "mobile",
    transaction_payment_mode: "upi",
    payment_gateway_bank: "SBI",
    payer_email: "jane.smith@example.com",
    payer_mobile: "9876543211",
    payer_card_brand: "",
    payer_device: "Android",
    payer_browser: "App",
    payee_id: "PAYEE002",
    is_fraud_predicted: false,
    is_fraud_reported: false,
    fraud_score: 0.12,
    fraud_reason: "",
  },
  {
    transaction_id: "TXN123456791",
    transaction_date: "2023-12-03",
    transaction_amount: 3500.0,
    transaction_channel: "web",
    transaction_payment_mode: "neft",
    payment_gateway_bank: "ICICI",
    payer_email: "robert.johnson@example.com",
    payer_mobile: "9876543212",
    payer_card_brand: "",
    payer_device: "Mac",
    payer_browser: "Safari",
    payee_id: "PAYEE003",
    is_fraud_predicted: true,
    is_fraud_reported: false,
    fraud_score: 0.75,
    fraud_reason: "Multiple transactions in short time",
  },
  {
    transaction_id: "TXN123456792",
    transaction_date: "2023-12-04",
    transaction_amount: 750.0,
    transaction_channel: "mobile",
    transaction_payment_mode: "card",
    payment_gateway_bank: "Axis",
    payer_email: "sarah.williams@example.com",
    payer_mobile: "9876543213",
    payer_card_brand: "Mastercard",
    payer_device: "iPhone",
    payer_browser: "App",
    payee_id: "PAYEE004",
    is_fraud_predicted: false,
    is_fraud_reported: false,
    fraud_score: 0.05,
    fraud_reason: "",
  },
  {
    transaction_id: "TXN123456793",
    transaction_date: "2023-12-05",
    transaction_amount: 12500.0,
    transaction_channel: "web",
    transaction_payment_mode: "card",
    payment_gateway_bank: "HDFC",
    payer_email: "michael.brown@example.com",
    payer_mobile: "9876543214",
    payer_card_brand: "Amex",
    payer_device: "Windows PC",
    payer_browser: "Firefox",
    payee_id: "PAYEE005",
    is_fraud_predicted: true,
    is_fraud_reported: true,
    fraud_score: 0.95,
    fraud_reason: "Unusual amount and new device",
  },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(sampleTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [paymentMode, setPaymentMode] = useState("")
  const [channel, setChannel] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Search by transaction ID
    const matchesSearch = transaction.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by date range
    const transactionDate = new Date(transaction.transaction_date)
    const matchesDateRange =
      (!dateRange.from || transactionDate >= dateRange.from) && (!dateRange.to || transactionDate <= dateRange.to)

    // Filter by payment mode
    const matchesPaymentMode = !paymentMode || transaction.transaction_payment_mode === paymentMode

    // Filter by channel
    const matchesChannel = !channel || transaction.transaction_channel === channel

    return matchesSearch && matchesDateRange && matchesPaymentMode && matchesChannel
  })

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, dateRange, paymentMode, channel])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View and analyze transaction data</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Filters</CardTitle>
          <CardDescription>Filter transactions by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search by Transaction ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction ID</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

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

            {/* Payment Mode Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Mode</label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger>
                  <SelectValue placeholder="All Payment Modes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Modes</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="neft">NEFT</SelectItem>
                  <SelectItem value="imps">IMPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Channel Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Channel</label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="pos">POS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
          <CardDescription>
            Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
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
                  <TableHead>Channel</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Payer Email</TableHead>
                  <TableHead>Fraud Predicted</TableHead>
                  <TableHead>Fraud Reported</TableHead>
                  <TableHead>Fraud Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.transaction_id}>
                      <TableCell className="font-medium">{transaction.transaction_id}</TableCell>
                      <TableCell>{transaction.transaction_date}</TableCell>
                      <TableCell>${transaction.transaction_amount.toFixed(2)}</TableCell>
                      <TableCell className="capitalize">{transaction.transaction_channel}</TableCell>
                      <TableCell className="uppercase">{transaction.transaction_payment_mode}</TableCell>
                      <TableCell>{transaction.payer_email}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.is_fraud_predicted ? "destructive" : "outline"}>
                          {transaction.is_fraud_predicted ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.is_fraud_reported ? "destructive" : "outline"}>
                          {transaction.is_fraud_reported ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {transaction.fraud_score > 0.7 ? (
                          <span className="text-red-500 font-medium">{transaction.fraud_score.toFixed(2)}</span>
                        ) : transaction.fraud_score > 0.3 ? (
                          <span className="text-amber-500 font-medium">{transaction.fraud_score.toFixed(2)}</span>
                        ) : (
                          <span className="text-green-500 font-medium">{transaction.fraud_score.toFixed(2)}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNumber)}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  {totalPages > 5 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(totalPages)}
                          isActive={currentPage === totalPages}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

