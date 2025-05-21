"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCRM } from "@/context/crm-context"
import { ActivityDialog } from "./activity-dialog"

export function ActivitiesHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const { setActivitiesFilter } = useCRM()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setActivitiesFilter(query)
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search activities..."
            className="w-full pl-8 sm:w-[300px]"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Log Activity
        </Button>
      </div>

      <ActivityDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  )
}
