"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Edit, Calendar, TrendingUp, Clock, FileText, AlertTriangle, Bell, User } from "lucide-react"
import Link from "next/link"
import { PaymentReminderModal } from "@/components/payment-reminder-modal"
import { CreateGroupModal } from "@/components/create-group-modal"

// Mock data - in a real app, this would come from props or API
const groupData = {
  id: "1",
  name: "Lagos Market Traders",
  contributionAmount: 50000,
  frequency: "Weekly",
  totalCycles: 20,
  completedCycles: 15,
  progress: 75,
  nextPaymentDate: "2024-01-15",
  members: [
    { id: "1", name: "Adebayo Johnson", contact: "+234 801 234 5678", order: 1 },
    { id: "2", name: "Fatima Abdullahi", contact: "+234 802 345 6789", order: 2 },
    { id: "3", name: "Chinedu Okafor", contact: "+234 803 456 7890", order: 3 },
    { id: "4", name: "Aisha Mohammed", contact: "+234 804 567 8901", order: 4 },
  ],
  paymentHistory: [
    { cycle: 15, date: "2024-01-08", member: "Adebayo Johnson", status: true },
    { cycle: 15, date: "2024-01-08", member: "Fatima Abdullahi", status: true },
    { cycle: 15, date: "2024-01-08", member: "Chinedu Okafor", status: false },
    { cycle: 15, date: "2024-01-08", member: "Aisha Mohammed", status: true },
    { cycle: 14, date: "2024-01-01", member: "Adebayo Johnson", status: true },
    { cycle: 14, date: "2024-01-01", member: "Fatima Abdullahi", status: true },
    { cycle: 14, date: "2024-01-01", member: "Chinedu Okafor", status: true },
    { cycle: 14, date: "2024-01-01", member: "Aisha Mohammed", status: true },
  ],
}

