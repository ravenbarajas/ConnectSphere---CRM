"use client"
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core"

import { useCRM } from "@/context/crm-context"
import { DealStage } from "./deal-stage"
import type { Deal } from "@/types"

export function DealsPipeline() {
  const { deals, filteredDeals, updateDeal } = useCRM()
  const displayDeals = filteredDeals.length > 0 ? filteredDeals : deals

  const stages = [
    { id: "New", title: "New", color: "bg-blue-500" },
    { id: "Contacted", title: "Contacted", color: "bg-purple-500" },
    { id: "Proposal", title: "Proposal Sent", color: "bg-amber-500" },
    { id: "Negotiation", title: "Negotiation", color: "bg-orange-500" },
    { id: "Won", title: "Won", color: "bg-green-500" },
    { id: "Lost", title: "Lost", color: "bg-gray-500" },
  ]

  const dealsByStage = stages.reduce<Record<string, Deal[]>>((acc, stage) => {
    acc[stage.id] = displayDeals.filter((deal) => deal.stage === stage.id)
    return acc
  }, {})

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const dealId = active.id as string
    const targetStage = over.id as string

    if (targetStage.startsWith("stage-")) {
      const newStage = targetStage.replace("stage-", "")
      const deal = deals.find((d) => d.id === dealId)

      if (deal && deal.stage !== newStage) {
        updateDeal({
          ...deal,
          stage: newStage,
        })
      }
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stages.map((stage) => (
          <DealStage
            key={stage.id}
            id={`stage-${stage.id}`}
            title={stage.title}
            color={stage.color}
            deals={dealsByStage[stage.id] || []}
          />
        ))}
      </div>
    </DndContext>
  )
}
