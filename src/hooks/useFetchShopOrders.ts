import { useQuery, type DefinedUseQueryResult } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import {
  type ShopItemType,
  type ShopOrderPackageType,
} from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import { shopOrders } from "~/fake data";

const useFetchShopOrders = (
  token: string,
): DefinedUseQueryResult<ShopOrderPackageType[], AxiosError> => {
  const { activeTab } = useTabContext();

  const handleFetch = async () => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const reqOptions = {
      url: "https://rac-backend.onrender.com/api/sfmRequests/mine/orders",
      method: "GET",
      headers: headersList,
    };

    const response = await axios.request(reqOptions);
    const { sfmOrders } = response.data as Main;
    const shopOrders: ShopOrderPackageType[] = sfmOrders.map((order) => {
      const orderPackage: ShopOrderPackageType = {
        orderId: order.orderId,
        orderStatus:
          order.orderStatus.toLowerCase() as ShopOrderPackageType["orderStatus"],
        orderLocalDate: new Date(order.createdAt).toLocaleString(),
        trackingId: order.trackingId,
        shippingStatus:
          order.ShippingStatus.toLowerCase() as ShopOrderPackageType["shippingStatus"],
        originWarehouse:
          order.origin as ShopOrderPackageType["originWarehouse"],
        items: order.requestPackages.map((item) => {
          const requestItem: ShopItemType = {
            store: item.store as ShopItemType["store"],
            urgent: item.urgent,
            url: item.itemUrl,
            name: item.itemName,
            originalCost: item.cost,
            quantity: item.qty,
            shippingCost: item.shippingCost,
            image: item.itemImage,
            description: item.description,
            // todo: missing
            relatedCosts: {
              urgentPurchaseFee: 0,
              processingFee: 87000,
              shippingToOriginWarehouseCost: 87000,
              shopForMeCost: 87000,
            },
          };

          return requestItem;
        }),
        // todo: missing
        billingDetails: {
          firstName: "Malibu",
          lastName: "SHedrack",
          email: "Malibushdrack@gmail.com",
          countryCode: "+234",
          phoneNumber: "803 456 7845",
          address: "No, 1osolo way, ikeja road, behind scaint merry",
          country: "Turkey",
          state: "Istanbul",
          city: "Cyprusic",
          zipPostalCode: "98765",
        },
        totalShopForMeCost: 0, // todo: missing
        shopForMeStatus:
          order.shopForMeStatus as ShopOrderPackageType["shopForMeStatus"],
        totalShippingCost: 0, // todo: missing
        shippingPaymentStatus: "Unpaid", // todo: missing
        packageCosts: {
          shippingCost: 0, // todo: missing
          clearingPortHandlingCost: 0, // todo: missing
          otherCharges: 0, // todo: missing
          storageCharge: 0, // todo: missing
          insurance: 0, // todo: missing
          valueAddedTax: 0, // todo: missing
          paymentMethodSurcharge: 0, // todo: missing
          discount: 0, // todo: missing
        },
      };

      return orderPackage;
    });

    return shopOrders;
  };

  const query = useQuery<ShopOrderPackageType[], AxiosError>({
    queryKey: ["shopOrders"],
    queryFn: async () => {
      console.log("fetching user order packages");
      // const res = await handleFetch();
      // const packages = res;
      const packages = shopOrders;
      if (packages.length > 0) {
        console.log("user order packages: ", packages);
        return packages;
      }

      console.log("user order packages empty");
      return [];
    },
    initialData: [],
    enabled: activeTab === "orders",
  });

  return query;
};

export interface Main {
  success: boolean;
  totalOrders: number;
  sfmOrders: SfmOrder[];
}

export interface SfmOrder {
  requestStatus: string;
  orderStatus: string;
  ShippingStatus: string;
  shopForMeStatus: string;
  _id: string;
  user: string;
  sfmType?: string;
  origin: string;
  requestPackages: RequestItem[];
  contactAddress?: unknown[];
  sfmRequestApproved?: boolean;
  sfmPaymentPaid: boolean;
  processingFeePaid: boolean;
  requestId: string;
  orderId: string;
  trackingId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  shippingAddress: unknown[];
  requestApprovedAt?: Date;
}

export interface RequestItem {
  store: string;
  itemUrl: string;
  itemName: string;
  urgent: boolean;
  itemImage: string;
  itemPrice: number;
  cost: number;
  qty: number;
  shippingCost: number;
  description: string;
  _id: string;
}

export default useFetchShopOrders;
