import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  Tag,
  notification,
} from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { PRODUCTS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { ContractService } from "../../../apis/contract/contract.service";
import { ProductCatalogService } from "../../../apis/product-catalog";
import { generateStaticAssetUrl } from "../../../lib/helper";
import ButtonSys from "../../button";
import { PlusIconSvg } from "../../icon";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalServiceUpdate = ({
  initProps,
  visible,
  onvisible,
  currentService,
  dataContractUpdate,
  setDataContractUpdate,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetProductInventories = hasPermission(PRODUCTS_GET);
  // const isAllowedToAddContractService = hasPermission(CONTRACT_SERVICE_ADD);
  // const isAllowedToUpdateContractService = hasPermission(CONTRACT_SERVICE_UPDATE);
  const [form] = Form.useForm();
  const rt = useRouter();
  const searchTimeoutRef = useRef(null);

  // 1. USE STATE
  const [dataService, setDataService] = useState({
    id: null,
    name: "",
    pax: 0,
    price: "",
    priceOption: "",
    inventoriesCount: 0,
  });

  const [loading, setLoading] = useState(false);

  const [serviceTypeSearch, setServiceTypeSearch] = useState("");

  // 2. USE QUERY & USE EFFECT
  useEffect(() => {
    setDataService(currentService);
  }, [currentService]);

  // 2.1. Get Contract Service Type List
  const { data: dataServiceTypeList, isLoading: loadingServiceTypeList } =
    useQuery(
      [PRODUCTS_GET, serviceTypeSearch],
      () =>
        ProductCatalogService.getInventories(
          initProps,
          isAllowedToGetProductInventories,
          serviceTypeSearch
        ),
      {
        enabled: isAllowedToGetProductInventories,
        select: (response) => response.data.data,
      }
    );

  // 3. HANDLER
  const clearData = () => {
    setDataService({ id: 0, name: "", pax: 0, price: "", priceOption: "" });
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    clearData();
  };
  // console.log({ dataServiceTypeList });
  // console.log({ dataService });

  return (
    <Modal
      title={"Ubah Service"}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={700}
      footer={
        <Spin spinning={loading}>
          <div className="flex space-x-2 justify-end items-center">
            <button
              onClick={handleClose}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={() => onvisible(false)}
              disabled={!dataService.name}
            >
              <p>Simpan</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical" form={form}>
        <div className="grid grid-cols-2 gap-x-6">
          <Form.Item
            label="Jenis Service"
            name={"type"}
            rules={[
              {
                required: true,
                message: "Jenis service wajib diisi",
              },
            ]}
          >
            <div className="w-full mb-2">
              <Select
                showSearch
                value={dataService?.id}
                disabled={!isAllowedToGetProductInventories}
                placeholder={"Pilih jenis service"}
                style={{ width: `100%` }}
                onChange={(value, option) => {
                  setDataService((prev) => ({
                    ...prev,
                    id: value,
                    price: option.price,
                    priceOption: option.price_option,
                    name: option.children,
                    inventoriesCount: option.inventories_count,
                  }));
                }}
                onSearch={(value) => {
                  setServiceTypeSearch(value);
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {dataServiceTypeList?.map((item) => {
                  return (
                    <Select.Option
                      key={item?.id}
                      value={item?.id}
                      inventories_count={item.inventories_count}
                      price={item.price}
                      price_option={item.price_option}
                    >
                      {item?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </Form.Item>
          <Form.Item
            label="Pax"
            name={"quantity"}
            rules={[
              {
                required: true,
                message: "Jumlah service wajib diisi",
              },
            ]}
          >
            <>
              <Input
                type="number"
                placeholder="Pilih jumlah service"
                min={1}
                max={dataService.inventoriesCount}
                value={dataService?.pax}
                onChange={(e) => {
                  setDataService((prev) => ({ ...prev, pax: e.target.value }));
                }}
              />
            </>
          </Form.Item>

          <div className="flex items-center justify-between space-x-2">
            <Form.Item
              label="Harga"
              name={"price"}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Harga produk wajib diisi",
                },
              ]}
            >
              <>
                <Input
                  addonBefore="Rp."
                  placeholder="Isi harga produk"
                  type="number"
                  value={dataService?.price}
                  onChange={(e) => {
                    setDataService((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }));
                  }}
                />
              </>
            </Form.Item>

            <Form.Item
              name={"priceOption"}
              rules={[
                {
                  required: true,
                  message: "Satuan durasi service wajib diisi",
                },
              ]}
              className="mt-8"
            >
              <>
                <Select
                  name={"priceOption"}
                  defaultValue={"bulan"}
                  value={dataService?.priceOption}
                  onChange={(value) => {
                    setDataService((prev) => ({ ...prev, priceOption: value }));
                  }}
                >
                  <Select.Option key={1} value={"jam"}>
                    per Jam
                  </Select.Option>
                  <Select.Option key={2} value={"hari"}>
                    per Hari
                  </Select.Option>
                  <Select.Option key={3} value={"bulan"}>
                    per Bulan
                  </Select.Option>
                  <Select.Option key={4} value={"tahun"}>
                    per Tahun
                  </Select.Option>
                </Select>
              </>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalServiceUpdate;
