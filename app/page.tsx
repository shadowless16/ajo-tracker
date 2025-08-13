"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/empty-state"
import { Plus, Users, Calendar, CheckCircle, TrendingUp, BarChart3 } from "lucide-react"
import { CreateGroupModal } from "@/components/create-group-modal"
import Link from "next/link"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<any[]>([])

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Mock data for demonstration
      setGroups([
        {
          id: 1,
          name: "Lagos Market Traders",
          amount: 50000,
          frequency: "Weekly",
          progress: 75,
          nextPayment: "2024-01-15",
          totalCycles: 20,
          completedCycles: 15,
          status: "active",
        },
        {
          id: 2,
          name: "Tech Professionals",
          amount: 100000,
          frequency: "Monthly",
          progress: 40,
          nextPayment: "2024-01-20",
          totalCycles: 12,
          completedCycles: 5,
          status: "active",
        },
        {
          id: 3,
          name: "University Friends",
          amount: 25000,
          frequency: "Weekly",
          progress: 90,
          nextPayment: "2024-01-12",
          totalCycles: 10,
          completedCycles: 9,
          status: "ending-soon",
        },
        {
          id: 4,
          name: "Office Colleagues",
          amount: 75000,
          frequency: "Bi-weekly",
          progress: 25,
          nextPayment: "2024-01-18",
          totalCycles: 16,
          completedCycles: 4,
          status: "active",
        },
      ])
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Mock data for demonstration
  const stats = [
    {
      title: "Total Groups Active",
      value: isLoading ? "..." : "12",
      icon: Users,
      color: "text-blue-800",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Members Across Groups",
      value: isLoading ? "..." : "156",
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Cycles Remaining",
      value: isLoading ? "..." : "48",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Total Completed Cycles",
      value: isLoading ? "..." : "234",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ending-soon":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 animate-pulse">Ending Soon</Badge>
      default:
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Active</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Loading Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Loading Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-0 shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading Groups */}
          <div className="space-y-6">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-9 w-full bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 animate-in fade-in-0 duration-500">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ajo Tracker</h1>
            <p className="text-gray-600 mt-1">Manage your contribution groups with ease</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-gray-300 bg-transparent" asChild>
              <Link href="/reports">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {currentDate}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor} transition-transform duration-200 hover:scale-110`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Groups List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Active Groups</h2>
              <p className="text-gray-600 mt-1">Monitor contribution progress and upcoming payments</p>
            </div>
          </div>

          {groups.length === 0 ? (
            <EmptyState type="groups" onAction={() => console.log("Create group")} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {groups.map((group, index) => (
                <Card
                  key={group.id}
                  className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group cursor-pointer animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
                          {group.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                            {group.frequency}
                          </Badge>
                          {getStatusBadge(group.status)}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">{formatCurrency(group.amount)}</div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 font-medium">Cycle Progress</span>
                        <span className="font-bold text-gray-900">{group.progress}%</span>
                      </div>
                      <div className="space-y-2">
                        <Progress value={group.progress} className="h-3 bg-gray-100 transition-all duration-500" />
                        <div className="text-xs text-gray-500 flex justify-between">
                          <span>{group.completedCycles} completed</span>
                          <span>{group.totalCycles - group.completedCycles} remaining</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 transition-colors duration-200 hover:bg-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Next Payment Due</span>
                        <span className="font-bold text-gray-900">
                          {new Date(group.nextPayment).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      {group.status === "ending-soon" && (
                        <div className="flex items-center gap-1 text-xs text-amber-700 animate-pulse">
                          <TrendingUp className="h-3 w-3" />
                          <span>Final cycles approaching</span>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                      size="sm"
                      asChild
                    >
                      <Link href={`/groups/${group.id}`}>View Group Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <CreateGroupModal>
          <Button
            size="lg"
            className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-800 hover:bg-blue-900 text-white border-0 hover:scale-110 active:scale-95"
          >
            <Plus className="h-7 w-7" />
          </Button>
        </CreateGroupModal>
      </div>
    </div>
  )
}
