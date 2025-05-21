"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import type { Deal } from "@/types"
import { DealCard } from "./deal-card"
import { cn } from "@/lib/utils"

interface DealStageProps {
  id: string
  title: string
  color: string
  deals: Deal[]
}

export function DealStage({ id, title, color, deals }: DealStageProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  const totalValue = deals.reduce((sum, deal) => sum + Number.parseFloat(deal.value), 0)

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex h-full min-h-[50vh] flex-col rounded-lg border bg-card text-card-foreground shadow",
        isOver && "ring-2 ring-primary ring-offset-2",
      )}
    >
      <div className="flex flex-col space-y-1.5 p-4">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${color}`} />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{deals.length} deals</p>
          <p className="text-sm font-medium">${totalValue.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <SortableContext items={deals.map((deal) => deal.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}
