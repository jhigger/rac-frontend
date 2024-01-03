import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { exportOrders, exportRequests } from "~/fake data";
import {
  type ImportOrderPackageType,
  type ImportRequestPackageType,
} from "./ImportContext";

export type ExportContextType = {
  draftPackage: ExportDraftPackageType | null;
  localDraft: ExportLocalDraftType;
  orderPackages: ExportOrderPackageType[];
  requestPackages: ExportRequestPackageType[];
  handleDraft: (draftPackage: ExportDraftPackageType | null) => void;
  handleLocalDraft: (localDraft: ExportLocalDraftType) => void;
  handleOrders: () => void;
  handleRequests: () => void;
};

export const ExportContext = createContext<ExportContextType>(
  {} as ExportContextType,
);

export const useExportContext = () => useContext(ExportContext);

export type ExportDraftPackageType = ExportRequestPackageType;

export type ExportOrderPackageType = ImportOrderPackageType;

export type ExportRequestPackageType = ImportRequestPackageType;

export type PropertyType = { label: string; value: string | undefined };

type ExportLocalDraftType = {
  requestPackage: ExportDraftPackageType | null | undefined;
} | null;

const ExportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackage, setDraftPackage] =
    useState<ExportDraftPackageType | null>(null);

  const [localDraft, setLocalDraft] = useLocalStorage<ExportLocalDraftType>(
    "Export",
    {
      requestPackage: draftPackage,
    },
  );

  const [orderPackages, setOrderPackages] = useState<ExportOrderPackageType[]>(
    [],
  );
  const [requestPackages, setRequestPackages] = useState<
    ExportRequestPackageType[]
  >([]);

  const handleDraft = (draftPackage: ExportDraftPackageType | null) => {
    setDraftPackage(draftPackage);
  };

  const handleLocalDraft = (localDraft: ExportLocalDraftType) => {
    setLocalDraft(localDraft);
  };

  const handleOrders = () => {
    setOrderPackages(exportOrders);
  };

  const handleRequests = () => {
    setRequestPackages(exportRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
  }, []);

  const value: ExportContextType = {
    draftPackage,
    localDraft,
    orderPackages,
    requestPackages,
    handleDraft,
    handleLocalDraft,
    handleOrders,
    handleRequests,
  };

  return (
    <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
  );
};

export default ExportContextProvider;
