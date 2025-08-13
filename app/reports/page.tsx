"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  FileImage,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from API
const groupsData = [
  {
    id: "1",
    name: "Lagos Market Traders",
    contributionAmount: 50000,
    frequency: "Weekly",
    totalCycles: 20,
    completedCycles: 15,
    members: 4,
    totalCollected: 3000000,
    averagePaymentTime: 1.2,
    onTimePayments: 85,
    latePayments: 10,
    missedPayments: 5,
  },
  {
    id: "2",
    name: "Tech Professionals",
    contributionAmount: 100000,
    frequency: "Monthly",
    totalCycles: 12,
    completedCycles: 5,
    members: 8,
    totalCollected: 4000000,
    averagePaymentTime: 0.8,
    onTimePayments: 92,
    latePayments: 6,
    missedPayments: 2,
  },
  {
    id: "3",
    name: "University Friends",
    contributionAmount: 25000,
    frequency: "Weekly",
    totalCycles: 10,
    completedCycles: 9,
    members: 6,
    totalCollected: 1350000,
    averagePaymentTime: 2.1,
    onTimePayments: 78,
    latePayments: 15,
    missedPayments: 7,
  },
]

const cycleReports = [
  {
    cycle: 15,
    date: "2024-01-08",
    totalDue: 200000,
    totalPaid: 150000,
    onTime: 3,
    late: 0,
    missed: 1,
    completionRate: 75,
  },
  {
    cycle: 14,
    date: "2024-01-01",
    totalDue: 200000,
    totalPaid: 200000,
    onTime: 4,
    late: 0,
    missed: 0,
    completionRate: 100,
  },
  {
    cycle: 13,
    date: "2023-12-25",
    totalDue: 200000,
    totalPaid: 200000,
    onTime: 3,
    late: 1,
    missed: 0,
    completionRate: 100,
  },
  {
    cycle: 12,
    date: "2023-12-18",
    totalDue: 200000,
    totalPaid: 200000,
    onTime: 4,
    late: 0,
    missed: 0,
    completionRate: 100,
  },
  {
    cycle: 11,
    date: "2023-12-11",
    totalDue: 200000,
    totalPaid: 150000,
    onTime: 2,
    late: 1,
    missed: 1,
    completionRate: 75,
  },
  {
    cycle: 10,
    date: "2023-12-04",
    totalDue: 200000,
    totalPaid: 200000,
    onTime: 4,
    late: 0,
    missed: 0,
    completionRate: 100,
  },
]

