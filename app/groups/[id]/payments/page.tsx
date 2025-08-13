"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Download, CheckCircle, XCircle, Clock, AlertTriangle, User } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from props or API
const groupData = {
  id: "1",
  name: "Lagos Market Traders",
  contributionAmount: 50000,
  frequency: "Weekly",
}

const paymentHistory = [
  {
    id: "1",
    cycle: 15,
    date: "2024-01-08",
    member: "Adebayo Johnson",
    status: "paid",
    amount: 50000,
    dueDate: "2024-01-08",
    paidDate: "2024-01-08",
  },
  {
    id: "2",
    cycle: 15,
    date: "2024-01-08",
    member: "Fatima Abdullahi",
    status: "paid",
    amount: 50000,
    dueDate: "2024-01-08",
    paidDate: "2024-01-07",
  },
  {
    id: "3",
    cycle: 15,
    date: "2024-01-08",
    member: "Chinedu Okafor",
    status: "overdue",
    amount: 50000,
    dueDate: "2024-01-08",
    paidDate: null,
  },
  {
    id: "4",
    cycle: 15,
    date: "2024-01-08",
    member: "Aisha Mohammed",
    status: "paid",
    amount: 50000,
    dueDate: "2024-01-08",
    paidDate: "2024-01-08",
  },
  {
    id: "5",
    cycle: 14,
    date: "2024-01-01",
    member: "Adebayo Johnson",
    status: "paid",
    amount: 50000,
    dueDate: "2024-01-01",
    paidDate: "2024-01-01",
  },
  {
    id: "6",
    cycle: 14,
    date: "2024-01-01",
    member: "Fatima Abdullahi",
    status: "paid",
    amount: 50000,
    dueDate: "2024-01-01",
    paidDate: "2023-12-31",
  },
  {
    id: "7",
    cycle: 14,
    date: "2024-01-01",
    member: "Chinedu Okafor",
    status: "paid",
    amount: 50000,
    dueDate: "2024-01-01",
    paidDate: "2024-01-02",
  },
  {
    id: "8",
    cycle: 14,
    date: "2024-01-01",
    member: "Aisha Mohammed",
    status: "paid",
    amount: 50000,
    dueDate: "2024-01-01",
    paidDate: "2024-01-01",
  },
  {
    id: "9",
    cycle: 13,
    date: "2023-12-25",
    member: "Adebayo Johnson",
    status: "paid",
    amount: 50000,
    dueDate: "2023-12-25",
    paidDate: "2023-12-25",
  },
  {
    id: "10",
    cycle: 13,
    date: "2023-12-25",
    member: "Fatima Abdullahi",
    status: "paid",
    amount: 50000,
    dueDate: "2023-12-25",
    paidDate: "2023-12-24",
  },
  {
    id: "11",
    cycle: 13,
    date: "2023-12-25",
    member: "Chinedu Okafor",
    status: "late",
    amount: 50000,
    dueDate: "2023-12-25",
    paidDate: "2023-12-27",
  },
  {
    id: "12",
    cycle: 13,
    date: "2023-12-25",
    member: "Aisha Mohammed",
    status: "paid",
    amount: 50000,
    dueDate: "2023-12-25",
    paidDate: "2023-12-25",
  },
]

export default function PaymentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [cycleFilter, setCycleFilter] = useState("all")
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        )
      case "late":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Late
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-600 border-gray-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const filteredPayments = paymentHistory.filter((payment) => {
    const matchesSearch = payment.member.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesCycle = cycleFilter === "all" || payment.cycle.toString() === cycleFilter
    return matchesSearch && matchesStatus && matchesCycle
  })

  const togglePaymentSelection = (paymentId: string) => {
    setSelectedPayments((prev) =>
      prev.includes(paymentId) ? prev.filter((id) => id !== paymentId) : [...prev, paymentId],
    )
  }

  const toggleAllPayments = () => {
    setSelectedPayments(selectedPayments.length === filteredPayments.length ? [] : filteredPayments.map((p) => p.id))
  }

  const stats = {
    totalPaid: paymentHistory.filter((p) => p.status === "paid").length,
    totalOverdue: paymentHistory.filter((p) => p.status === "overdue").length,
    totalLate: paymentHistory.filter((p) => p.status === "late").length,
    totalAmount: paymentHistory.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
  }

  const uniqueCycles = [...new Set(paymentHistory.map((p) => p.cycle))].sort((a, b) => b - a)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href={`/groups/${groupData.id}`}>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Group
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
              <p className="text-gray-600 mt-1">{groupData.name} - All payment records</p>
            </div>
          </div>
          <Button className="bg-blue-800 hover:bg-blue-900 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Paid</CardTitle>
              <div className="p-2 rounded-lg bg-emerald-50">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{stats.totalPaid}</div>
              <p className="text-xs text-gray-500 mt-1">Completed payments</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
              <div className="p-2 rounded-lg bg-red-50">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.totalOverdue}</div>
              <p className="text-xs text-gray-500 mt-1">Pending payments</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Late Payments</CardTitle>
              <div className="p-2 rounded-lg bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats.totalLate}</div>
              <p className="text-xs text-gray-500 mt-1">Paid after due date</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Collected</CardTitle>
              <div className="p-2 rounded-lg bg-blue-50">
                <CheckCircle className="h-5 w-5 text-blue-800" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{formatCurrency(stats.totalAmount)}</div>
              <p className="text-xs text-gray-500 mt-1">Total amount received</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by member name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 border-gray-300">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={cycleFilter} onValueChange={setCycleFilter}>
                  <SelectTrigger className="w-32 border-gray-300">
                    <SelectValue placeholder="Cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cycles</SelectItem>
                    {uniqueCycles.map((cycle) => (
                      <SelectItem key={cycle} value={cycle.toString()}>
                        Cycle {cycle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History Table */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Payment Records</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredPayments.length} of {paymentHistory.length} payments
              </p>
            </div>
            {selectedPayments.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                  Mark as Paid ({selectedPayments.length})
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                  Send Reminder ({selectedPayments.length})
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block">
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b pb-3">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                      onChange={toggleAllPayments}
                      className="rounded border-gray-300"
                    />
                  </div>
                  <div className="col-span-1">Cycle</div>
                  <div className="col-span-2">Member</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2">Due Date</div>
                  <div className="col-span-2">Paid Date</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>

                {filteredPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => togglePaymentSelection(payment.id)}
                        className="rounded border-gray-300"
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                        {payment.cycle}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-medium text-gray-900">{payment.member}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-gray-600">{new Date(payment.dueDate).toLocaleDateString()}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-gray-600">
                        {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : "-"}
                      </div>
                    </div>
                    <div className="col-span-1">{getStatusBadge(payment.status)}</div>
                    <div className="col-span-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/groups/${groupData.id}/members/1`}>
                          <User className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:hidden space-y-4">
              {filteredPayments.map((payment) => (
                <Card key={payment.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedPayments.includes(payment.id)}
                          onChange={() => togglePaymentSelection(payment.id)}
                          className="rounded border-gray-300 mt-1"
                        />
                        <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                          {payment.cycle}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{payment.member}</div>
                          <div className="text-sm text-gray-600">{formatCurrency(payment.amount)}</div>
                        </div>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="text-gray-900">{new Date(payment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paid Date:</span>
                        <span className="text-gray-900">
                          {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : "Not paid"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <Link href={`/groups/${groupData.id}/members/1`}>
                          <User className="h-4 w-4 mr-2" />
                          View Member Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
