import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import { getClientToken } from "lib/auth";
import { ROLE_SUPER_ADMIN } from "lib/constants";

import { AuthService, AuthServiceQueryKeys } from "apis/auth";

import {
  AccessControlContext,
  IAccessControlCtx,
} from "./access-control.context";

export const AccessControlProvider: FC = ({ children }) => {
  /**
   * Dependencies
   */
  const token = getClientToken();
  const axiosClient = useAxiosClient();

  /**
   * States
   */
  const [rolesRecord, setRolesRecord] = useState<Record<string, boolean>>({});
  const [permissionsRecord, setPermissionsRecord] = useState<
    Record<string, boolean>
  >({});
  const [shouldBypass, setShouldBypass] = useState(false);

  const [isPending, setIsPending] = useState(true);

  /**
   * Queries
   */
  const { refetch } = useQuery(
    AuthServiceQueryKeys.DETAIL_PROFILE,
    () => AuthService.whoAmI(axiosClient),
    {
      enabled: false,
      onSuccess: (response) => {
        const features = response.data.data.features
          .map(({ name }) => name)
          .reduce((prev, curr) => ({ ...prev, [curr]: true }), {});

        const roles = response.data.data.roles
          .map(({ name }) => name)
          .reduce((prev, curr) => ({ ...prev, [curr]: true }), {});

        const isSuperAdmin = ROLE_SUPER_ADMIN in roles;

        setPermissionsRecord(features);
        setRolesRecord(roles);
        setShouldBypass(isSuperAdmin);
      },
      onSettled: () => {
        setIsPending(false);
      },
    }
  );

  /**
   * Callbacks
   */
  const hasRole = useCallback<IAccessControlCtx["hasRole"]>(
    (role, opt) => {
      if (shouldBypass) {
        return true;
      }

      let isRolesSatisfied = false;

      if (typeof role === "string") {
        isRolesSatisfied = role in rolesRecord;
      } else if (role instanceof Array) {
        let hasUnmatchedRole = false;

        role.forEach((roleName) => {
          if (hasUnmatchedRole) {
            return;
          }

          const isMatches = roleName in rolesRecord;
          if (!isMatches) {
            hasUnmatchedRole = true;
            return;
          }
        });

        isRolesSatisfied = hasUnmatchedRole === false;
      }

      if (!isPending) {
        if (isRolesSatisfied) {
          opt?.yes?.call(null);
          return true;
        } else {
          opt?.no?.call(null);
          return false;
        }
      }

      return false;
    },
    [rolesRecord, isPending, shouldBypass]
  );

  const hasPermission = useCallback<IAccessControlCtx["hasPermission"]>(
    (permission, opt) => {
      if (shouldBypass) {
        return true;
      }

      let isPermissionsSatisfied = false;

      if (typeof permission === "string") {
        isPermissionsSatisfied = permission in permissionsRecord;
      } else if (permission instanceof Array) {
        let hasUnmatchedPermission = false;

        permission.forEach((permissionName) => {
          if (hasUnmatchedPermission) {
            return;
          }

          const isMatches = permissionName in permissionsRecord;
          if (!isMatches) {
            hasUnmatchedPermission = true;
            return;
          }
        });

        isPermissionsSatisfied = hasUnmatchedPermission === false;
      }

      if (!isPending) {
        if (isPermissionsSatisfied) {
          opt?.yes?.call(null);
          return true;
        } else {
          opt?.no?.call(null);
          return false;
        }
      }

      return false;
    },
    [permissionsRecord, isPending, shouldBypass]
  );

  /**
   * Initiate / fill the data
   */
  useEffect(() => {
    /** Token will be an empty string after logout */
    if (token === "") {
      /** Freed some memory */
      setRolesRecord({});
      setPermissionsRecord({});
      setShouldBypass(false);
      setIsPending(true);
      return;
    }

    refetch();
  }, [token]);

  /**
   * Memoized value
   */
  const contextValue = useMemo(
    () => ({
      roles: Object.keys(rolesRecord),
      permissions: Object.keys(permissionsRecord),
      hasRole,
      hasPermission,
      updateAccessControl: refetch,
      isPending,
    }),
    [rolesRecord, permissionsRecord, hasRole, hasPermission, refetch, isPending]
  );

  return (
    <AccessControlContext.Provider value={contextValue}>
      {children}
    </AccessControlContext.Provider>
  );
};
