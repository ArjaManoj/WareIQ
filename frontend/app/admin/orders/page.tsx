'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { apiClient } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import {
  PackagePlus,
  Navigation,
  Sparkles,
  RefreshCw,
  PlusCircle,
  Clock,
  MapPin,
} from 'lucide-react';

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  channel: string;
  courier: string;
  awbNumber: string;
  deliveryCity: string;
  shippingStatus: string;
  fulfillmentStatus: string;
  expectedDeliveryDate: string;
}

export default function AdminOrdersSimulatorPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    status: 'In Transit',
    location: 'Regional Hub Gateway',
    description: 'Shipment departed transit facility towards delivery hub',
  });
  const [eventLoading, setEventLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await apiClient<Order[]>('/orders?limit=50');
      setOrders(res.data);
    } catch (e) {
      console.info('Error fetching orders for simulator');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenEventModal = (order: Order) => {
    setSelectedOrder(order);
    setEventData({
      status: 'Out for Delivery',
      location: `${order.deliveryCity} Delivery Hub`,
      description: 'Shipment assigned to courier rider. OTP verification enabled.',
    });
    setIsEventModalOpen(true);
  };

  const handlePostEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    try {
      setEventLoading(true);
      await apiClient(`/shipments/${selectedOrder.awbNumber}/events`, {
        method: 'POST',
        body: JSON.stringify(eventData),
      });
      setIsEventModalOpen(false);
      fetchOrders();
    } catch (e: any) {
      alert(e.message || 'Failed to dispatch shipment event');
    } finally {
      setEventLoading(false);
    }
  };

  return (
    <AdminLayout moduleName="Carrier Shipment Event Simulator">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Live Carrier Timeline & Event Injector</h2>
            <p className="text-xs text-slate-400">
              Simulate real-time carrier scans (Dispatched, In Transit, NDR, Delivered) across active AWBs
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchOrders}
            className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Orders
          </Button>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <Card key={order._id} className="bg-slate-950 border-slate-800 text-slate-100 p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold font-mono text-amber-400">
                    {order.awbNumber}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">{order.orderId}</h3>
                  <div className="text-xs text-slate-400">{order.customerName} • {order.deliveryCity}</div>
                </div>
                <Badge status={order.shippingStatus}>{order.shippingStatus}</Badge>
              </div>

              <div className="text-xs text-slate-400 border-t border-slate-800/80 pt-3 space-y-1">
                <div>
                  Carrier: <strong className="text-white">{order.courier}</strong>
                </div>
                <div>
                  Channel: <span className="text-blue-400">{order.channel}</span>
                </div>
                <div>
                  ETA: <span className="text-slate-300">{formatDate(order.expectedDeliveryDate)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <Link href={`/track?awb=${order.awbNumber}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-900 border-slate-700 text-slate-300 text-xs py-1 px-2.5"
                  >
                    <Navigation className="w-3 h-3 mr-1" /> View Tracking
                  </Button>
                </Link>

                <Button
                  size="sm"
                  onClick={() => handleOpenEventModal(order)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-1 px-2.5"
                >
                  <PlusCircle className="w-3.5 h-3.5 mr-1" /> Inject Event
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* EVENT INJECTION MODAL */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title="Inject Live Carrier Scan Event"
        description={`AWB: ${selectedOrder?.awbNumber} (${selectedOrder?.courier})`}
        maxWidth="md"
      >
        <form onSubmit={handlePostEvent} className="space-y-4 text-xs">
          <Select
            label="Shipment Event Milestone *"
            value={eventData.status}
            onChange={(e) => setEventData({ ...eventData, status: e.target.value })}
          >
            <option value="In Transit">In Transit (Linehaul Hub)</option>
            <option value="Out for Delivery">Out for Delivery (Rider Assigned)</option>
            <option value="Delivered">Delivered (Successful Doorstep Delivery)</option>
            <option value="NDR">NDR (Delivery Attempt Failed - Customer Unavailable)</option>
            <option value="RTO">RTO (Returned to Origin Fulfillment Center)</option>
          </Select>

          <Input
            label="Scan Checkpoint Location *"
            required
            value={eventData.location}
            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Checkpoint Description *
            </label>
            <textarea
              rows={3}
              required
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEventModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={eventLoading}>
              Broadcast Event
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
