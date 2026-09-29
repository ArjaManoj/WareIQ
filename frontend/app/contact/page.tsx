'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { apiClient } from '@/lib/api';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building,
  Sparkles,
  ShieldCheck,
  Send,
  Loader2,
} from 'lucide-react';

const step1Schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid business email'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  companyName: z.string().min(2, 'Company or brand name is required'),
});

const step2Schema = z.object({
  operatingLocation: z.string().min(2, 'Operating location is required'),
  enquiryType: z.string().min(2, 'Please select an enquiry category'),
  monthlyOrders: z.string().min(1, 'Please select your monthly order volume'),
  warehouseCount: z.string().min(1, 'Please select current warehouse count'),
  businessLocation: z.string().min(2, 'City / Business HQ is required'),
});

const step3Schema = z.object({
  challenges: z.string().min(5, 'Please describe your key fulfillment or shipping challenges'),
  requirements: z.string().optional(),
  source: z.string().optional(),
});

const fullFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FormData = z.infer<typeof fullFormSchema>;

export default function ContactPage() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      operatingLocation: 'India',
      enquiryType: 'D2C Fulfillment',
      monthlyOrders: '1,000 - 5,000 orders/mo',
      warehouseCount: '1 - 2 locations',
      source: 'Website Direct Demo Request',
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'companyName'];
    } else if (step === 2) {
      fieldsToValidate = [
        'operatingLocation',
        'enquiryType',
        'monthlyOrders',
        'warehouseCount',
        'businessLocation',
      ];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await apiClient('/leads', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setApiError(
        err.message || 'Failed to submit enquiry. Please verify your fields and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <Badge variant="blue">Enterprise Consultation</Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Request an Enterprise Demo & Fulfillment Audit
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Connect with a WareIQ logistics specialist to design a customized pan-India inventory placement and same-day delivery strategy for your brand.
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-lg border-slate-200 overflow-hidden">
            {isSubmitted ? (
              <div className="p-8 sm:p-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Your enquiry has been submitted successfully.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  A WareIQ enterprise fulfillment specialist will analyze your order volume and contact you within 2 business hours with a tailored inventory distribution roadmap.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                    Submit Another Enquiry
                  </Button>
                  <Button onClick={() => (window.location.href = '/network')} size="sm">
                    Explore Fulfillment Hubs
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-10">
                {/* Step Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span className={step >= 1 ? 'text-blue-600 font-bold' : ''}>
                      1. Contact Details
                    </span>
                    <span className={step >= 2 ? 'text-blue-600 font-bold' : ''}>
                      2. Scale & Operations
                    </span>
                    <span className={step >= 3 ? 'text-blue-600 font-bold' : ''}>
                      3. Requirements & SLA
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {apiError && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                    {apiError}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-base font-bold text-slate-900">
                        Step 1: Company & Contact Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name *"
                          placeholder="e.g. Vikram"
                          {...register('firstName')}
                          error={errors.firstName?.message}
                        />
                        <Input
                          label="Last Name *"
                          placeholder="e.g. Singhania"
                          {...register('lastName')}
                          error={errors.lastName?.message}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Business Email *"
                          type="email"
                          placeholder="vikram@yourbrand.com"
                          {...register('email')}
                          error={errors.email?.message}
                        />
                        <Input
                          label="Phone Number *"
                          placeholder="9876543210"
                          {...register('phone')}
                          error={errors.phone?.message}
                        />
                      </div>
                      <Input
                        label="Company / Brand Name *"
                        placeholder="e.g. Lumos Cosmetics India"
                        {...register('companyName')}
                        error={errors.companyName?.message}
                      />
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-base font-bold text-slate-900">
                        Step 2: Operating Location & Fulfillment Scale
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Current Business HQ / City *"
                          placeholder="e.g. Mumbai"
                          {...register('businessLocation')}
                          error={errors.businessLocation?.message}
                        />
                        <Select
                          label="Primary Operating Territory *"
                          {...register('operatingLocation')}
                          error={errors.operatingLocation?.message}
                        >
                          <option value="India">Pan-India</option>
                          <option value="North India">North India Focus</option>
                          <option value="West India">West India Focus</option>
                          <option value="South India">South India Focus</option>
                          <option value="East India">East India Focus</option>
                        </Select>
                      </div>

                      <Select
                        label="Primary Solution Category *"
                        {...register('enquiryType')}
                        error={errors.enquiryType?.message}
                      >
                        <option value="D2C Fulfillment">D2C Fulfillment (Same-Day / Next-Day)</option>
                        <option value="Marketplace Fulfillment">
                          Marketplace Fulfillment (Amazon Flex, Flipkart)
                        </option>
                        <option value="Quick Commerce Fulfillment">
                          Quick Commerce Dark Store Replenishment
                        </option>
                        <option value="B2B Fulfillment">B2B & Modern Trade Pallet Logistics</option>
                        <option value="WareIQ Shipping">WareIQ Multi-Courier Shipping Engine</option>
                        <option value="Seller of Record">
                          Seller of Record (SOR) Multi-State Tax Compliance
                        </option>
                      </Select>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                          label="Monthly Order Volume *"
                          {...register('monthlyOrders')}
                          error={errors.monthlyOrders?.message}
                        >
                          <option value="500 - 2,000 orders/mo">500 - 2,000 orders/mo</option>
                          <option value="2,000 - 10,000 orders/mo">2,000 - 10,000 orders/mo</option>
                          <option value="10,000 - 25,000 orders/mo">10,000 - 25,000 orders/mo</option>
                          <option value="25,000+ orders/mo">25,000+ orders/mo (Enterprise)</option>
                        </Select>

                        <Select
                          label="Current Warehouse Setup *"
                          {...register('warehouseCount')}
                          error={errors.warehouseCount?.message}
                        >
                          <option value="Self-fulfilled (1 warehouse)">
                            Self-fulfilled (1 warehouse)
                          </option>
                          <option value="2 - 3 3PL locations">2 - 3 3PL locations</option>
                          <option value="No warehouse yet (Starting up)">
                            No warehouse yet (Starting up)
                          </option>
                          <option value="Looking to expand pan-India">
                            Looking to expand pan-India
                          </option>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-base font-bold text-slate-900">
                        Step 3: Fulfillment Challenges & Custom Requirements
                      </h3>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Current Fulfillment Challenges *
                        </label>
                        <textarea
                          rows={3}
                          placeholder="e.g. High RTO rates (28%), delayed 5-day delivery to tier 2 cities, frequent marketplace stockouts..."
                          className="w-full rounded-lg border border-slate-300 p-3 text-xs focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register('challenges')}
                        />
                        {errors.challenges && (
                          <p className="text-xs text-rose-600 font-medium mt-1">
                            {errors.challenges.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Specific Requirements or Store Integrations (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Need Shopify & Amazon Seller Flex sync with same-day cutoff"
                          className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register('requirements')}
                        />
                      </div>

                      <Select
                        label="How did you hear about WareIQ?"
                        {...register('source')}
                      >
                        <option value="Website Direct Demo Request">Google / Web Search</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Referral / Industry Peer">Referral from another brand</option>
                        <option value="eCommerce Event">eCommerce Summit / Event</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>
                  )}

                  {/* Form Navigation Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {step > 1 ? (
                      <Button type="button" variant="outline" size="sm" onClick={prevStep}>
                        <ArrowLeft className="w-4 h-4 mr-1.5" /> Previous
                      </Button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <Button type="button" size="sm" onClick={nextStep}>
                        Next Step <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    ) : (
                      <Button type="submit" size="sm" isLoading={isSubmitting} className="gap-2">
                        <Send className="w-4 h-4" /> Submit Enquiry
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
