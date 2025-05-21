import type { Metadata } from "next"
import { LeadsTable } from "@/components/leads/leads-table"
import { LeadsHeader } from "@/components/leads/leads-header"

export const metadata: Metadata = {
  title: "Leads | ConnectSphere CRM",
  description: "Manage your leads in ConnectSphere CRM",
}

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-4">
      <LeadsHeader />
      <LeadsTable />
    </div>
  )
}
