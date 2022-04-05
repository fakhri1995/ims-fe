import { FC, useEffect, useState } from "react";
import React from "react";

import { useAccessControl } from "contexts/access-control";

export interface IAccessControl {
  hasPermission?: string | string[];
  hasRole?: string | string[];
}

/**
 * AccessControl adalah component untuk render suatu component (children) jika
 *  memenuhi persyaratan tertentu. Persyaratannya antara lain berdasarkan role dan
 *  permission yang dimiliki oleh user saat ini.
 *
 * Component ini hanya bisa di-mount jika @see {AccessControlProvider} component berada di Tree.
 * Karena component ini depends dengan context tersebut.
 *
 * @example
 * ```tsx
 * // Asumsikan User memiliki feature: ATTENDANCE_FORMS_GET; yang akan render data ke dalam table.
 * <AccessControl hasPermission="ATTENDANCE_FORMS_GET">
 *   <Table />
 * </AccessControl>
 *
 * // Support nesting dan juga multiple values dalam bentuk array
 * <AccessControl hasRole={["Super Admin", "Admin", "Staff"]}>
 *   <p>Text ini hanya tampil ketika user memiliki ketiga role tersebut.</p>
 *
 *   <AccessControl hasPermission={["TASKS_GET", "TASK_CREATE"]}>
 *     <Button>Tambah Task</Button>
 *   <AccessControl>
 * </AccessControl>
 * ```
 */
export const AccessControl: FC<IAccessControl> = ({
  hasPermission,
  hasRole,
  children,
}) => {
  /** Assert `children` to be defined */
  if (React.Children.count(children) <= 0) {
    return null;
  }

  /**
   * Dependencies
   */
  const { hasPermission: validatePermission, hasRole: validateRole } =
    useAccessControl();

  /**
   * States
   */
  const [shouldRender, setShouldRender] = useState(false);

  /**
   * Effects / Listeners
   */
  /** Effect ini menjadi logic untuk validate apakah persyaratan terpenuhi atau tidak. */
  useEffect(() => {
    const isPermissionDefined = hasPermission !== undefined;
    const isRoleDefined = hasRole !== undefined;

    if (!isPermissionDefined && !isRoleDefined) {
      setShouldRender(true);
      return;
    }

    let isPermissionSatisfied = false;
    let isRoleSatisfied = false;

    if (hasPermission !== undefined) {
      validatePermission(hasPermission, {
        yes: () => (isPermissionSatisfied = true),
      });
    }

    if (hasRole !== undefined) {
      validateRole(hasRole, {
        yes: () => (isRoleSatisfied = true),
      });
    }

    setShouldRender(isPermissionSatisfied || isRoleSatisfied);
  }, [hasPermission, hasRole, validatePermission, validateRole]);

  /** Conditional rendering */
  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
};
