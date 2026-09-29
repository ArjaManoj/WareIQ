'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { apiClient } from '@/lib/api';
import {
  Boxes,
  Search,
  Plus,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Building2,
  Tag,
  History,
} from 'lucide-react';

interface Product {
  _id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  reorderLevel: number;
  fulfillmentCenter: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface InventorySummary {
  totalSKUs: number;
  lowStockCount: number;
  outOfStockCount: number;
  healthyCount: number;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState<InventorySummary>({
    totalSKUs: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    healthyCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Stock Adjustment Modal State
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustData, setAdjustData] = useState({
    type: 'INBOUND',
    quantity: 10,
    reason: 'Stock replenishment inwarding',
  });
  const [adjustLoading, setAdjustLoading] = useState(false);

  // Add SKU Modal
  const [isAddSkuOpen, setIsAddSkuOpen] = useState(false);
  const [skuFormData, setSkuFormData] = useState({
    sku: '',
    name: '',
    category: 'Beauty & Personal Care',
    brand: 'GlowAura D2C',
    quantity: 100,
    reorderLevel: 20,
    fulfillmentCenter: 'WareIQ Delhi NCR Fulfillment Hub',
  });

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: '1',
        limit: '50',
      });
      if (search) queryParams.append('search', search);
      if (statusFilter !== 'All') queryParams.append('status', statusFilter);
      if (categoryFilter !== 'All') queryParams.append('category', categoryFilter);

