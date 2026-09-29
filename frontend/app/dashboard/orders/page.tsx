'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { apiClient } from '@/lib/api';
import { formatINR, formatDate } from '@/lib/utils';
import {
  Package,
  Search,
  Filter,
  Plus,
  Navigation,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  channel: string;
  orderDate: string;
  fulfillmentCenter: string;
  items: OrderItem[];
  totalItems: number;
  totalAmount: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  shippingStatus: string;
  courier: string;
  awbNumber: string;
  deliveryCity: string;
  pincode: string;
  expectedDeliveryDate: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Create Order Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    channel: 'D2C',
    fulfillmentCenter: 'WareIQ Delhi NCR Fulfillment Hub',
    itemName: 'Vitamin C Brightening Serum (30ml)',
    itemSku: 'WIQ-BEA-001',
    quantity: 1,
    unitPrice: 799,
    paymentStatus: 'Paid',
    courier: 'Delhivery',
    deliveryCity: '',
    pincode: '',
    expectedDeliveryDays: 2,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: '10',
      });
      if (search) queryParams.append('search', search);
      if (statusFilter !== 'All') queryParams.append('status', statusFilter);
      if (channelFilter !== 'All') queryParams.append('channel', channelFilter);

      const res = await apiClient<Order[]>(`/orders?${queryParams.toString()}`);
      setOrders(res.data);
      if (res.meta) {
        setTotalPages(res.meta.totalPages || 1);
        setTotalCount(res.meta.total || res.data.length);
      }
    } catch (e) {
      console.info('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, channelFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchOrders();
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      await apiClient('/orders', {
        method: 'POST',
        body: JSON.stringify({
          customerName: formData.customerName,
          channel: formData.channel,
          fulfillmentCenter: formData.fulfillmentCenter,
          items: [
            {
              sku: formData.itemSku,
              name: formData.itemName,
              quantity: Number(formData.quantity),
              unitPrice: Number(formData.unitPrice),
            },
          ],
          paymentStatus: formData.paymentStatus,
          courier: formData.courier,
          deliveryCity: formData.deliveryCity,
          pincode: formData.pincode,
          expectedDeliveryDays: Number(formData.expectedDeliveryDays),
        }),
      });
      setIsCreateOpen(false);
      fetchOrders();
    } catch (e: any) {
      alert(e.message || 'Failed to create order');
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <DashboardLayout moduleName="Orders & Consignments">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Orders Management</h2>
            <p className="text-xs text-slate-500">
              {totalCount} total orders processed across omnichannel channels
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchOrders}
              className="text-slate-600 gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>
            <Button size="sm" onClick={() => setIsCreateOpen(true)} className="gap-1.5">
              <Plus className="w-4 h-4" /> Create Demo Order
            </Button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <Card className="p-4 border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <form onSubmit={handleSearchSubmit} className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Order ID, AWB, customer, or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 bg-slate-50 focus:bg-white"
              />
            </form>

            <div className="md:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-700"
              >
                <option value="All">All Statuses</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="NDR">NDR (Non-Delivery)</option>
                <option value="Picked">Picked & Packed</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={channelFilter}
                onChange={(e) => {
                  setChannelFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-700"
              >
                <option value="All">All Channels</option>
                <option value="D2C">D2C Store</option>
                <option value="Marketplace">Marketplace (Amazon/Flipkart)</option>
                <option value="Quick Commerce">Quick Commerce (Blinkit)</option>
                <option value="B2B">B2B Modern Trade</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">Order ID & Date</th>
                  <th className="p-3.5">Customer & Destination</th>
                  <th className="p-3.5">Channel</th>
                  <th className="p-3.5">Fulfillment Node</th>
                  <th className="p-3.5">Carrier / AWB</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5 pr-5 text-right">Track</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={8} className="p-4">
                        <Skeleton className="h-6 w-full" />
                      </td>
                    </tr>
                  ))
                ) : orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-bold font-mono text-slate-900">{order.orderId}</div>
                        <div className="text-[10px] text-slate-400">{formatDate(order.orderDate)}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-900 font-semibold">{order.customerName}</div>
                        <div className="text-[10px] text-slate-500">
                          {order.deliveryCity} ({order.pincode})
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-700">
                          {order.channel}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="text-[11px] text-slate-700 max-w-[140px] truncate">
                          {order.fulfillmentCenter}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-blue-600">{order.courier}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{order.awbNumber}</div>
                      </td>
                      <td className="p-3.5">
                        <Badge status={order.shippingStatus || order.fulfillmentStatus}>
                          {order.shippingStatus || order.fulfillmentStatus}
                        </Badge>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {formatINR(order.totalAmount)}
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <Link href={`/track?awb=${order.awbNumber}`}>
                          <button className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer">
                            <Navigation className="w-3.5 h-3.5" />
                            Track
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400 text-xs">
                      No orders found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <div>
              Page <span className="font-bold text-slate-900">{page}</span> of{' '}
              <span className="font-bold text-slate-900">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* CREATE DEMO ORDER MODAL */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Demo Consignment & Order"
        description="Inject a realistic demonstration order with automated AWB generation and carrier dispatch."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Recipient / Customer Name *"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="e.g. Pooja Bhatt"
            />
            <Select
              label="Commerce Channel *"
              value={formData.channel}
              onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
            >
              <option value="D2C">D2C Store</option>
              <option value="Marketplace">Marketplace (Amazon/Flipkart)</option>
              <option value="Quick Commerce">Quick Commerce Dark Store</option>
              <option value="B2B">B2B Modern Trade</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Fulfillment Center Hub *"
              value={formData.fulfillmentCenter}
              onChange={(e) => setFormData({ ...formData, fulfillmentCenter: e.target.value })}
            >
              <option value="WareIQ Delhi NCR Fulfillment Hub">WareIQ Delhi NCR Hub (Gurugram)</option>
              <option value="WareIQ Mumbai Mega Gateway">WareIQ Mumbai Mega Gateway (Bhiwandi)</option>
              <option value="WareIQ Bengaluru Tech Logistics Center">WareIQ Bengaluru Hub (Hosakote)</option>
              <option value="WareIQ Hyderabad Regional FC">WareIQ Hyderabad Regional FC</option>
              <option value="WareIQ Kolkata Gateway Hub">WareIQ Kolkata Hub (Dankuni)</option>
            </Select>

            <Select
              label="Allocated Courier Carrier *"
              value={formData.courier}
              onChange={(e) => setFormData({ ...formData, courier: e.target.value })}
            >
              <option value="Delhivery">Delhivery</option>
              <option value="BlueDart">BlueDart</option>
              <option value="Xpressbees">Xpressbees</option>
              <option value="Shadowfax">Shadowfax</option>
              <option value="DTDC">DTDC</option>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Input
                label="Product / Item Name *"
                required
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              />
            </div>
            <Input
              label="SKU Code *"
              required
              value={formData.itemSku}
              onChange={(e) => setFormData({ ...formData, itemSku: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Quantity *"
              type="number"
              min={1}
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            />
            <Input
              label="Unit Price (₹) *"
              type="number"
              min={0}
              required
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
            />
            <Select
              label="Payment Status"
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
            >
              <option value="Paid">Prepaid</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Delivery City *"
              required
              placeholder="e.g. Pune"
              value={formData.deliveryCity}
              onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
            />
            <Input
              label="Pincode *"
              required
              placeholder="e.g. 411001"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={createLoading}>
              Dispatch Consignment
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
