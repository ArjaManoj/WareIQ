import mongoose, { Schema, Document } from 'mongoose';

export interface ISupportTicket extends Document {
  customerId?: mongoose.Types.ObjectId;
  customerName: string;
  subject: string;
  category: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SupportTicketSchema: Schema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      default: 'Shipment Escalation',
    },
    description: { type: String, required: true, trim: true },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
      default: 'Open',
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const SupportTicket = mongoose.model<ISupportTicket>(
  'SupportTicket',
  SupportTicketSchema
);
