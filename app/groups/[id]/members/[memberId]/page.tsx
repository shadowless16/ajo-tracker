"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Calendar, CheckCircle, XCircle, Clock, AlertTriangle, Phone, Mail } from "lucide-react"
import Link from "next/link"

// Mock data for individual member
const memberData = {
  id: "1",
  name: "Adebayo Johnson",
  contact: "+234 801 234 5678",
  email: "adebayo.johnson@email.com",
  order: 1,
  joinDate: "2023-06-15",
  totalPaid: 750000,
  totalDue: 800000,
  paymentHistory: [
    { cycle: 15, dueDate: "2024-01-08", paidDate: "2024-01-08", amount: 50000, status: "paid" },
    { cycle: 14, dueDate: "2024-01-01", paidDate: "2024-01-01", amount: 50000, status: "paid" },
    { cycle: 13, dueDate: "2023-12-25", paidDate: "2023-12-25", amount: 50000, status: "paid" },
    { cycle: 12, dueDate: "2023-12-18", paidDate: "2023-12-20", amount: 50000, status: "late" },
    { cycle: 11, dueDate: "2023-12-11", paidDate: "2023-12-11", amount: 50000, status: "paid" },
    { cycle: 10, dueDate: "2023-12-04", paidDate: "2023-12-03", amount: 50000, status: "paid" },
    { cycle: 9, dueDate: "2023-11-27", paidDate: "2023-11-27", amount: 50000, status: "paid" },
    { cycle: 8, dueDate: "2023-11-20", paidDate: "2023-11-22", amount: 50000, status: "late" },
  ],
}

const groupData = {
  id: "1",
  name: "Lagos Market Traders",
  contributionAmount: 50000,
  frequency: "Weekly",
}

export default function MemberDetailsPage({ params }: { params: { id: string; memberId: string } }) {
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
      case "late":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Late
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Overdue
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

  const paymentRate =
    (memberData.paymentHistory.filter((p) => p.status === "paid" || p.status === "late").length /
      memberData.paymentHistory.length) *
    100

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href={`/groups/${params.id}`}>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Group
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{memberData.name}</h1>
              <p className="text-gray-600 mt-1">
                {groupData.name} - Member #{memberData.order}
              </p>
            </div>
          </div>
        </div>

        {/* Member Info Card */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5" />
              Member Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-medium text-gray-900">{memberData.contact}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium text-gray-900">{memberData.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Join Date</div>
                    <div className="font-medium text-gray-900">
                      {new Date(memberData.joinDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="text-sm text-emerald-700 font-medium">Total Paid</div>
                  <div className="text-2xl font-bold text-emerald-800">{formatCurrency(memberData.totalPaid)}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-700 font-medium">Payment Rate</div>
                  <div className="text-2xl font-bold text-blue-800">{paymentRate.toFixed(0)}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Payment History</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Complete record of all contributions</p>
          </CardHeader>
          <CardContent>
            {/* Desktop view */}
            <div className="hidden md:block">
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700 border-b pb-3">
                  <div>Cycle</div>
                  <div>Due Date</div>
                  <div>Paid Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Days Late</div>
                </div>

                {memberData.paymentHistory.map((payment, index) => {
                  const daysLate =
                    payment.paidDate && payment.status === "late"
                      ? Math.ceil(
                          (new Date(payment.paidDate).getTime() - new Date(payment.dueDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )
                      : 0

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900">Cycle {payment.cycle}</div>
                      <div className="text-sm text-gray-600">{new Date(payment.dueDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600">
                        {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : "-"}
                      </div>
                      <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                      <div>{getStatusBadge(payment.status)}</div>
                      <div className="text-sm text-gray-600">{daysLate > 0 ? `${daysLate} days` : "-"}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {memberData.paymentHistory.map((payment, index) => {
                const daysLate =
                  payment.paidDate && payment.status === "late"
                    ? Math.ceil(
                        (new Date(payment.paidDate).getTime() - new Date(payment.dueDate).getTime()) /
                          (1000 * 60 * 60 * 24),
                      )
                    : 0

                return (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium text-gray-900">Cycle {payment.cycle}</div>
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
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium text-gray-900">{formatCurrency(payment.amount)}</span>
                        </div>
                        {daysLate > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Days Late:</span>
                            <span className="text-amber-600 font-medium">{daysLate} days</span>
                          </div>
                        )}
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
