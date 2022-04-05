import { createContext, useContext } from "react";

export type AccessControlValidateOpt = {
  yes?: () => void;
  no?: () => void;
};

export interface IAccessControlCtx {
  roles: string[];
  permissions: string[];

  hasRole: (role: string | string[], opt?: AccessControlValidateOpt) => void;
  hasPermission: (
    permission: string | string[],
    opt?: AccessControlValidateOpt
  ) => void;

  updateAccessControl: () => void;
}

export const accessControlContextDefaultValue: IAccessControlCtx = {
  roles: [],
  permissions: [],

  hasRole: () => {},
  hasPermission: () => {},

  updateAccessControl: () => {},
};

export const AccessControlContext = createContext<IAccessControlCtx>(
  accessControlContextDefaultValue
);

export const useAccessControl = () => useContext(AccessControlContext);
