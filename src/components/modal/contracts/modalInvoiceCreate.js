import { DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { PRODUCTS_GET } from "lib/features";

import { ProductCatalogService } from "../../../apis/product-catalog";
import ButtonSys from "../../button";
import { PlusIconSvg } from "../../icon";

const ModalInvoiceCreate = ({ initProps, visible, onvisible }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetProductInventories = hasPermission(PRODUCTS_GET);
  const [form] = Form.useForm();

  // 1. USE STATE
  const dataService = {
    id: null,
    product_id: null,
    product: { name: "" },
    pax: 0,
    price: "",
    unit: "bulan",
  };
  const [dataServiceList, setDataServiceList] = useState([dataService]);

  const [loading, setLoading] = useState(false);
  const [serviceTypeSearch, setServiceTypeSearch] = useState("");

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
    let tempServiceList = [...dataContractUpdate.services];
    tempServiceList.push(...dataServiceList);
    setDataContractUpdate((prev) => ({
      ...prev,
      services: tempServiceList,
    }));

    handleClose();
  };

  // console.log({ dataService });
  // console.log({ dataContractUpdate });

  return (
    <Modal
      title={"Buat Draft Invoice"}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
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
              // disabled={!dataServiceList[0]?.dataService?.product}
            >
              <p>Buat Draft</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nama Kontrak"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nama kontrak wajib diisi",
            },
          ]}
        >
          <>
            <Input placeholder="Masukkan nama Kontrak" />
          </>
        </Form.Item>
        <Form.Item
          label="PT Klien"
          name={"company_client"}
          rules={[
            {
              required: true,
              message: "PT Klien wajib diisi",
            },
          ]}
        >
          <Input
            placeholder="Pilih PT Klien"
            // value={service?.pax}
            // onChange={(e) => {
            //   let tempServiceList = [...dataServiceList];
            //   tempServiceList[idx].pax = e.target.value;

            //   setDataServiceList(tempServiceList);
            // }}
          />
        </Form.Item>

        <Form.Item
          label="Periode Tagihan"
          name={"invoice_periode"}
          rules={[
            {
              required: true,
              message: "Periode Tagihan wajib diisi",
            },
          ]}
        >
          <>
            <DatePicker.RangePicker
              allowEmpty
              // placeholder="Pilih Periode"
              // value={moment(dateState).isValid() ? moment(dateState) : null}
              // onChange={(dates, datestrings) => {
              //   setDateState(datestrings);
              // }}
              renderExtraFooter={() => <div />}
              style={{ width: "100%" }}
            />
          </>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalInvoiceCreate;
