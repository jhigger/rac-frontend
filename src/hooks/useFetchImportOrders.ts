import { useQuery, type DefinedUseQueryResult } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import {
  type ImportItemType,
  type ImportOrderPackageType,
} from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";

const useFetchImportOrders = (
  token: string,
): DefinedUseQueryResult<ImportOrderPackageType[], AxiosError> => {
  const { activeTab } = useTabContext();

  const handleFetch = async () => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const reqOptions = {
      url: "https://rac-backend.onrender.com/api/import-orders",
      method: "GET",
      headers: headersList,
    };

    const response = await axios.request(reqOptions);
    const { importOrders } = response.data as Root;
    const importOrderPackages: ImportOrderPackageType[] = importOrders.map(
      (order) => {
        const orderPackage: ImportOrderPackageType = {
          orderId: order.orderId,
          orderStatus:
            order.orderStatus.toLowerCase() as ImportOrderPackageType["orderStatus"],
          orderLocalDate: new Date(order.createdAt).toLocaleString("en-US", {
            hour12: false,
          }),
          trackingId: order.trackingId,
          shippingStatus:
            order.shippingStatus.toLowerCase() as ImportOrderPackageType["shippingStatus"],
          originWarehouse:
            order.origin as ImportOrderPackageType["originWarehouse"],
          destinationWarehouse:
            order.destination as ImportOrderPackageType["destinationWarehouse"],
          items: order.requestItems.map((item) => {
            const requestItem: ImportItemType = {
              name: item.itemName,
              idType: item.idType as ImportItemType["idType"],
              idNumber: item.idNumber,
              deliveryStatus:
                item.itemDeliveryStatus as ImportItemType["deliveryStatus"],
              deliveredBy: item.deliveredBy as ImportItemType["deliveredBy"],
              originalCost: item.itemOriginalCost,
              quantity: 0, // todo: missing
              weight: 0, // todo: missing
              height: 0, // todo: missing
              length: 0, // todo: missing
              width: 0, // todo: missing
              image: item.itemImage,
              description: item.itemDescription,
            };

            return requestItem;
          }),
          billingDetails: {
            firstName:
              order.shippingAndBillingInfo.billingInformation[0]?.firstName ??
              "",
            lastName:
              order.shippingAndBillingInfo.billingInformation[0]?.lastName ??
              "",
            email:
              order.shippingAndBillingInfo.billingInformation[0]?.email ?? "",
            countryCode:
              order.shippingAndBillingInfo.billingInformation[0]?.countryCode ??
              "",
            phoneNumber:
              order.shippingAndBillingInfo.billingInformation[0]?.phoneNumber ??
              "",
            address:
              order.shippingAndBillingInfo.billingInformation[0]
                ?.streetAddress ?? "",
            country:
              order.shippingAndBillingInfo.billingInformation[0]?.country ?? "",
            state:
              order.shippingAndBillingInfo.billingInformation[0]?.state ?? "",
            city:
              order.shippingAndBillingInfo.billingInformation[0]?.city ?? "",
            zipPostalCode:
              order.shippingAndBillingInfo.billingInformation[0]?.zipCode ?? "",
          },
          shippingMethod: "basic", // todo: missing
          shippingPaymentStatus:
            order.totalShippingCostFeeStatus as ImportOrderPackageType["shippingPaymentStatus"],
          packageCosts: {
            shippingCost: order.shippingCost,
            clearingPortHandlingCost: order.portHandling,
            otherCharges: order.otherCharges,
            storageCharge: order.storageCharges,
            insurance: order.insurance,
            valueAddedTax: order.vat,
            paymentMethodSurcharge: order.paymentMethodSurcharge,
            discount: order.discount,
          },
        };

        return orderPackage;
      },
    );

    return importOrderPackages;
  };

  const query = useQuery<ImportOrderPackageType[], AxiosError>({
    queryKey: ["importOrders"],
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
  importOrders: ImportOrder[];
}

export interface ImportOrder {
  shippingAndBillingInfo: ShippingAndBillingInfo;
  orderDate: string;
  shippingFeeStatus: string;
  totalShippingFeeStatus: string;
  totalShippingFeePaidAt: string;
  _id: string;
  user: string;
  origin: string;
  packageDeliveryStatus: string;
  requestItems: RequestItem[];
  requestStatus: string;
  processingFeeStatus: string;
  orderStatus: string;
  shippingStatus: string;
  shopForMeStatus: string;
  totalShippingCostFeeStatus: string;
  requestId: string;
  orderId: string;
  trackingId: string;
  shipmentUpdates: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
  destination: string;
  discount: number;
  insurance: number;
  otherCharges: number;
  paymentMethodSurcharge: number;
  portHandling: number;
  requestApprovedAt: string;
  shippingCost: number;
  storageCharges: number;
  totalShippingFee: number;
  vat: number;
  initiateShippingConsent: boolean;
  shipmentInitiatedAt: string;
}

export interface ShippingAndBillingInfo {
  billingInformation: BillingInformation[];
  shipmentAddress: ShipmentAddress;
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
  receiverFirstName: string;
  receiverLastName: string;
  receiverEmail: string;
  receiverCountryCode: string;
  receiverPhone: string;
  receiverHouseAddress: string;
  receiverCountry: string;
  receiverState: string;
  receiverCity: string;
  receiverZipCode: string;
  _id: string;
}

export interface RequestItem {
  itemName: string;
  idType: string;
  idNumber: string;
  itemDeliveryStatus: string;
  deliveredBy: string;
  itemOriginalCost: number;
  itemImage: string;
  itemDescription: string;
  _id: string;
}

export default useFetchImportOrders;
