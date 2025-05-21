"use client"

import { useCRM } from "@/context/crm-context"
import { formatDistanceToNow } from "date-fns"
import type { Activity } from "@/types"

export function RecentActivities() {
  const { activities } = useCRM()

  // Get the 5 most recent activities
  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

function ActivityItem({ activity }: { activity: Activity }) {
  const { contacts, deals } = useCRM()

  const contact = contacts.find((c) => c.id === activity.contactId)
  const deal = deals.find((d) => d.id === activity.dealId)

  const getActivityIcon = () => {
    switch (activity.type) {
      case "call":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-100">📞</span>
          </div>
        )
      case "meeting":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <span className="text-xs font-medium text-green-600 dark:text-green-100">🤝</span>
          </div>
        )
      case "email":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <span className="text-xs font-medium text-purple-600 dark:text-purple-100">✉️</span>
          </div>
        )
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">📝</span>
          </div>
        )
    }
  }

  return (
    <div className="flex items-start gap-4">
      {getActivityIcon()}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          {contact && ` with ${contact.name}`}
          {deal && ` regarding ${deal.name}`}
        </p>
        <p className="text-sm text-muted-foreground">{activity.notes}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  )
}
