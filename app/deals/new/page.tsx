import type { Metadata } from "next"
import { DealForm } from "@/components/deals/deal-form"

export const metadata: Metadata = {
  title: "Add Deal | ClientFlow CRM",
  description: "Add a new deal to ClientFlow CRM",
}

export default function NewDealPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Deal</h1>
      <DealForm />
    </div>
  )
}
