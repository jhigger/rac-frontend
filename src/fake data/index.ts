import {
  type ImportDraftItemType,
  type ImportOrderItemType,
  type ImportRequestItemType,
} from "~/contexts/ImportContext";
import {
  type ShopDraftItemType,
  type ShopOrderItemType,
  type ShopRequestItemType,
} from "~/contexts/ShopContext";

const src = "https://placehold.co/500x500/cac4d0/1d192b?text=Image";

const images = (n: number) => {
  return Array(n)
    .fill(null)
    .map((_, i) => {
      return `${src}${i}`;
    });
};

export const shopOrders: ShopOrderItemType[] = [
  {
    images: images(1),
    orderId: "OD08751",
    orderStatus: "processed",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08751",
    shippingStatus: "not started",
    shopForMeStatus: "purchase not started",
    shopForMeCost: "$107.76",
    shippingCost: "$107.76",
  },
  {
    images: images(2),
    orderId: "OD08752",
    orderStatus: "not responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08752",
    shippingStatus: "arrived destination",
    shopForMeStatus: "purchase in progress",
    shopForMeCost: "$107.76",
    shippingCost: "$107.76",
  },
  {
    images: images(3),
    orderId: "OD08753",
    orderStatus: "responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08753",
    shippingStatus: "ready for shipping",
    shopForMeStatus: "purchase completed",
    shopForMeCost: "$107.76",
    shippingCost: "$107.76",
  },
  {
    images: images(4),
    orderId: "OD08754",
    orderStatus: "processed",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08754",
    shippingStatus: "in transit",
    shopForMeStatus: "purchase completed",
    shopForMeCost: "$107.76",
    shippingCost: "$107.76",
  },
  {
    images: images(5),
    orderId: "OD08755",
    orderStatus: "not responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08755",
    shippingStatus: "processing",
    shopForMeStatus: "purchase completed",
    shopForMeCost: "$107.76",
    shippingCost: "$107.76",
  },
  {
    images: images(6),
    orderId: "OD08756",
    orderStatus: "responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08756",
    shippingStatus: "cleared",
    shopForMeStatus: "purchase completed",
    shopForMeCost: "$107.76",
    shippingCost: "$107.76",
  },
  {
    images: images(7),
    orderId: "OD08757",
    orderStatus: "responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08757",
    shippingStatus: "cancelled",
    shopForMeStatus: "purchase completed",
    shopForMeCost: "$107.76",
    shippingCost: "$107.76",
  },
  {
    images: images(8),
    orderId: "OD08758",
    orderStatus: "responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08758",
    shippingStatus: "delivered",
    shopForMeStatus: "purchase completed",
    shopForMeCost: "$107.76",
    shippingCost: "$107.76",
  },
];

export const shopRequests: ShopRequestItemType[] = [
  {
    images: images(1),
    requestId: "OD08751",
    requestStatus: "not responded",
    requestDate: "22-03-2023 13:05",
  },
  {
    images: images(2),
    requestId: "OD08752",
    requestStatus: "responded",
    requestDate: "22-03-2023 13:05",
  },
  {
    images: images(3),
    requestId: "OD08753",
    requestStatus: "not responded",
    requestDate: "22-03-2023 13:05",
  },
  {
    images: images(4),
    requestId: "OD08754",
    requestStatus: "responded",
    requestDate: "22-03-2023 13:05",
  },
  {
    images: images(5),
    requestId: "OD08755",
    requestStatus: "not responded",
    requestDate: "22-03-2023 13:05",
  },
  {
    images: images(6),
    requestId: "OD08756",
    requestStatus: "responded",
    requestDate: "22-03-2023 13:05",
  },
];

export const shopDrafts: ShopDraftItemType[] = [
  {
    draftDate: "22-03-2023 13:05",
    origin: "origin",
    items: [
      {
        store: "",
        urgentPurchase: "No",
        url: "",
        name: "Designer Bags",
        originalCost: "",
        quantity: 1,
        shippingCost: "",
        images: images(1),
        description: "",
      },
    ],
  },
];

export const importOrders: ImportOrderItemType[] = [
  {
    orderId: "OD08751",
    orderStatus: "processed",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08751",
    shippingStatus: "not started",
    shippingCost: "$107.76",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
  {
    orderId: "OD08752",
    orderStatus: "not responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08752",
    shippingStatus: "arrived destination",
    shippingCost: "$107.76",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
  {
    orderId: "OD08753",
    orderStatus: "responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08753",
    shippingStatus: "ready for shipping",
    shippingCost: "$107.76",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
  {
    orderId: "OD08754",
    orderStatus: "processed",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08754",
    shippingStatus: "in transit",
    shippingCost: "$107.76",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
  {
    orderId: "OD08755",
    orderStatus: "not responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08755",
    shippingStatus: "processing",
    shippingCost: "$107.76",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
  {
    orderId: "OD08756",
    orderStatus: "responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08756",
    shippingStatus: "cleared",
    shippingCost: "$107.76",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
  {
    orderId: "OD08757",
    orderStatus: "responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08757",
    shippingStatus: "cancelled",
    shippingCost: "$107.76",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
  {
    orderId: "OD08758",
    orderStatus: "responded",
    orderDate: "22-03-2023 13:05",
    trackingId: "SH08758",
    shippingStatus: "delivered",
    shippingCost: "$107.76",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
];

export const importRequests: ImportRequestItemType[] = [
  {
    requestId: "OD08751",
    requestStatus: "not responded",
    requestDate: "22-03-2023 13:05",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
  {
    requestId: "OD08752",
    requestStatus: "responded",
    requestDate: "22-03-2023 13:05",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(2),
        description: "",
      },
    ],
  },
  {
    requestId: "OD08753",
    requestStatus: "not responded",
    requestDate: "22-03-2023 13:05",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(3),
        description: "",
      },
    ],
  },
  {
    requestId: "OD08754",
    requestStatus: "responded",
    requestDate: "22-03-2023 13:05",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(4),
        description: "",
      },
    ],
  },
  {
    requestId: "OD08755",
    requestStatus: "not responded",
    requestDate: "22-03-2023 13:05",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(5),
        description: "",
      },
    ],
  },
  {
    requestId: "OD08756",
    requestStatus: "responded",
    requestDate: "22-03-2023 13:05",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(6),
        description: "",
      },
    ],
  },
];

export const importDrafts: ImportDraftItemType[] = [
  {
    draftDate: "22-03-2023 13:05",
    origin: "origin",
    packageDeliveryStatus: "",
    items: [
      {
        name: "Designer Bags",
        idType: "Tracking ID",
        idNumber: "123456789",
        deliveryStatus: "",
        deliveredBy: "",
        originalCost: "",
        quantity: 1,
        images: images(1),
        description: "",
      },
    ],
  },
];
