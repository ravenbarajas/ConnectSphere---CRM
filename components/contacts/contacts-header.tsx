"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCRM } from "@/context/crm-context"

export function ContactsHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const { setContactsFilter } = useCRM()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setContactsFilter(query)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search contacts..."
          className="w-full pl-8 sm:w-[300px]"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <Button asChild>
        <Link href="/contacts/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Link>
      </Button>
    </div>
  )
}
