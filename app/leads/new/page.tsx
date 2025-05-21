import type { Metadata } from "next"
import { LeadForm } from "@/components/leads/lead-form"

export const metadata: Metadata = {
  title: "Add Lead | ConnectSphere CRM",
  description: "Add a new lead to ConnectSphere CRM",
}

export default function NewLeadPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Lead</h1>
      <LeadForm />
    </div>
  )
}
