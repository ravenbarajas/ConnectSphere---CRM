// Contact type
export interface Contact {
  id: string
  name: string
  company: string
  email: string
  phone: string
  notes?: string
  createdAt: string
}

// Lead type
export interface Lead {
  id: string
  name: string
  company: string
  status: string
  contactId?: string
  notes?: string
  createdAt: string
}

// Deal type
export interface Deal {
  id: string
  name: string
  company: string
  value: string
  stage: string
  contactId?: string
  notes?: string
  createdAt: string
}

// Activity type
export interface Activity {
  id: string
  type: string
  notes: string
  contactId?: string
  dealId?: string
  createdAt: string
}
