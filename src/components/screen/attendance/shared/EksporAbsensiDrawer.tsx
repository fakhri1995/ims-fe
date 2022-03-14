import { DatePicker, Form } from "antd";
import moment from "moment";
import type { FC } from "react";

import DrawerCore from "components/drawer/drawerCore";

const { RangePicker } = DatePicker;

/**
 * Component EksporAbsensiDrawer's props.
 */
export interface IEksporAbsensiDrawer {}

/**
 * Component EksporAbsensiDrawer
 */
export const EksporAbsensiDrawer: FC<IEksporAbsensiDrawer> = (props) => {
  return (
    <DrawerCore title="Ekspor Absensi" buttonOkText="Ekspor Absensi" visible>
      <div className="space-y-6">
        <em className="text-state1">* Informasi ini harus diisi</em>

        <h4 className="mig-heading--4">Pilih Filter:</h4>
      </div>

      <Form>
        <Form.Item>
          <RangePicker
            defaultValue={[moment().subtract(1, "months"), moment()]}
            format="DD MMM YYYY"
          />
        </Form.Item>
      </Form>
    </DrawerCore>
  );
};
