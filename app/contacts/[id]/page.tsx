import type { Metadata } from "next"
import { ContactDetail } from "@/components/contacts/contact-detail"

export const metadata: Metadata = {
  title: "Contact Details | ConnectSphere CRM",
  description: "View contact details in ConnectSphere CRM",
}

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <ContactDetail id={params.id} />
    </div>
  )
}
