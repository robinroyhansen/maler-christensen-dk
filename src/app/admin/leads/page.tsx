"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { 
  Mail, Phone, Calendar, Trash2, Eye, CheckCircle, 
  Clock, MessageSquare, Filter, Search, ChevronDown,
  User
} from "lucide-react"

type LeadStatus = "new" | "contacted" | "done"

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  page_slug: string | null
  is_read: boolean
  status: LeadStatus
  created_at: string
}

const STATUS_CONFIG = {
  new: {
    label: "Ny",
    color: "bg-green-100 text-green-700",
    icon: Clock,
  },
  contacted: {
    label: "Kontaktet",
    color: "bg-blue-100 text-blue-700",
    icon: Phone,
  },
  done: {
    label: "Afsluttet",
    color: "bg-gray-100 text-gray-700",
    icon: CheckCircle,
  },
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  const supabase = createClient()

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) {
      // Handle case where status column might not exist yet
      const leadsWithStatus = data.map((lead: any) => ({
        ...lead,
        status: lead.status || "new",
      }))
      setLeads(leadsWithStatus)
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: LeadStatus) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status, is_read: true })
      .eq("id", id)

    if (!error) {
      setLeads(leads.map(l => 
        l.id === id ? { ...l, status, is_read: true } : l
      ))
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status, is_read: true })
      }
    }
  }

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: true })
      .eq("id", id)

    if (!error) {
      setLeads(leads.map(l => 
        l.id === id ? { ...l, is_read: true } : l
      ))
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne henvendelse?")) return

    await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id)

    setLeads(leads.filter(l => l.id !== id))
    if (selectedLead?.id === id) setSelectedLead(null)
  }

  const viewLead = (lead: Lead) => {
    setSelectedLead(lead)
    if (!lead.is_read) {
      markAsRead(lead.id)
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchQuery))
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "new").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    done: leads.filter(l => l.status === "done").length,
    unread: leads.filter(l => !l.is_read).length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Henvendelser</h1>
        <p className="text-gray-600">Administrer leads fra kontaktformularen</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-green-600">{stats.new}</p>
          <p className="text-sm text-green-600">Nye</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
          <p className="text-sm text-blue-600">Kontaktet</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-600">{stats.done}</p>
          <p className="text-sm text-gray-600">Afsluttet</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
          <p className="text-sm text-red-600">Ulæste</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Søg efter navn, email eller telefon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b9834]"
              >
                <option value="all">Alle status</option>
                <option value="new">Nye</option>
                <option value="contacted">Kontaktet</option>
                <option value="done">Afsluttet</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b9834] mx-auto"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Ingen henvendelser fundet</p>
            </div>
          ) : (
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredLeads.map((lead) => {
                const StatusIcon = STATUS_CONFIG[lead.status].icon
                
                return (
                  <div
                    key={lead.id}
                    onClick={() => viewLead(lead)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedLead?.id === lead.id ? "bg-[#6b9834]/5" : ""
                    } ${!lead.is_read ? "bg-green-50/50" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium ${!lead.is_read ? "text-gray-900" : "text-gray-700"}`}>
                          {lead.name}
                        </p>
                        {!lead.is_read && (
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${STATUS_CONFIG[lead.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {STATUS_CONFIG[lead.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                    <p className="text-sm text-gray-400 truncate mt-1">{lead.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(lead.created_at).toLocaleDateString("da-DK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Lead Detail */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">Detaljer</h2>
          </div>
          
          {selectedLead ? (
            <div className="p-6">
              {/* Status Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex gap-2">
                  {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((status) => {
                    const StatusIcon = STATUS_CONFIG[status].icon
                    return (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedLead.id, status)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedLead.status === status
                            ? STATUS_CONFIG[status].color
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {STATUS_CONFIG[status].label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Navn</label>
                    <p className="font-medium text-gray-900">{selectedLead.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                    <p>
                      <a 
                        href={`mailto:${selectedLead.email}`} 
                        className="text-[#6b9834] hover:underline"
                      >
                        {selectedLead.email}
                      </a>
                    </p>
                  </div>
                </div>
                
                {selectedLead.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Telefon</label>
                      <p>
                        <a 
                          href={`tel:${selectedLead.phone}`} 
                          className="text-[#6b9834] hover:underline"
                        >
                          {selectedLead.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Besked</label>
                    <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-3 mt-1">
                      {selectedLead.message}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Modtaget</label>
                    <p className="text-gray-700">
                      {new Date(selectedLead.created_at).toLocaleString("da-DK", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {selectedLead.page_slug && (
                  <div className="text-sm text-gray-500 pt-2 border-t">
                    Fra side: <span className="font-mono">{selectedLead.page_slug}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <a href={`mailto:${selectedLead.email}`} className="flex-1">
                  <Button className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send email
                  </Button>
                </a>
                {selectedLead.phone && (
                  <a href={`tel:${selectedLead.phone}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Ring op
                    </Button>
                  </a>
                )}
                <Button
                  variant="outline"
                  onClick={() => deleteLead(selectedLead.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Vælg en henvendelse for at se detaljer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
