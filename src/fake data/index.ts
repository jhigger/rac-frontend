import { type OrderItemType } from "~/contexts/TabsContext";

const src = "https://placehold.co/500x500/cac4d0/1d192b?text=Image";

const images = (n: number) => {
  return Array(n)
    .fill(null)
    .map((_, i) => {
      return `${src}${i}`;
    });
};

export const orders: OrderItemType[] = [
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