      const res = await apiClient<{ products: Product[]; summary: InventorySummary }>(
        `/inventory?${queryParams.toString()}`
      );
      setProducts(res.data.products);
      if (res.data.summary) {
        setSummary(res.data.summary);
      }
    } catch (e) {
      console.info('Error fetching inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [statusFilter, categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInventory();
  };

  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    try {
      setAdjustLoading(true);
      await apiClient('/inventory/adjust', {
        method: 'POST',
        body: JSON.stringify({
          sku: selectedProduct.sku,
          fulfillmentCenter: selectedProduct.fulfillmentCenter,
          type: adjustData.type,
          quantity: Number(adjustData.quantity),
          reason: adjustData.reason,
        }),
      });
      setIsAdjustOpen(false);
      fetchInventory();
    } catch (err: any) {
      alert(err.message || 'Failed to adjust stock');
    } finally {
      setAdjustLoading(false);
    }
  };

  const handleCreateSku = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAdjustLoading(true);
      await apiClient('/inventory', {
        method: 'POST',
        body: JSON.stringify(skuFormData),
      });
      setIsAddSkuOpen(false);
      fetchInventory();
    } catch (err: any) {
      alert(err.message || 'Failed to create SKU');
    } finally {
      setAdjustLoading(false);
    }
  };

  return (
    <DashboardLayout moduleName="Inventory & SKU Catalog">
      <div className="space-y-6">
        {/* Header & Quick Stock Status Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Active SKUs
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">{summary.totalSKUs}</div>
            <div className="text-[10px] text-slate-400 mt-1">Multi-hub catalog</div>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
              Healthy Stock
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{summary.healthyCount}</div>
            <div className="text-[10px] text-emerald-600 mt-1">Above reorder threshold</div>
          </Card>

          <Card className="p-4 border-amber-200 bg-amber-50/40">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
              Low Stock Alert
            </span>
            <div className="text-2xl font-black text-amber-800 mt-1">{summary.lowStockCount}</div>
            <div className="text-[10px] text-amber-600 mt-1">Reorder needed</div>
          </Card>

          <Card className="p-4 border-rose-200 bg-rose-50/40">
            <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
              Stockout Warning
            </span>
            <div className="text-2xl font-black text-rose-800 mt-1">{summary.outOfStockCount}</div>
            <div className="text-[10px] text-rose-600 mt-1">0 available units</div>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">SKU Inventory List</h2>
            <p className="text-xs text-slate-500">
              Live stock levels with available vs reserved inventory distribution
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchInventory}
              className="text-slate-600 gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>
            <Button size="sm" onClick={() => setIsAddSkuOpen(true)} className="gap-1.5">
              <Plus className="w-4 h-4" /> Add New SKU
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4 border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <form onSubmit={handleSearchSubmit} className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search SKU code, product name, or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 bg-slate-50 focus:bg-white"
              />
            </form>

            <div className="md:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-700"
              >
                <option value="All">All Stock Statuses</option>
                <option value="In Stock">In Stock (Healthy)</option>
                <option value="Low Stock">Low Stock Alert</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-700"
              >
                <option value="All">All Categories</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Consumer Electronics">Consumer Electronics</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Home & Living">Home & Living</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Inventory Table */}
        <Card className="border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">SKU / Item Details</th>
                  <th className="p-3.5">Category & Brand</th>
                  <th className="p-3.5">Fulfillment Node</th>
                  <th className="p-3.5 text-center">Total Stock</th>
                  <th className="p-3.5 text-center">Reserved</th>
                  <th className="p-3.5 text-center">Available</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5 text-right">Adjustment</th>
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
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-bold text-slate-900">{product.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{product.sku}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-800 font-semibold">{product.brand}</div>
                        <div className="text-[10px] text-slate-400">{product.category}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-[11px] text-slate-700 max-w-[140px] truncate">
                          {product.fulfillmentCenter}
                        </div>
                      </td>
                      <td className="p-3.5 text-center font-bold text-slate-900">
                        {product.quantity}
                      </td>
                      <td className="p-3.5 text-center text-amber-700 font-semibold">
                        {product.reservedQuantity}
                      </td>
                      <td className="p-3.5 text-center font-bold text-blue-600">
                        {product.availableQuantity}
                      </td>
                      <td className="p-3.5">
                        <Badge status={product.status}>{product.status}</Badge>
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsAdjustOpen(true);
                          }}
                          className="text-[11px] py-1 px-2.5"
                        >
                          <ArrowUpDown className="w-3 h-3 mr-1 text-blue-600" />
                          Adjust Stock
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400 text-xs">
                      No inventory items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* STOCK ADJUSTMENT MODAL */}
      <Modal
        isOpen={isAdjustOpen}
        onClose={() => setIsAdjustOpen(false)}
        title="Adjust Inventory Stock"
        description={`Record stock intake, transfer, return or cycle count adjustment for SKU: ${selectedProduct?.sku}`}
        maxWidth="md"
      >
        <form onSubmit={handleAdjustStock} className="space-y-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900">{selectedProduct?.name}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Node: {selectedProduct?.fulfillmentCenter} • Current Physical Qty:{' '}
              <strong className="text-slate-900">{selectedProduct?.quantity}</strong>
            </div>
          </div>

          <Select
            label="Adjustment Type *"
            value={adjustData.type}
            onChange={(e) => setAdjustData({ ...adjustData, type: e.target.value })}
          >
            <option value="INBOUND">INBOUND (New stock arrival / Purchase Order)</option>
            <option value="OUTBOUND">OUTBOUND (Manual stock reduction / write-off)</option>
            <option value="RETURN">RETURN (Customer return restocking)</option>
            <option value="ADJUSTMENT">ADJUSTMENT (Audit count discrepancy)</option>
            <option value="TRANSFER">TRANSFER (Inter-hub transfer staging)</option>
          </Select>

          <Input
            label="Adjustment Quantity *"
            type="number"
            min={1}
            required
            value={adjustData.quantity}
            onChange={(e) => setAdjustData({ ...adjustData, quantity: Number(e.target.value) })}
          />

          <Input
            label="Reason / Audit Reference *"
            required
            placeholder="e.g. Inbound PO #4092 or physical audit recount"
            value={adjustData.reason}
            onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value })}
          />

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAdjustOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={adjustLoading}>
              Save Adjustment & Log Audit
            </Button>
          </div>
        </form>
      </Modal>

      {/* ADD NEW SKU MODAL */}
      <Modal
        isOpen={isAddSkuOpen}
        onClose={() => setIsAddSkuOpen(false)}
        title="Add New SKU to Catalog"
        description="Register a new product SKU into WareIQ Smart Inventory Placement."
        maxWidth="md"
      >
        <form onSubmit={handleCreateSku} className="space-y-4 text-xs">
          <Input
            label="SKU Code *"
            required
            placeholder="e.g. WIQ-LIP-501"
            value={skuFormData.sku}
            onChange={(e) => setSkuFormData({ ...skuFormData, sku: e.target.value })}
          />
          <Input
            label="Product Name *"
            required
            placeholder="e.g. Velvet Matte Lip Tint (Berry - 5ml)"
            value={skuFormData.name}
            onChange={(e) => setSkuFormData({ ...skuFormData, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category *"
              value={skuFormData.category}
              onChange={(e) => setSkuFormData({ ...skuFormData, category: e.target.value })}
            >
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Consumer Electronics">Consumer Electronics</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Home & Living">Home & Living</option>
            </Select>

            <Input
              label="Brand *"
              required
              value={skuFormData.brand}
              onChange={(e) => setSkuFormData({ ...skuFormData, brand: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Initial Inward Quantity"
              type="number"
              min={0}
              value={skuFormData.quantity}
              onChange={(e) =>
                setSkuFormData({ ...skuFormData, quantity: Number(e.target.value) })
              }
            />
            <Input
              label="Reorder Alert Level"
              type="number"
              min={0}
              value={skuFormData.reorderLevel}
              onChange={(e) =>
                setSkuFormData({ ...skuFormData, reorderLevel: Number(e.target.value) })
              }
            />
          </div>

          <Select
            label="Primary Fulfillment Center Hub *"
            value={skuFormData.fulfillmentCenter}
            onChange={(e) => setSkuFormData({ ...skuFormData, fulfillmentCenter: e.target.value })}
          >
            <option value="WareIQ Delhi NCR Fulfillment Hub">WareIQ Delhi NCR Hub (Gurugram)</option>
            <option value="WareIQ Mumbai Mega Gateway">WareIQ Mumbai Mega Gateway (Bhiwandi)</option>
            <option value="WareIQ Bengaluru Tech Logistics Center">WareIQ Bengaluru Hub (Hosakote)</option>
            <option value="WareIQ Hyderabad Regional FC">WareIQ Hyderabad Regional FC</option>
            <option value="WareIQ Kolkata Gateway Hub">WareIQ Kolkata Hub (Dankuni)</option>
          </Select>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddSkuOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={adjustLoading}>
              Add SKU to Catalog
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
