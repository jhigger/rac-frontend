import { useQuery, type DefinedUseQueryResult } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import {
  type ShopItemType,
  type ShopOrderPackageType,
} from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";

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
      url: "https://rac-backend.onrender.com/api/sfmOrders",
      method: "GET",
      headers: headersList,
    };

    const response = await axios.request(reqOptions);
    const { sfmOrders } = response.data as Root;
    const shopOrders: ShopOrderPackageType[] = sfmOrders.map((order) => {
      const orderPackage: ShopOrderPackageType = {
        orderId: order.orderId,
        orderStatus:
          order.orderStatus.toLowerCase() as ShopOrderPackageType["orderStatus"],
        orderLocalDate: new Date(order.createdAt).toLocaleString("en-US", {
          hour12: false,
        }),
        trackingId: order.trackingId,
        shippingStatus:
          order.ShippingStatus.toLowerCase() as ShopOrderPackageType["shippingStatus"],
        originWarehouse:
          order.origin as ShopOrderPackageType["originWarehouse"],
        destinationWarehouse: "Nigeria Warehouse (Lagos)", // todo: missing
        items: order.requestItems.map((item) => {
          const requestItem: ShopItemType = {
            store: item.store as ShopItemType["store"],
            urgent: item.urgent,
            url: "", // todo: missing
            name: item.itemName,
            originalCost: item.itemPrice,
            quantity: item.qty,
            weight: 0, // todo: missing
            height: 0, // todo: missing
            length: 0, // todo: missing
            width: 0, // todo: missing
            image: item.itemImage,
            description: item.description,
            relatedCosts: {
              urgentPurchaseFee: 0, // todo: missing
              processingFee: 0, // todo: missing
              shippingToOriginWarehouseCost: 0, // todo: missing
              shopForMeCost: 0, // todo: missing
            },
          };

          return requestItem;
        }),
        billingDetails: {
          firstName:
            order.shippingAndBillingInfo.billingInformation[0]?.firstName ?? "",
          lastName:
            order.shippingAndBillingInfo.billingInformation[0]?.lastName ?? "",
          email:
            order.shippingAndBillingInfo.billingInformation[0]?.email ?? "",
          countryCode:
            order.shippingAndBillingInfo.billingInformation[0]?.countryCode ??
            "",
          phoneNumber:
            order.shippingAndBillingInfo.billingInformation[0]?.phoneNumber ??
            "",
          address:
            order.shippingAndBillingInfo.billingInformation[0]?.streetAddress ??
            "",
          country:
            order.shippingAndBillingInfo.billingInformation[0]?.country ?? "",
          state:
            order.shippingAndBillingInfo.billingInformation[0]?.state ?? "",
          city: order.shippingAndBillingInfo.billingInformation[0]?.city ?? "",
          zipPostalCode:
            order.shippingAndBillingInfo.billingInformation[0]?.zipCode ?? "",
        },
        totalShopForMeCost: 0, // todo: missing
        shopForMeStatus:
          order.shopForMeStatus as ShopOrderPackageType["shopForMeStatus"],
        totalShippingCost: order.totalShippingCost,
        shippingMethod: "basic", // todo: missing
        shippingPaymentStatus:
          order.processingFeeStatus as ShopOrderPackageType["shippingPaymentStatus"],
        packageCosts: {
          shippingCost: order.shippingCost,
          clearingPortHandlingCost: order.clearingPortHandling,
          otherCharges: order.otherCharges,
          storageCharge: order.storageCharges,
          insurance: order.insurance,
          valueAddedTax: order.vat,
          paymentMethodSurcharge: order.paymentMethodSurcharge,
          discount: order.discount,
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
      const res = await handleFetch();
      const packages = res;
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

export interface Root {
  success: boolean;
  totalOrders: number;
  sfmOrders: SfmOrder[];
}

export interface SfmOrder {
  shippingAndBillingInfo: ShippingAndBillingInfo;
  _id: string;
  user: string;
  origin: string;
  requestItems: RequestItem[];
  shippingAddress: [];
  requestStatus: string;
  processingFeeStatus: string;
  orderStatus: string;
  ShippingStatus: string;
  shopForMeStatus: string;
  requestId: string;
  shipmentUpdates: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
  requestApprovedAt: string;
  discount: number;
  paymentMethodSurcharge: number;
  totalItemCostFromStore: number;
  totalProcessingFee: number;
  totalShippingCost: number;
  totalUrgentPurchaseCost: number;
  vat: number;
  shopForMeCost?: number;
  shopForMeCostPaidAt?: string;
  transactionDetails?: TransactionDetails;
  clearingPortHandling: number;
  insurance: number;
  otherCharges: number;
  shippingCost: number;
  shippingDiscount?: number;
  shippingPaymentMethodSurcharge?: number;
  shippingVat?: number;
  storageCharges: number;
  totalShippingCostPaidAt?: string;
  shopForMeFeeStatus: string;
  orderId: string;
  trackingId: string;
}

export interface ShippingAndBillingInfo {
  billingInformation: BillingInformation[];
  shipmentAddress?: ShipmentAddress;
}

export interface BillingInformation {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
  streetAddress: string;
  state: string;
  city: string;
  zipCode: string;
  _id: string;
}

export interface ShipmentAddress {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  _id: string;
}

export interface RequestItem {
  store: string;
  itemName: string;
  urgent: boolean;
  itemImage: string;
  itemPrice: number;
  qty: number;
  description: string;
  itemColor: string;
  _id: string;
  additionalProperties: [];
}

export interface TransactionDetails {
  bankType: string;
  transactionDate: string;
  transactionTime: string;
  phoneNumber: string;
  paymentReceipt: string;
  additionalNote: string;
  _id: string;
}

export default useFetchShopOrders;
