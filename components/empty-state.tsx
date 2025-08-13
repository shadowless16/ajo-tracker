"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Users, FileText, BarChart3 } from "lucide-react"

interface EmptyStateProps {
  type: "groups" | "payments" | "reports"
  onAction?: () => void
  actionLabel?: string
}

export function EmptyState({ type, onAction, actionLabel }: EmptyStateProps) {
  const configs = {
    groups: {
      icon: Users,
      title: "No groups yet",
      description: "Create your first Ajo group to start tracking contributions and managing payments.",
      actionLabel: actionLabel || "Create New Group",
      illustration: (
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
          <Users className="h-12 w-12 text-blue-300" />
        </div>
      ),
    },
    payments: {
      icon: FileText,
      title: "No payment history",
      description: "Payment records will appear here once members start making contributions.",
      actionLabel: actionLabel || "View Dashboard",
      illustration: (
        <div className="w-24 h-24 mx-auto mb-6 bg-emerald-50 rounded-full flex items-center justify-center">
          <FileText className="h-12 w-12 text-emerald-300" />
        </div>
      ),
    },
    reports: {
      icon: BarChart3,
      title: "No data to report",
      description: "Reports will be generated once you have active groups with payment history.",
      actionLabel: actionLabel || "Create First Group",
      illustration: (
        <div className="w-24 h-24 mx-auto mb-6 bg-amber-50 rounded-full flex items-center justify-center">
          <BarChart3 className="h-12 w-12 text-amber-300" />
        </div>
      ),
    },
  }

  const config = configs[type]

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-12 text-center">
        {config.illustration}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{config.title}</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{config.description}</p>
        {onAction && (
          <Button
            onClick={onAction}
            className="bg-blue-800 hover:bg-blue-900 text-white font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4 mr-2" />
            {config.actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
