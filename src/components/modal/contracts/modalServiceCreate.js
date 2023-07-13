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

const ModalServiceCreate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToUpdateProject,
  isAllowedToDeleteProject,
  dataContractUpdate,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetProductInventories = hasPermission(PRODUCTS_GET);

  // const isAllowedToAddContractService = hasPermission(CONTRACT_SERVICE_ADD);
  // const isAllowedToUpdateContractService = hasPermission(CONTRACT_SERVICE_UPDATE);

  const [form] = Form.useForm();
  const rt = useRouter();
  const searchTimeoutRef = useRef(null);

  // 1. USE STATE

  const dataService = {
    id: null,
    name: "",
    pax: 0,
    price: "",
    priceOption: "",
    inventoriesCount: 0,
  };
  const [dataServiceList, setDataServiceList] = useState([dataService]);

  const [loading, setLoading] = useState(false);
  const [serviceTypeSearch, setServiceTypeSearch] = useState("");

  // 2. USE QUERY & USE EFFECT
  // 2.1. Get Contract Service List
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
    setDataServiceList([dataService]);
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    clearData();
  };

  // console.log({ dataServiceList });

  return (
    <Modal
      title={"Tambah Service"}
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
              <p>Tambah & Simpan</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      {dataServiceList.map((service, idx) => (
        <div key={idx}>
          <Form layout="vertical" form={form}>
            <div className="grid grid-cols-2 gap-x-6">
              <Form.Item
                label="Jenis Service"
                name={"name"}
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
                    placeholder={"Pilih jenis service"}
                    value={service?.id}
                    name={"name"}
                    disabled={!isAllowedToGetProductInventories}
                    style={{ width: `100%` }}
                    onChange={(value, option) => {
                      let tempServiceList = [...dataServiceList];
                      tempServiceList[idx].id = value;
                      tempServiceList[idx].price = option.price;
                      tempServiceList[idx].priceOption = option.price_option;
                      tempServiceList[idx].name = option.inventories_count;
                      tempServiceList[idx].inventoriesCount = option.children;

                      setDataServiceList(tempServiceList);
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
                rules={[
                  {
                    required: true,
                    message: "Jumlah service wajib diisi",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Pilih jumlah service"
                  min={1}
                  value={service?.pax}
                  max={dataService.inventoriesCount}
                  onChange={(e) => {
                    let tempServiceList = [...dataServiceList];
                    tempServiceList[idx].pax = e.target.value;

                    setDataServiceList(tempServiceList);
                  }}
                />
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
                      value={service?.price}
                      onChange={(e) => {
                        let tempServiceList = [...dataServiceList];
                        tempServiceList[idx].price = e.target.value;

                        setDataServiceList(tempServiceList);
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
                      value={service?.priceOption}
                      onChange={(value) => {
                        let tempServiceList = [...dataServiceList];
                        tempServiceList[idx].priceOption = value;

                        setDataServiceList(tempServiceList);
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

              <button
                onClick={() => {
                  // const newService = { ...dataService };
                  const tempServiceList = [...dataServiceList];
                  tempServiceList.splice(idx + 1, 0, dataService);
                  setDataServiceList(tempServiceList);
                }}
                type="button"
                className="border border-dashed border-mono90 
                rounded-md bg-transparent h-10 mt-6"
              >
                <div className="flex items-center space-x-2 justify-center">
                  <PlusIconSvg color={"#808080"} size={16} />
                  <p className="text-mono50">Tambah Produk</p>
                </div>
              </button>
            </div>
          </Form>

          {dataServiceList.length > 1 && <hr className="text-mono90 mb-6" />}
        </div>
      ))}
    </Modal>
  );
};

export default ModalServiceCreate;
