import { createContext, useContext } from "react";

export interface IAccessControlCtx {
  roles: string[];
  permissions: string[];

  hasRole: (role: string | string[]) => boolean;
  hasPermission: (permission: string | string[]) => boolean;

  updateAccessControl: () => void;

  isPending: boolean;
}

export const accessControlContextDefaultValue: IAccessControlCtx = {
  roles: [],
  permissions: [],

  hasRole: () => false,
  hasPermission: () => false,

  updateAccessControl: () => {},

  isPending: false,
};

export const AccessControlContext = createContext<IAccessControlCtx>(
  accessControlContextDefaultValue
);

export const useAccessControl = () => useContext(AccessControlContext);
