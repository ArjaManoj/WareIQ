'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { apiClient } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Users, Search, RefreshCw, Shield, Check, X } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'operations' | 'customer';
  companyName: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: '1',
        limit: '50',
      });
      if (search) queryParams.append('search', search);
      if (roleFilter !== 'All') queryParams.append('role', roleFilter);

      const res = await apiClient<User[]>(`/users?${queryParams.toString()}`);
      setUsers(res.data);
    } catch (e) {
      console.info('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleToggleStatus = async (user: User) => {
    try {
      await apiClient(`/users/${user._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      fetchUsers();
    } catch (e: any) {
      alert(e.message || 'Failed to update user status');
    }
  };

  const handleChangeRole = async (user: User, newRole: string) => {
    try {
      await apiClient(`/users/${user._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole }),
      });
      fetchUsers();
    } catch (e: any) {
      alert(e.message || 'Failed to update user role');
    }
  };

  return (
    <AdminLayout moduleName="User Access & Role Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Merchant & Staff User Accounts</h2>
            <p className="text-xs text-slate-400">
              Role-based access control governance across admin, operations, and customer roles
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Users
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-slate-950 border-slate-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user name, email, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-700 px-3 py-2 bg-slate-900 text-slate-200"
              >
                <option value="All">All Roles</option>
                <option value="admin">Admin</option>
                <option value="operations">Operations</option>
                <option value="customer">Customer / Merchant</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="bg-slate-950 border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">User / Contact</th>
                  <th className="p-3.5">Company Name</th>
                  <th className="p-3.5">Access Role</th>
                  <th className="p-3.5">Account Status</th>
                  <th className="p-3.5">Joined Date</th>
                  <th className="p-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={6} className="p-4">
                        <Skeleton className="h-6 w-full bg-slate-800" />
                      </td>
                    </tr>
                  ))
                ) : users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="text-[10px] text-slate-400">{u.email}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-200">{u.companyName || 'WareIQ'}</div>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={u.role}
                          onChange={(e) => handleChangeRole(u, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-[11px] font-semibold text-amber-300 rounded px-2 py-1"
                        >
                          <option value="admin">👑 Admin</option>
                          <option value="operations">⚡ Operations</option>
                          <option value="customer">🛍️ Customer</option>
                        </select>
                      </td>
                      <td className="p-3.5">
                        {u.isActive ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                            <X className="w-3 h-3" /> Deactivated
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-400 text-[11px]">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(u)}
                          className={`text-[11px] py-1 px-2.5 border-slate-700 ${
                            u.isActive
                              ? 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/60'
                              : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
                          }`}
                        >
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 text-xs">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
