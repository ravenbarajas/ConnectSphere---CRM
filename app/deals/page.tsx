import type { Metadata } from "next"
import { DealsPipeline } from "@/components/deals/deals-pipeline"
import { DealsHeader } from "@/components/deals/deals-header"

export const metadata: Metadata = {
  title: "Deals | ClientFlow CRM",
  description: "Manage your deals pipeline in ClientFlow CRM",
}

export default function DealsPage() {
  return (
    <div className="flex flex-col gap-4">
      <DealsHeader />
      <DealsPipeline />
    </div>
  )
}
