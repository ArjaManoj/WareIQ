# MongoDB Atlas Database Schema & Entity Relationships

This document outlines the data models designed for the **WareIQ Interactive Fulfillment Platform**.

---

## 1. Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Order : places_or_manages
    User ||--o{ SupportTicket : creates
    User ||--o{ Lead : assigned_to

    Order ||--|| Shipment : tracks
    Order ||--|{ OrderItem : contains
    OrderItem }o--|| Product : references

    Product }o--|| FulfillmentCenter : stored_in
    InventoryTransaction }o--|| Product : adjusts
    InventoryTransaction }o--|| FulfillmentCenter : located_at

    User {
        ObjectId _id
        string name
        string email
        string passwordHash
        string role "admin | operations | customer"
        string companyName
        string phone
        boolean isActive
        Date createdAt
        Date updatedAt
    }

    Lead {
        ObjectId _id
        string firstName
        string lastName
        string email
        string phone
        string companyName
        string operatingLocation
        string enquiryType "D2C | B2B | Marketplace | Q-Commerce | Shipping | SOR"
        string challenges
        string monthlyOrders
        string warehouseCount
        string businessLocation
        string requirements
        string source
        string status "New | Contacted | Qualified | Proposal | Converted | Closed"
        ObjectId assignedTo
        string notes
        Date createdAt
        Date updatedAt
    }

    Order {
        ObjectId _id
        string orderId
        ObjectId customerId
        string customerName
        string channel "D2C | Marketplace | Quick Commerce | B2B"
        Date orderDate
        string fulfillmentCenter
        Array items
        number totalItems
        number totalAmount
        string paymentStatus "Paid | COD | Pending"
        string fulfillmentStatus "Unfulfilled | Picked | Packed | Fulfilled | Cancelled"
        string shippingStatus "Manifested | In Transit | Out for Delivery | Delivered | NDR | RTO"
        string courier "Delhivery | BlueDart | Xpressbees | Shadowfax | DTDC"
        string awbNumber
        string deliveryCity
        string pincode
        Date expectedDeliveryDate
        Date deliveredAt
        Date createdAt
        Date updatedAt
    }

    Shipment {
        ObjectId _id
        string awbNumber
        string orderId
        string courier
        string origin
        string destination
        string currentStatus "Order Confirmed | Processing | Picked | Packed | Dispatched | In Transit | Out for Delivery | Delivered | NDR | RTO"
        Date estimatedDelivery
        Date deliveredAt
        Array events
        Date createdAt
        Date updatedAt
    }

    Product {
        ObjectId _id
        string sku
        string name
        string category
        string brand
        number quantity
        number reservedQuantity
        number availableQuantity
        number reorderLevel
        string fulfillmentCenter
        string status "In Stock | Low Stock | Out of Stock"
        Date createdAt
        Date updatedAt
    }

    FulfillmentCenter {
        ObjectId _id
        string name
        string city
        string state
        string zone "North | South | West | East"
        string address
        string pincode
        Array services
        string operatingStatus "Active | Maintenance | Planning"
        number capacityPercentage
        Date createdAt
        Date updatedAt
    }

    InventoryTransaction {
        ObjectId _id
        string sku
        string fulfillmentCenter
        string type "INBOUND | OUTBOUND | RETURN | ADJUSTMENT | TRANSFER"
        number quantity
        string referenceId
        number previousQuantity
        number newQuantity
        string reason
        Date createdAt
    }

    SupportTicket {
        ObjectId _id
        ObjectId customerId
        string customerName
        string subject
        string category
        string description
        string priority "Low | Medium | High | Urgent"
        string status "Open | In Progress | Resolved | Closed"
        ObjectId assignedTo
        Date createdAt
        Date updatedAt
    }
```
