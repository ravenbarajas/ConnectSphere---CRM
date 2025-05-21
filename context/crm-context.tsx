"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Contact, Lead, Deal, Activity } from "@/types"
import { mockContacts, mockLeads, mockDeals, mockActivities } from "@/data/mock-data"

interface CRMContextType {
  // Contacts
  contacts: Contact[]
  filteredContacts: Contact[]
  setContactsFilter: (query: string) => void
  addContact: (contact: Contact) => void
  updateContact: (contact: Contact) => void
  deleteContact: (id: string) => void

  // Leads
  leads: Lead[]
  filteredLeads: Lead[]
  setLeadsFilter: (query: string) => void
  addLead: (lead: Lead) => void
  updateLead: (lead: Lead) => void
  deleteLead: (id: string) => void

  // Deals
  deals: Deal[]
  filteredDeals: Deal[]
  setDealsFilter: (query: string) => void
  addDeal: (deal: Deal) => void
  updateDeal: (deal: Deal) => void
  deleteDeal: (id: string) => void

  // Activities
  activities: Activity[]
  filteredActivities: Activity[]
  setActivitiesFilter: (query: string) => void
  addActivity: (activity: Activity) => void
  updateActivity: (activity: Activity) => void
  deleteActivity: (id: string) => void
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

export function CRMProvider({ children }: { children: React.ReactNode }) {
  // State for data
  const [contacts, setContacts] = useState<Contact[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  // State for filters
  const [contactsFilter, setContactsFilter] = useState("")
  const [leadsFilter, setLeadsFilter] = useState("")
  const [dealsFilter, setDealsFilter] = useState("")
  const [activitiesFilter, setActivitiesFilter] = useState("")

  // Filtered data
  const filteredContacts = contactsFilter
    ? contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(contactsFilter.toLowerCase()) ||
          contact.company.toLowerCase().includes(contactsFilter.toLowerCase()) ||
          contact.email.toLowerCase().includes(contactsFilter.toLowerCase()),
      )
    : []

  const filteredLeads = leadsFilter
    ? leads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(leadsFilter.toLowerCase()) ||
          lead.company.toLowerCase().includes(leadsFilter.toLowerCase()),
      )
    : []

  const filteredDeals = dealsFilter
    ? deals.filter(
        (deal) =>
          deal.name.toLowerCase().includes(dealsFilter.toLowerCase()) ||
          deal.company.toLowerCase().includes(dealsFilter.toLowerCase()),
      )
    : []

  const filteredActivities = activitiesFilter
    ? activities.filter(
        (activity) =>
          activity.notes.toLowerCase().includes(activitiesFilter.toLowerCase()) ||
          activity.type.toLowerCase().includes(activitiesFilter.toLowerCase()),
      )
    : []

  // Load data from localStorage or use mock data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedContacts = localStorage.getItem("crm-contacts")
      const storedLeads = localStorage.getItem("crm-leads")
      const storedDeals = localStorage.getItem("crm-deals")
      const storedActivities = localStorage.getItem("crm-activities")

      setContacts(storedContacts ? JSON.parse(storedContacts) : mockContacts)
      setLeads(storedLeads ? JSON.parse(storedLeads) : mockLeads)
      setDeals(storedDeals ? JSON.parse(storedDeals) : mockDeals)
      setActivities(storedActivities ? JSON.parse(storedActivities) : mockActivities)
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && contacts.length > 0) {
      localStorage.setItem("crm-contacts", JSON.stringify(contacts))
    }
  }, [contacts])

  useEffect(() => {
    if (typeof window !== "undefined" && leads.length > 0) {
      localStorage.setItem("crm-leads", JSON.stringify(leads))
    }
  }, [leads])

  useEffect(() => {
    if (typeof window !== "undefined" && deals.length > 0) {
      localStorage.setItem("crm-deals", JSON.stringify(deals))
    }
  }, [deals])

  useEffect(() => {
    if (typeof window !== "undefined" && activities.length > 0) {
      localStorage.setItem("crm-activities", JSON.stringify(activities))
    }
  }, [activities])

  // Contact CRUD operations
  const addContact = (contact: Contact) => {
    setContacts((prev) => [...prev, contact])
  }

  const updateContact = (updatedContact: Contact) => {
    setContacts((prev) => prev.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))
  }

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))

    // Also delete related leads, deals, and activities
    setLeads((prev) => prev.filter((lead) => lead.contactId !== id))
    setDeals((prev) => prev.filter((deal) => deal.contactId !== id))
    setActivities((prev) => prev.filter((activity) => activity.contactId !== id))
  }

  // Lead CRUD operations
  const addLead = (lead: Lead) => {
    setLeads((prev) => [...prev, lead])
  }

  const updateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)))
  }

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id))
  }

  // Deal CRUD operations
  const addDeal = (deal: Deal) => {
    setDeals((prev) => [...prev, deal])
  }

  const updateDeal = (updatedDeal: Deal) => {
    setDeals((prev) => prev.map((deal) => (deal.id === updatedDeal.id ? updatedDeal : deal)))
  }

  const deleteDeal = (id: string) => {
    setDeals((prev) => prev.filter((deal) => deal.id !== id))

    // Also delete related activities
    setActivities((prev) => prev.filter((activity) => activity.dealId !== id))
  }

  // Activity CRUD operations
  const addActivity = (activity: Activity) => {
    setActivities((prev) => [...prev, activity])
  }

  const updateActivity = (updatedActivity: Activity) => {
    setActivities((prev) => prev.map((activity) => (activity.id === updatedActivity.id ? updatedActivity : activity)))
  }

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id))
  }

  return (
    <CRMContext.Provider
      value={{
        // Contacts
        contacts,
        filteredContacts,
        setContactsFilter,
        addContact,
        updateContact,
        deleteContact,

        // Leads
        leads,
        filteredLeads,
        setLeadsFilter,
        addLead,
        updateLead,
        deleteLead,

        // Deals
        deals,
        filteredDeals,
        setDealsFilter,
        addDeal,
        updateDeal,
        deleteDeal,

        // Activities
        activities,
        filteredActivities,
        setActivitiesFilter,
        addActivity,
        updateActivity,
        deleteActivity,
      }}
    >
      {children}
    </CRMContext.Provider>
  )
}

export function useCRM() {
  const context = useContext(CRMContext)
  if (context === undefined) {
    throw new Error("useCRM must be used within a CRMProvider")
  }
  return context
}
