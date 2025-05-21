import type { Metadata } from "next"
import { ContactDetail } from "@/components/contacts/contact-detail"

export const metadata: Metadata = {
  title: "Contact Details | ClientFlow CRM",
  description: "View contact details in ClientFlow CRM",
}

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <ContactDetail id={params.id} />
    </div>
  )
}