export default function ReportsPage() {
  const [selectedGroup, setSelectedGroup] = useState("1")
  const [reportPeriod, setReportPeriod] = useState("all")

  const currentGroup = groupsData.find((g) => g.id === selectedGroup) || groupsData[0]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    // In a real app, this would trigger the actual export
    console.log(`Exporting ${currentGroup.name} report as ${format.toUpperCase()}`)

    // Mock download
    const element = document.createElement("a")
    const filename = `${currentGroup.name.replace(/\s+/g, "_")}_report.${format === "excel" ? "xlsx" : format}`
    element.setAttribute("download", filename)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const overallStats = {
    totalCollected: cycleReports.reduce((sum, cycle) => sum + cycle.totalPaid, 0),
    averageCompletionRate: Math.round(
      cycleReports.reduce((sum, cycle) => sum + cycle.completionRate, 0) / cycleReports.length,
    ),
    totalOnTime: cycleReports.reduce((sum, cycle) => sum + cycle.onTime, 0),
    totalLate: cycleReports.reduce((sum, cycle) => sum + cycle.late, 0),
    totalMissed: cycleReports.reduce((sum, cycle) => sum + cycle.missed, 0),
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">Comprehensive group performance analysis</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Group</label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Choose a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupsData.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Report Period</label>
                <Select value={reportPeriod} onValueChange={setReportPeriod}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last-6">Last 6 Cycles</SelectItem>
                    <SelectItem value="last-3">Last 3 Cycles</SelectItem>
                    <SelectItem value="current">Current Cycle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button
                  onClick={() => handleExport("csv")}
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button
                  onClick={() => handleExport("excel")}
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button
                  onClick={() => handleExport("pdf")}
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <FileImage className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Group Overview */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">{currentGroup.name} - Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Contribution Amount</div>
                <div className="text-2xl font-bold text-blue-800">
                  {formatCurrency(currentGroup.contributionAmount)}
                </div>
                <div className="text-xs text-gray-500">{currentGroup.frequency}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-2xl font-bold text-gray-900">
                  {currentGroup.completedCycles}/{currentGroup.totalCycles}
                </div>
                <Progress value={(currentGroup.completedCycles / currentGroup.totalCycles) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Total Members</div>
                <div className="text-2xl font-bold text-gray-900">{currentGroup.members}</div>
                <div className="text-xs text-gray-500">Active participants</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Total Collected</div>
                <div className="text-2xl font-bold text-emerald-600">{formatCurrency(currentGroup.totalCollected)}</div>
                <div className="text-xs text-gray-500">All time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Average Payment Time</CardTitle>
              <div className="p-2 rounded-lg bg-blue-50">
                <Clock className="h-5 w-5 text-blue-800" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{currentGroup.averagePaymentTime} days</div>
              <p className="text-xs text-gray-500 mt-1">After due date</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">On-Time Payments</CardTitle>
              <div className="p-2 rounded-lg bg-emerald-50">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{currentGroup.onTimePayments}%</div>
              <p className="text-xs text-gray-500 mt-1">Payment reliability</p>
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
              <div className="text-2xl font-bold text-amber-600">{currentGroup.latePayments}%</div>
              <p className="text-xs text-gray-500 mt-1">Paid after due date</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Missed Payments</CardTitle>
              <div className="p-2 rounded-lg bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{currentGroup.missedPayments}%</div>
              <p className="text-xs text-gray-500 mt-1">Unpaid contributions</p>
            </CardContent>
          </Card>
        </div>

        {/* Cycle-by-Cycle Report */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Cycle Performance Report</CardTitle>
            <p className="text-sm text-gray-600">Detailed breakdown of each contribution cycle</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b pb-3">
                <div className="col-span-1">Cycle</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Total Due</div>
                <div className="col-span-2">Total Paid</div>
                <div className="col-span-1">On Time</div>
                <div className="col-span-1">Late</div>
                <div className="col-span-1">Missed</div>
                <div className="col-span-2">Completion Rate</div>
              </div>

              {cycleReports.map((cycle) => (
                <div
                  key={cycle.cycle}
                  className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1">
                    <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {cycle.cycle}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-900">{new Date(cycle.date).toLocaleDateString()}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(cycle.totalDue)}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-emerald-600">{formatCurrency(cycle.totalPaid)}</div>
                  </div>
                  <div className="col-span-1">
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">{cycle.onTime}</Badge>
                  </div>
                  <div className="col-span-1">
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">{cycle.late}</Badge>
                  </div>
                  <div className="col-span-1">
                    <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">{cycle.missed}</Badge>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Progress value={cycle.completionRate} className="h-2 flex-1" />
                      <span className="text-xs font-medium text-gray-600 w-8">{cycle.completionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <Card className="border-0 shadow-sm bg-white border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-800" />
              Summary Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-800">{formatCurrency(overallStats.totalCollected)}</div>
                <div className="text-sm text-blue-700 mt-1">Total Contributions Received</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">{overallStats.averageCompletionRate}%</div>
                <div className="text-sm text-emerald-700 mt-1">Average Completion Rate</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{currentGroup.averagePaymentTime} days</div>
                <div className="text-sm text-amber-700 mt-1">Average Payment Time</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{cycleReports.length}</div>
                <div className="text-sm text-gray-700 mt-1">Total Cycles Analyzed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
