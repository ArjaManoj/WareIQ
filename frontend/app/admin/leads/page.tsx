'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { apiClient } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import {
  Inbox,
  Search,
  Filter,
  RefreshCw,
  Edit,
  Phone,
  Mail,
  Building2,
  CheckCircle2,
  Calendar,
  FileText,
} from 'lucide-react';

interface Lead {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  operatingLocation: string;
  enquiryType: string;
  challenges?: string;
  monthlyOrders?: string;
  warehouseCount?: string;
  businessLocation?: string;
  requirements?: string;
  source?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Converted' | 'Closed';
  notes?: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<string>('New');
  const [editNotes, setEditNotes] = useState<string>('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: '1',
        limit: '50',
      });
      if (search) queryParams.append('search', search);
      if (statusFilter !== 'All') queryParams.append('status', statusFilter);

      const res = await apiClient<Lead[]>(`/leads?${queryParams.toString()}`);
      setLeads(res.data);
    } catch (e) {
      console.info('Error fetching leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleOpenEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || '');
    setIsEditOpen(true);
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    try {
      setUpdateLoading(true);
      await apiClient(`/leads/${selectedLead._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: editStatus,
          notes: editNotes,
        }),
      });
      setIsEditOpen(false);
      fetchLeads();
    } catch (e: any) {
      alert(e.message || 'Failed to update lead');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <AdminLayout moduleName="Enterprise Lead CRM Pipeline">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Inbound Demo Requests & CRM Pipeline</h2>
            <p className="text-xs text-slate-400">
              Manage enterprise prospect conversations and fulfillment proposals
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads}
            className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Pipeline
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-slate-950 border-slate-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <form onSubmit={handleSearch} className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lead name, company, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </form>

            <div className="md:col-span-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-700 px-3 py-2 bg-slate-900 text-slate-200"
              >
                <option value="All">All Lead Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Leads Table */}
        <Card className="bg-slate-950 border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">Lead / Company</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Volume & Scale</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Submitted On</th>
                  <th className="p-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={7} className="p-4">
                        <Skeleton className="h-6 w-full bg-slate-800" />
                      </td>
                    </tr>
                  ))
                ) : leads.length > 0 ? (
                  leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-bold text-white">
                          {lead.firstName} {lead.lastName}
                        </div>
                        <div className="text-[11px] text-amber-400 font-semibold">
                          {lead.companyName}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-200">{lead.email}</div>
                        <div className="text-[10px] text-slate-400">{lead.phone}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300">
                          {lead.enquiryType}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-200">{lead.monthlyOrders || '-'}</div>
                        <div className="text-[10px] text-slate-400">
                          {lead.businessLocation || lead.operatingLocation}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <Badge status={lead.status}>{lead.status}</Badge>
                      </td>
                      <td className="p-3.5 text-slate-400 text-[11px]">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(lead)}
                          className="bg-slate-900 text-amber-300 border-slate-700 hover:bg-slate-800 text-[11px] py-1 px-2.5"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Update CRM
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                      No CRM leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* LEAD DETAILS & UPDATE CRM MODAL */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="CRM Lead Dossier & Stage Progression"
        description={`Prospect: ${selectedLead?.firstName} ${selectedLead?.lastName} (${selectedLead?.companyName})`}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveLead} className="space-y-4 text-xs">
          {/* Prospect Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Email</span>
                <span className="text-slate-900 font-semibold">{selectedLead?.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Phone</span>
                <span className="text-slate-900 font-semibold">{selectedLead?.phone}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Monthly Order Volume
                </span>
                <span className="text-slate-900">{selectedLead?.monthlyOrders}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Enquiry Category
                </span>
                <span className="text-slate-900">{selectedLead?.enquiryType}</span>
              </div>
            </div>

            {selectedLead?.challenges && (
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Declared Business Challenges
                </span>
                <p className="text-slate-800 text-[11px] mt-0.5">{selectedLead.challenges}</p>
              </div>
            )}
          </div>

          {/* Status Progression Select */}
          <Select
            label="CRM Pipeline Status *"
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          >
            <option value="New">New (Inbound lead received)</option>
            <option value="Contacted">Contacted (Initial callback made)</option>
            <option value="Qualified">Qualified (Fulfillment criteria matched)</option>
            <option value="Proposal">Proposal (Custom commercial proposal shared)</option>
            <option value="Converted">Converted (Signed SLA merchant agreement)</option>
            <option value="Closed">Closed (Not a current fit / archived)</option>
          </Select>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Internal Operations Notes & Action Items
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Discussed 4 PM same-day cutoff for Bhiwandi & Gurugram hubs. Proposal sent."
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={updateLoading}>
              Save CRM Record
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