export default function GroupDetailsPage() {
  const [paymentStatuses, setPaymentStatuses] = useState<Record<string, boolean>>(
    groupData.paymentHistory.reduce(
      (acc, payment, index) => {
        acc[`${payment.cycle}-${index}`] = payment.status
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const [paymentDates, setPaymentDates] = useState<Record<string, string>>(
    groupData.paymentHistory.reduce(
      (acc, payment, index) => {
        acc[`${payment.cycle}-${index}`] = payment.status ? payment.date : ""
        return acc
      },
      {} as Record<string, string>,
    ),
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const togglePaymentStatus = (key: string) => {
    setPaymentStatuses((prev) => {
      const newStatus = !prev[key]
      if (newStatus && !paymentDates[key]) {
        setPaymentDates((prevDates) => ({
          ...prevDates,
          [key]: new Date().toISOString().split("T")[0],
        }))
      }
      return {
        ...prev,
        [key]: newStatus,
      }
    })
  }

  const updatePaymentDate = (key: string, date: string) => {
    setPaymentDates((prev) => ({
      ...prev,
      [key]: date,
    }))
  }

  const currentCyclePayments = groupData.paymentHistory.filter((p) => p.cycle === 15)
  const paidCount = currentCyclePayments.filter(
    (_, index) => paymentStatuses[`15-${groupData.paymentHistory.findIndex((p) => p === currentCyclePayments[index])}`],
  ).length

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
              <h1 className="text-3xl font-bold text-gray-900">{groupData.name}</h1>
              <p className="text-gray-600 mt-1">Manage contributions and track payments</p>
            </div>
          </div>
          <div className="flex gap-2">
            <PaymentReminderModal selectedMembers={["Chinedu Okafor"]}>
              <Button variant="outline" className="border-gray-300 bg-transparent">
                <Bell className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
            </PaymentReminderModal>
            <CreateGroupModal>
              <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Group
              </Button>
            </CreateGroupModal>
          </div>
        </div>

        {/* Next Payment Banner */}
        <Card className="border-l-4 border-l-amber-500 bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900">Next Payment Due</h3>
                <p className="text-amber-800">
                  {new Date(groupData.nextPaymentDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  - Cycle {groupData.completedCycles + 1}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Contribution Amount</CardTitle>
              <div className="p-2 rounded-lg bg-blue-50">
                <TrendingUp className="h-5 w-5 text-blue-800" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{formatCurrency(groupData.contributionAmount)}</div>
              <p className="text-xs text-gray-500 mt-1">Per {groupData.frequency.toLowerCase()}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Frequency</CardTitle>
              <div className="p-2 rounded-lg bg-emerald-50">
                <Calendar className="h-5 w-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{groupData.frequency}</div>
              <p className="text-xs text-gray-500 mt-1">Payment schedule</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Cycles</CardTitle>
              <div className="p-2 rounded-lg bg-amber-50">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{groupData.totalCycles}</div>
              <p className="text-xs text-gray-500 mt-1">Total planned</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Cycles Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{groupData.completedCycles}</div>
              <p className="text-xs text-gray-500 mt-1">
                {groupData.totalCycles - groupData.completedCycles} remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Completion Progress</span>
              <span className="font-bold text-gray-900">{groupData.progress}%</span>
            </div>
            <Progress value={groupData.progress} className="h-3 bg-gray-100" />
            <div className="text-sm text-gray-500">
              {groupData.completedCycles} of {groupData.totalCycles} cycles completed
            </div>
          </CardContent>
        </Card>

        {/* Payment Tracker */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Current Cycle Payments</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Cycle {groupData.completedCycles + 1} - {paidCount} of {currentCyclePayments.length} paid
              </p>
            </div>
            <Button variant="outline" className="border-gray-300 bg-transparent" asChild>
              <Link href={`/groups/${groupData.id}/payments`}>
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">View Full History</span>
                <span className="sm:hidden">History</span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="hidden md:block">
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b pb-3">
                  <div className="col-span-1">Order</div>
                  <div className="col-span-3">Member Name</div>
                  <div className="col-span-2">Contact</div>
                  <div className="col-span-2">Payment Date</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {currentCyclePayments.map((payment, index) => {
                  const member = groupData.members.find((m) => m.name === payment.member)
                  const paymentKey = `15-${groupData.paymentHistory.findIndex((p) => p === payment)}`
                  const isPaid = paymentStatuses[paymentKey]
                  const paymentDate = paymentDates[paymentKey] || ""

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="col-span-1">
                        <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                          {member?.order}
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="font-medium text-gray-900">{payment.member}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-gray-600">{member?.contact}</div>
                      </div>
                      <div className="col-span-2">
                        {isPaid ? (
                          <Input
                            type="date"
                            value={paymentDate}
                            onChange={(e) => updatePaymentDate(paymentKey, e.target.value)}
                            className="text-sm border-gray-300 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-sm text-gray-400">Not paid</div>
                        )}
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={isPaid}
                            onCheckedChange={() => togglePaymentStatus(paymentKey)}
                            className="data-[state=checked]:bg-emerald-600"
                          />
                          <Badge
                            className={
                              isPaid
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }
                          >
                            {isPaid ? "Paid" : "Unpaid"}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/groups/${groupData.id}/members/${member?.id}`}>
                            <User className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="md:hidden space-y-4">
              {currentCyclePayments.map((payment, index) => {
                const member = groupData.members.find((m) => m.name === payment.member)
                const paymentKey = `15-${groupData.paymentHistory.findIndex((p) => p === payment)}`
                const isPaid = paymentStatuses[paymentKey]
                const paymentDate = paymentDates[paymentKey] || ""

                return (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                            {member?.order}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{payment.member}</div>
                            <div className="text-sm text-gray-600">{member?.contact}</div>
                          </div>
                        </div>
                        <Badge
                          className={
                            isPaid
                              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }
                        >
                          {isPaid ? "Paid" : "Unpaid"}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Payment Status</span>
                          <Switch
                            checked={isPaid}
                            onCheckedChange={() => togglePaymentStatus(paymentKey)}
                            className="data-[state=checked]:bg-emerald-600"
                          />
                        </div>

                        {isPaid && (
                          <div className="space-y-2">
                            <label className="text-sm text-gray-600">Payment Date</label>
                            <Input
                              type="date"
                              value={paymentDate}
                              onChange={(e) => updatePaymentDate(paymentKey, e.target.value)}
                              className="text-sm border-gray-300 focus:border-blue-500"
                            />
                          </div>
                        )}

                        <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                          <Link href={`/groups/${groupData.id}/members/${member?.id}`}>
                            <User className="h-4 w-4 mr-2" />
                            View Member History
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
