import { Form, Input, InputNumber, Modal, Select, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { PRODUCTS_GET } from "lib/features";

import { ProductCatalogService } from "../../../apis/product-catalog";
import { countSubTotal } from "../../../lib/helper";
import ButtonSys from "../../button";
import { PlusIconSvg } from "../../icon";
import { InputCurrency } from "../../input";

const ModalServiceCreate = ({
  initProps,
  visible,
  onvisible,
  dataContractUpdate,
  setDataContractUpdate,
  isInvoiceForm,
  handleSaveInvoice,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetProductInventories = hasPermission(PRODUCTS_GET);
  const [form] = Form.useForm();

  // 1. USE STATE
  const dataService = {
    id: null,
    product_id: null,
    product: { name: "" },
    pax: 0,
    price: 0,
    subtotal: 0,
    unit: "bulan",
  };
  const [dataServiceList, setDataServiceList] = useState([dataService]);
  const [loading, setLoading] = useState(false);
  const [serviceTypeSearch, setServiceTypeSearch] = useState("");
  const [disableSave, setDisableSave] = useState(true);

  // 2. USE QUERY & USE EFFECT
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

  useEffect(() => {
    const allTypeIsFilled = dataServiceList.every((item) => item?.product_id);
    if (allTypeIsFilled) {
      setDisableSave(false);
    }
  }, [dataServiceList]);

  // 3. HANDLER
  const clearData = () => {
    setDataServiceList([dataService]);
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    clearData();
  };

  const handleSave = () => {
    let tempServiceList = [];
    if (isInvoiceForm) {
      tempServiceList = [...dataContractUpdate?.invoice_services];
      tempServiceList.push(...dataServiceList);
      setDataContractUpdate((prev) => ({
        ...prev,
        invoice_services: tempServiceList,
      }));
    } else {
      tempServiceList = [...dataContractUpdate?.services];
      tempServiceList.push(...dataServiceList);
      setDataContractUpdate((prev) => ({
        ...prev,
        services: tempServiceList,
      }));
    }

    // use in invoice form
    if (handleSaveInvoice) {
      const newInvoiceTotal = tempServiceList?.reduce(
        (acc, item) => acc + countSubTotal(item?.pax, item?.price),
        0
      );

      handleSaveInvoice(0, {
        ...dataContractUpdate,
        invoice_services: tempServiceList,
        invoice_total: newInvoiceTotal,
      });
    }

    handleClose();
  };

  // console.log({ dataServiceList });
  // console.log({ dataContractUpdate });

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
              onClick={handleSave}
              disabled={disableSave}
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
                    value={service?.product_id}
                    name={"name"}
                    disabled={!isAllowedToGetProductInventories}
                    style={{ width: `100%` }}
                    onChange={(value, option) => {
                      let tempServiceList = [...dataServiceList];

                      let tempIdx = isInvoiceForm
                        ? dataContractUpdate?.invoice_services?.length + idx
                        : dataContractUpdate?.services?.length + idx;

                      tempServiceList[idx].key =
                        tempServiceList[idx].id || tempIdx;

                      tempServiceList[idx].product_id = value;
                      tempServiceList[idx].price = option.price;
                      tempServiceList[idx].unit = option.price_option;
                      tempServiceList[idx].product = { name: option.children };

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
                  onChange={(e) => {
                    let tempServiceList = [...dataServiceList];
                    let newPax = e.target.value;
                    tempServiceList[idx].pax = newPax;
                    tempServiceList[idx].subtotal = countSubTotal(
                      newPax,
                      tempServiceList[idx]?.price
                    );

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
                    <InputCurrency
                      placeholder={"Isi harga produk"}
                      value={service?.price}
                      onChange={(value) => {
                        let tempServiceList = [...dataServiceList];
                        tempServiceList[idx].price = value;
                        tempServiceList[idx].subtotal = countSubTotal(
                          tempServiceList[idx]?.pax,
                          value
                        );
                        setDataServiceList(tempServiceList);
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
                      defaultValue={"Bulan"}
                      value={service?.unit}
                      onChange={(value) => {
                        let tempServiceList = [...dataServiceList];
                        tempServiceList[idx].unit = value;

                        setDataServiceList(tempServiceList);
                      }}
                    >
                      <Select.Option key={"jam"} value={"jam"}>
                        per Jam
                      </Select.Option>
                      <Select.Option key={"hari"} value={"hari"}>
                        per Hari
                      </Select.Option>
                      <Select.Option key={"bulan"} value={"bulan"}>
                        per Bulan
                      </Select.Option>
                      <Select.Option key={"tahun"} value={"tahun"}>
                        per Tahun
                      </Select.Option>
                    </Select>
                  </>
                </Form.Item>
              </div>

              <button
                onClick={() => {
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
