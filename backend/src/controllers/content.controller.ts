import { Request, Response } from 'express';
import { WAREIQ_OFFICIAL_SERVICES, OFFICIAL_INDUSTRIES } from '../config/constants';
import { sendSuccess } from '../utils/apiResponse';

export const getServices = (req: Request, res: Response): void => {
  sendSuccess(res, WAREIQ_OFFICIAL_SERVICES, 'Official WareIQ services retrieved');
};

export const getIndustries = (req: Request, res: Response): void => {
  sendSuccess(res, OFFICIAL_INDUSTRIES, 'Official WareIQ industry verticals retrieved');
};

export const getFAQs = (req: Request, res: Response): void => {
  const faqs = [
    {
      question: 'How does WareIQ achieve Same-Day and Next-Day delivery?',
      answer: 'WareIQ uses Smart Inventory Placement (SIP) to analyze historical order distribution and dynamically position your inventory across strategically located Tier 1 & Tier 2 fulfillment centers closest to your end-customers.',
      category: 'Fulfillment'
    },
    {
      question: 'Which courier partners does WareIQ integrate with?',
      answer: 'WareIQ aggregates leading national carriers including BlueDart, Delhivery, Xpressbees, Shadowfax, DTDC, and Ekart with an intelligent routing algorithm that assigns each order to the best-performing courier per pincode.',
      category: 'Shipping'
    },
    {
      question: 'How does the Smart NDR Management system reduce RTO?',
      answer: 'When a delivery attempt fails, WareIQ instantly initiates automated buyer verification workflows via WhatsApp and SMS, capturing corrected addresses, preferred delivery times, and alternate numbers to maximize re-attempt success.',
      category: 'NDR / RTO'
    },
    {
      question: 'What is Seller of Record (SOR) and how does it help my business?',
      answer: 'WareIQ’s Seller of Record framework enables brands to store and dispatch inventory across multiple Indian states without the costly burden of creating separate state GST registrations or physical branch entities.',
      category: 'Compliance'
    },
    {
      question: 'Which storefronts and ERPs can I connect to WareIQ?',
      answer: 'We provide one-click integrations for Shopify, WooCommerce, Magento, Amazon, Flipkart, Myntra, Nykaa, Quick Commerce portals, Tally, Zoho, and ERP systems.',
      category: 'Integrations'
    }
  ];
  sendSuccess(res, faqs, 'FAQs retrieved');
};

export const getAnnouncements = (req: Request, res: Response): void => {
  const announcements = [
    {
      id: 'ann-1',
      title: 'Pan-India Quick Commerce Dark Store Staging Now Live',
      badge: 'New Feature',
      date: 'September 2026',
      summary: 'Replenish Blinkit, Zepto, and Instamart dark stores in under 2 hours with dedicated micro-fulfillment docks.'
    },
    {
      id: 'ann-2',
      title: 'Smart NDR AI Bot V3: Up to 35% RTO Reduction',
      badge: 'Platform Update',
      date: 'September 2026',
      summary: 'Conversational WhatsApp resolution flow now resolves doorstep address ambiguities automatically.'
    }
  ];
  sendSuccess(res, announcements, 'Announcements retrieved');
};
