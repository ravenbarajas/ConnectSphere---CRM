import type { Metadata } from "next"
import { ActivitiesTable } from "@/components/activities/activities-table"
import { ActivitiesHeader } from "@/components/activities/activities-header"

export const metadata: Metadata = {
  title: "Activities | ClientFlow CRM",
  description: "View your activity log in ClientFlow CRM",
}

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col gap-4">
      <ActivitiesHeader />
      <ActivitiesTable />
    </div>
  )
}
