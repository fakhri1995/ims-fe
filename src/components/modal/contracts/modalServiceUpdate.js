import { Form, Input, Modal, Select, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { PRODUCTS_GET } from "lib/features";

import { ProductCatalogService } from "../../../apis/product-catalog";
import ButtonSys from "../../button";

const ModalServiceUpdate = ({
  initProps,
  visible,
  onvisible,
  dataContractUpdate,
  setDataContractUpdate,
  currentIdx,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetProductInventories = hasPermission(PRODUCTS_GET);
  const [form] = Form.useForm();
  const rt = useRouter();
  const searchTimeoutRef = useRef(null);

  // 1. USE STATE
  const [dataService, setDataService] = useState({
    id: null,
    name: "",
    pax: 0,
    price: "",
    unit: "",
  });

  const [loading, setLoading] = useState(false);

  const [serviceTypeSearch, setServiceTypeSearch] = useState("");

  // 2. USE QUERY & USE EFFECT
  // 2.1. Set current service data
  useEffect(() => {
    if (visible) {
      setDataService(dataContractUpdate?.services?.[currentIdx]);
    }
  }, [dataContractUpdate.services, visible]);

  // 2.2. Get Contract Service Type List
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
    setDataService({ id: 0, name: "", pax: 0, price: "", unit: "" });
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    clearData();
  };

  const handleSave = () => {
    let tempServiceList = [...dataContractUpdate.services];
    tempServiceList.splice(currentIdx, 1, dataService);
    setDataContractUpdate((prev) => ({
      ...prev,
      services: tempServiceList,
    }));

    handleClose();
  };

  // console.log({ dataServiceTypeList });
  // console.log({ currentService });
  console.log({ currentIdx });
  console.log({ dataService });

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
              onClick={handleSave}
              disabled={!dataService?.name}
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
                value={dataService?.product_id}
                disabled={!isAllowedToGetProductInventories}
                placeholder={"Pilih jenis service"}
                style={{ width: `100%` }}
                onChange={(value, option) => {
                  setDataService((prev) => ({
                    ...prev,
                    product_id: value,
                    price: option.price,
                    unit: option.price_option,
                    name: option.children,
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
            name={"pax"}
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
              name={"unit"}
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
                  name={"unit"}
                  defaultValue={"bulan"}
                  value={dataService?.unit}
                  onChange={(value) => {
                    setDataService((prev) => ({ ...prev, unit: value }));
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
