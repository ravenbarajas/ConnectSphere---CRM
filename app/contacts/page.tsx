import type { Metadata } from "next"
import { ContactsTable } from "@/components/contacts/contacts-table"
import { ContactsHeader } from "@/components/contacts/contacts-header"

export const metadata: Metadata = {
  title: "Contacts | ClientFlow CRM",
  description: "Manage your contacts in ClientFlow CRM",
}

export default function ContactsPage() {
  return (
    <div className="flex flex-col gap-4">
      <ContactsHeader />
      <ContactsTable />
    </div>
  )
}
