import type { Metadata } from "next"
import { ContactForm } from "@/components/contacts/contact-form"

export const metadata: Metadata = {
  title: "Add Contact | ClientFlow CRM",
  description: "Add a new contact to ClientFlow CRM",
}

export default function NewContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Contact</h1>
      <ContactForm />
    </div>
  )
}
