import { createContext, useContext } from "react";

export type AccessControlValidateOpt = {
  yes?: () => void;
  no?: () => void;
};

export interface IAccessControlCtx {
  roles: string[];
  permissions: string[];

  hasRole: (role: string | string[], opt?: AccessControlValidateOpt) => boolean;
  hasPermission: (
    permission: string | string[],
    opt?: AccessControlValidateOpt
  ) => boolean;

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
