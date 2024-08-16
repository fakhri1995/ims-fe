// import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox, // Collapse,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin, // Timeline,
  TreeSelect,
  notification,
} from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_CLIENTS_GET,
  COMPANY_SUB_LOCATIONS_GET,
  INVENTORY_GET,
  INVENTORY_UPDATE,
  MODELS_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { CompanyService } from "apis/company";

import Layout from "../../../components/layout-dashboard2";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

const ItemUpdate = ({ initProps, dataProfile, sidemenu, itemid }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToUpdateInventory = hasPermission(INVENTORY_UPDATE);
  const isAllowedToGetSubLocations = hasPermission(COMPANY_SUB_LOCATIONS_GET);
  const isAllowedToGetInventory = hasPermission(INVENTORY_GET); // for /getInventory and /getInventoryRelations
  const isAllowedToGetModels = hasPermission(MODELS_GET);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_CLIENTS_GET); // /getCompanyClientList (Owned By input field's data source)

  // 1.Init
  const rt = useRouter();
  const axiosClient = useAxiosClient();

  var pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 2);
  pathArr[pathArr.length - 1] = "Ubah Item";
  const [instanceForm] = Form.useForm();
  const [instanceForm2] = Form.useForm();
  // const { Panel } = Collapse;

  //2.useState
  const [updatedata, setupdatedata] = useState({
    id: Number(itemid),
    model_id: "",
    model_inventory: null, // object
    is_consumable: false,
    owned_by: null, // number
    vendor_id: "",
    inventory_name: "",
    status_condition: "",
    status_usage: "",
    serial_number: "",
    location: "", // number
    is_exist: true,
    deskripsi: "",
    manufacturer_id: "",
    mig_id: "",
    notes: "",
    additional_attributes: [],
    inventory_values: [],
    location_inventory: {
      id: -1,
      name: "",
      role: -1,
      top_parent_id: null,
    },
  });

  const [invrelations, setinvrelations] = useState({
    models: [],
    assets: [],
    manufacturers: [],
    status_condition: [],
    status_usage: [],
    vendors: [],
    companies: [],
    tree_companies: [],
  });

  // const [modeldata, setmodeldata] = useState([]);
  const [snitem, setsnitem] = useState(false);
  // const [manuffielditem, setmanuffielditem] = useState(true);
  const [praloading, setpraloading] = useState(true);
  const [loadingupdate, setloadingupdate] = useState(false);
  const [modalupdate, setmodalupdate] = useState(false);
  const [disabledfield, setdisabledfield] = useState(true);

  const [sublocdata, setsublocdata] = useState([]);
  const [subloctrigger, setsubloctrigger] = useState(-1);
  /** Effect to fetch SubLocation list when User change "Location" input field */
  useEffect(() => {
    if (subloctrigger !== -1) {
      if (!isAllowedToUpdateInventory || !isAllowedToGetSubLocations) {
        return;
      }

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getSubLocations?company_id=${subloctrigger}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setsublocdata(res2.data.children || []);
        });
    }
  }, [subloctrigger, isAllowedToGetSubLocations, isAllowedToUpdateInventory]);

  /** Effect to set default "Sub Lokasi" input field if it's in valid condition */
  useEffect(() => {
    const locationId = updatedata.location_inventory.id;
    const locationRole = updatedata.location_inventory.role;
    if (sublocdata.length === 0 || locationId === -1 || locationRole !== 4) {
      // skip setting form's fields value for initial mount.
      //
      // `locationRole` 4 => it's a valid sublocation value. Otherwise, we should not update sublocation input field value.
      return;
    }

    instanceForm?.setFieldsValue({
      sublocation: locationId,
    });
  }, [sublocdata, updatedata.location_inventory.id]);

  /**
   * Daftar company untuk field "Owned By".
   * State akan berubah ketika nilai dari `updatedata.location` berubah.
   */
  const [ownerList, setOwnerList] = useState([]);
  const [isFetchingOwnerList, setIsFetchingOwnerList] = useState(false);
  const fetchCompanyClientList = useCallback(() => {
    if (!isAllowedToUpdateInventory || !isAllowedToGetCompanyList) {
      return;
    }

    setIsFetchingOwnerList(true);
    CompanyService.getCompanyClientList(axiosClient, true).then((response) => {
      // resultList has to be an array
      const resultList = response.data.data;
      if (resultList instanceof Array) {
        setOwnerList(resultList);
        setIsFetchingOwnerList(false);
      }
    });
  }, [
    updatedata.owned_by,
    isAllowedToGetCompanyList,
    isAllowedToUpdateInventory,
  ]);

  /** Effect to set default value of `owned_by` input field. */
  useEffect(() => {
    if (ownerList.length > 0) {
      instanceForm?.setFieldsValue({
        owned_by: updatedata.owned_by,
      });
    }
  }, [ownerList, instanceForm]);

  useEffect(() => {
    if (!!updatedata.owned_by) {
      fetchCompanyClientList();
    }
  }, [updatedata.owned_by]);

  //handler
  const handleUpdateItem = () => {
    const invcolumns = updatedata.inventory_values.map((doc, idx) => {
      if (doc.data_type === "dropdown" || doc.data_type === "checkbox") {
        return {
          ...doc,
          value: JSON.stringify(doc.value),
        };
      } else {
        return { ...doc };
      }
    });
    const finalres = {
      ...updatedata,
      inventory_values: invcolumns,
    };
    setloadingupdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateInventory`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalres),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingupdate(false);
        setmodalupdate(false);
        if (res2.success) {
          notification["success"]({
            message: "Item berhasil diubah",
            duration: 3,
          });
          rt.push(`/items/detail/${itemid}`);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  //useEffect
  /**
   * An effect to:
   * 1. Fetch default fields value from this specific item (refer to [itemId])
   * 2. Set whether the "Serial Number" input field is required or not
   */
  useEffect(() => {
    const cancelLoading = () => {
      setpraloading(false);
      return;
    };

    if (!isAllowedToUpdateInventory) {
      permissionWarningNotification("Memperbarui", "Item");
      return cancelLoading();
    }

    if (!isAllowedToGetInventory) {
      permissionWarningNotification("Mendapatkan", "Detail Item");
      return cancelLoading();
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getInventory?id=${itemid}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        var t = {};
        for (var prop in res2.data) {
          if (prop === "additional_attributes") {
            t[prop] = res2.data[prop].map((doc, idx) => {
              if (
                doc.data_type === "dropdown" ||
                doc.data_type === "checkbox"
              ) {
                return {
                  ...doc,
                  value: JSON.parse(doc.value),
                };
              } else {
                return { ...doc };
              }
            });
          } else {
            t[prop] = res2.data[prop];

            // cast 0 | 1 into boolean value
            if (prop === "is_consumable") {
              t[prop] = Boolean(res2.data[prop]);
            }
          }
        }

        /** Mapping the data from backend to our "Location" and "Sub Lokasi" input field */
        const inventoryParentLocationId = t.location_inventory.top_parent_id;
        if (inventoryParentLocationId !== null) {
          instanceForm?.setFieldsValue({
            location: inventoryParentLocationId,
          });

          const inventoryLocationRole = t.location_inventory.role;
          /**
           * Role explanation:
           *
           * 2 -> client
           * 3 -> company
           * 4 -> sub
           *
           * We're hitting the `/getSublocations` endpoint if the given role
           *  value is equal to 4.
           */
          if (inventoryLocationRole === 4) {
            setsubloctrigger(inventoryParentLocationId);
          }
        }

        setdisabledfield((prev) => {
          if (
            t.additional_attributes
              .filter((doc) => doc.required)
              .every(
                (docsome) =>
                  docsome.value !== null ||
                  docsome.value !== "" ||
                  docsome.value !== "-" ||
                  docsome.value.default !== "-" ||
                  docsome.value.default.length !== 0
              )
          ) {
            return false;
          } else {
            return true;
          }
        });
        setupdatedata({
          ...t,
          id: Number(itemid),
          inventory_values: [],
          notes: "",
        }); // Set almost all default value of the fields
        setpraloading(false);
        return res2.data.model_id;
      })
      .then((res3) => {
        if (!isAllowedToGetModels) {
          return;
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getModels?rows=50`, {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        })
          .then((res) => res.json())
          .then((res2) => {
            // setmodeldata(res2.data.data);
            setsnitem(res2.data.data.serial_number === null ? false : true); // set whether the Serial Number input field is required or not
          });
      });
  }, [
    isAllowedToUpdateInventory,
    isAllowedToGetInventory,
    isAllowedToGetModels,
  ]);

  /** Fetching data for: Location, Vendor, and Manufacturer input field's data source */
  useEffect(() => {
    if (!isAllowedToUpdateInventory || !isAllowedToGetInventory) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getInventoryRelations`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setinvrelations(res2.data);
      });
  }, [isAllowedToUpdateInventory, isAllowedToGetInventory]);

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div
        className="w-full h-auto grid grid-cols-1 md:grid-cols-4"
        id="createAssetsWrapper"
      >
        <div className=" col-span-1 md:col-span-4 mb-8 p-3">
          <Sticky containerSelectorFocus="#createAgentsWrapper">
            <div className=" col-span-4 flex justify-between pt-4 border-t-2 border-b-2 bg-white">
              <h1 className="font-bold text-xl py-2">
                Form Ubah Item - {updatedata.mig_id} -{" "}
                {updatedata.model_inventory?.name}
              </h1>
              <div className="flex space-x-2">
                <Link href={`/items/detail/${itemid}`} legacyBehavior>
                  <Button
                    type="default" /*onClick={() => { console.log(updatedata); console.log(disabledfield) }}*/
                  >
                    Batal
                  </Button>
                </Link>
                <Button
                  disabled={disabledfield || !isAllowedToUpdateInventory}
                  type="primary"
                  onClick={() => {
                    instanceForm.submit();
                  }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </Sticky>
        </div>
        <AccessControl hasPermission={INVENTORY_UPDATE}>
          <div className="col-span-1 md:col-span-4 mb-6 py-3 px-12">
            <div className="shadow-md border p-5 flex flex-col rounded-md">
              {praloading ? (
                <Spin />
              ) : (
                <Form
                  form={instanceForm}
                  layout="vertical"
                  onFinish={() => {
                    setmodalupdate(true);
                  }}
                  initialValues={updatedata}
                >
                  {/* <Form.Item name="model_id" label="Nama Model"
                                          rules={[
                                              {
                                                  required: true,
                                                  message: 'Model wajib dipilih',
                                              },
                                          ]}>
                                          <Select disabled defaultValue={updatedata.model_id}>
                                              {
                                                  modeldata.map((doc, idx) => (
                                                      <Select.Option value={doc.id}>{doc.name}</Select.Option>
                                                  ))
                                              }
                                          </Select>
                                      </Form.Item> */}
                  <Form.Item
                    name="model_id"
                    label={
                      <div className="flex">
                        <span className="judulModel"></span>
                        <p className="mb-0 ml-1">Nama Model</p>
                        <style jsx>
                          {`
                                              .judulModel::before{
                                                  content: '*';
                                                  color: red;
                                              }
                                          `}
                        </style>
                      </div>
                    }
                  >
                    <div className="w-full rounded-sm flex items-center bg-gray-100 border p-2 h-8">
                      {updatedata.model_inventory?.name}
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="model_id"
                    label={
                      <div className="flex">
                        <span className="judulField"></span>
                        <p className="mb-0 ml-1">Asset Type</p>
                        <style jsx>
                          {`
                                              .judulField::before{
                                                  content: '*';
                                                  color: red;
                                              }
                                          `}
                        </style>
                      </div>
                    }
                  >
                    <div className="w-full rounded-sm flex items-center bg-gray-100 border p-2 h-8">
                      {updatedata.model_inventory?.asset.name}
                    </div>
                  </Form.Item>
                  {/* <Form.Item name="inventory_name" label="Nama Item"
                                          rules={[
                                              {
                                                  required: true,
                                                  message: 'Nama Item wajib diisi',
                                              },
                                          ]}>
                                          <Input name="inventory_name" defaultValue={updatedata.inventory_name} onChange={(e) => { setupdatedata({ ...updatedata, inventory_name: e.target.value }) }} />
                                      </Form.Item> */}
                  <Form.Item
                    name="mig_id"
                    label="MIG ID"
                    rules={[
                      {
                        required: true,
                        message: "MIG ID wajib diisi",
                      },
                    ]}
                  >
                    <Input
                      disabled
                      name="mig_id"
                      defaultValue={updatedata.mig_id}
                      onChange={(e) => {
                        setupdatedata({
                          ...updatedata,
                          mig_id: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="status_condition"
                    label="Kondisi"
                    rules={[
                      {
                        required: true,
                        message: "Kondisi wajib dipilih",
                      },
                    ]}
                  >
                    <Select
                      disabled
                      defaultValue={updatedata.status_condition}
                      onChange={(value) => {
                        setupdatedata({
                          ...updatedata,
                          status_condition: value,
                        });
                      }}
                    >
                      <Select.Option value={1}>
                        <div className="p-1 flex w-full items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                          <p className="mb-0">Good</p>
                        </div>
                      </Select.Option>
                      <Select.Option value={2}>
                        <div className="p-1 flex w-full items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                          <p className="mb-0">Grey</p>
                        </div>
                      </Select.Option>
                      <Select.Option value={3}>
                        <div className="p-1 flex w-full items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                          <p className="mb-0">Bad</p>
                        </div>
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="status_usage"
                    label="Status Pemakaian"
                    rules={[
                      {
                        required: true,
                        message: "Status Pemakaian wajib dipilih",
                      },
                    ]}
                  >
                    <Select
                      disabled
                      defaultValue={updatedata.status_usage}
                      onChange={(value) => {
                        setupdatedata({ ...updatedata, status_usage: value });
                      }}
                    >
                      <Select.Option value={1}>In Used</Select.Option>
                      <Select.Option value={2}>In Stock</Select.Option>
                      <Select.Option value={3}>Replacement</Select.Option>
                    </Select>
                  </Form.Item>
                  {snitem ? (
                    <Form.Item
                      name="serial_number"
                      label="Serial Number"
                      rules={[
                        {
                          required: true,
                          message: "Serial Number wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        defaultValue={updatedata.serial_number}
                        name="serial_number"
                        onChange={(e) => {
                          setupdatedata({
                            ...updatedata,
                            serial_number: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item name="serial_number" label="Serial Number">
                      <Input
                        defaultValue={updatedata.serial_number}
                        name="serial_number"
                        onChange={(e) => {
                          setupdatedata({
                            ...updatedata,
                            serial_number: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  )}
                  <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: "Lokasi wajib diisi!" }]}
                  >
                    <TreeSelect
                      treeDefaultExpandedKeys={[
                        invrelations.tree_companies.key,
                      ]}
                      placeholder="Pilih Location"
                      treeData={[invrelations.tree_companies]}
                      onChange={(value) => {
                        setupdatedata({ ...updatedata, location: value });
                        setsubloctrigger(value);
                      }}
                      showSearch
                      treeNodeFilterProp="title"
                      filterTreeNode={(search, item) => {
                        /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
                        /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
                        return (
                          item.title
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) >= 0
                        );
                      }}
                    ></TreeSelect>
                  </Form.Item>
                  {updatedata.location !== null && (
                    <Form.Item name="sublocation" label="Sub Lokasi">
                      <TreeSelect
                        allowClear
                        // disabled={disabledfielditem}
                        placeholder="Pilih Location"
                        treeData={sublocdata}
                        onChange={(value) => {
                          if (typeof value === "undefined") {
                            setupdatedata({
                              ...updatedata,
                              location: updatedata.sub_location,
                            });
                          } else {
                            setupdatedata({ ...updatedata, location: value });
                          }
                        }}
                        showSearch
                        treeNodeFilterProp="title"
                        filterTreeNode={(search, item) => {
                          /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
                          /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
                          return (
                            item.title
                              .toLowerCase()
                              .indexOf(search.toLowerCase()) >= 0
                          );
                        }}
                      ></TreeSelect>
                    </Form.Item>
                  )}
                  <Form.Item name="owned_by" label="Owned By">
                    <Select
                      showSearch
                      filterOption={(input, opt) =>
                        opt.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      notFoundContent={
                        isFetchingOwnerList ? <Spin size="small" /> : undefined
                      }
                      placeholder="Pilih Owner"
                      onChange={(value) => {
                        if (typeof value === "number") {
                          setupdatedata((prev) => ({
                            ...prev,
                            owned_by: value,
                          }));
                        }
                      }}
                      onDropdownVisibleChange={(isOpen) => {
                        if (isOpen) {
                          fetchCompanyClientList();
                        }
                      }}
                    >
                      {ownerList.map((user) => (
                        <Select.Option value={user.id}>
                          {user.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="vendor_id" label="Vendor">
                    <Select
                      defaultValue={updatedata.vendor_id}
                      onChange={(value) => {
                        setupdatedata({ ...updatedata, vendor_id: value });
                      }}
                    >
                      {invrelations.vendors.map((doc, idx) => {
                        return (
                          <Select.Option value={doc.id}>
                            {doc.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name="manufacturer_id" label="Manufacturer">
                    <Select
                      defaultValue={updatedata.manufacturer_id}
                      placeholder="Pilih Manufacturer"
                      onChange={(value) => {
                        setupdatedata({
                          ...updatedata,
                          manufacturer_id: value,
                        });
                      }}
                    >
                      {invrelations.manufacturers
                        .filter((docfil) => docfil.deleted_at === null)
                        .map((doc, idx) => {
                          return (
                            <Select.Option value={doc.id}>
                              {doc.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item name="deskripsi" label="Deskripsi">
                    <Input.TextArea
                      defaultValue={updatedata.deskripsi}
                      rows={4}
                      name="deskripsi"
                      onChange={(e) => {
                        setupdatedata({
                          ...updatedata,
                          deskripsi: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  {updatedata.is_consumable && (
                    <Form.Item
                      name="quantity"
                      label="Jumlah Barang"
                      rules={[
                        {
                          required: true,
                          message: "Jumlah Barang wajib diisi!",
                        },
                      ]}
                    >
                      <InputNumber
                        defaultValue={updatedata.quantities[0]?.quantity || 0}
                        style={{ width: `100%` }}
                        disabled
                        rows={4}
                        name="quantity"
                        onChange={(value) => {
                          setupdatedata(() => {
                            const previousData = { ...updatedata };
                            const quantityElementData =
                              previousData.quantities[0];

                            if (quantityElementData) {
                              previousData.quantities[0] = {
                                ...quantityElementData,
                                quantity: value,
                              };
                            }

                            return previousData;
                          });
                        }}
                      />
                    </Form.Item>
                  )}
                </Form>
              )}
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 mb-6 py-3 px-12">
            <div className="mb-3">
              <h1 className="font-bold text-xl">Spesifikasi Item</h1>
            </div>
            <div className="shadow-md border p-5 flex flex-col rounded-md">
              {praloading ? (
                <Spin />
              ) : (
                <>
                  {updatedata.additional_attributes.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                  ) : (
                    <Form layout="vertical" form={instanceForm2}>
                      {updatedata.additional_attributes.map(
                        (docinvvalue, idxinvvalue) => {
                          if (docinvvalue.required) {
                            return (
                              <Form.Item
                                name={docinvvalue.name}
                                label={
                                  <div className="flex">
                                    <span className="judulField"></span>
                                    <p className="mb-0 ml-1">
                                      {docinvvalue.name}
                                    </p>
                                    <style jsx>
                                      {`
                                                                                  .judulField::before{
                                                                                      content: '*';
                                                                                      color: red;
                                                                                  }
                                                                              `}
                                    </style>
                                  </div>
                                }
                              >
                                <>
                                  {docinvvalue.data_type === "dropdown" && (
                                    <>
                                      <Select
                                        allowClear
                                        defaultValue={docinvvalue.value.default}
                                        style={{
                                          width: `100%`,
                                          borderColor: `red`,
                                        }}
                                        onChange={(value, label) => {
                                          if (typeof value === "undefined") {
                                            setdisabledfield(true);
                                          } else {
                                            setdisabledfield(false);
                                            setupdatedata((prev) => {
                                              var temp = prev;
                                              const idxfield =
                                                temp.inventory_values
                                                  .map((docname) => docname.id)
                                                  .indexOf(docinvvalue.id);
                                              if (idxfield === -1) {
                                                temp.inventory_values.push({
                                                  id: docinvvalue.id,
                                                  data_type:
                                                    docinvvalue.data_type,
                                                  value: {
                                                    default: value,
                                                    opsi: docinvvalue.value
                                                      .opsi,
                                                  },
                                                });
                                              } else {
                                                temp.inventory_values[
                                                  idxfield
                                                ] = {
                                                  id: docinvvalue.id,
                                                  data_type:
                                                    docinvvalue.data_type,
                                                  value: {
                                                    default: value,
                                                    opsi: docinvvalue.value
                                                      .opsi,
                                                  },
                                                };
                                              }
                                              return temp;
                                            });
                                          }
                                        }}
                                      >
                                        {docinvvalue.value.opsi.map(
                                          (doc2, idx2) => (
                                            <Select.Option
                                              key={doc2}
                                              value={idx2}
                                            >
                                              {doc2}
                                            </Select.Option>
                                          )
                                        )}
                                      </Select>
                                      {disabledfield ? (
                                        <p className=" text-red-500 mb-0">
                                          {docinvvalue.name} harus dipilih
                                        </p>
                                      ) : null}
                                    </>
                                  )}
                                  {docinvvalue.data_type === "checkbox" && (
                                    <div className="w-full flex flex-col">
                                      {docinvvalue.value.opsi.map(
                                        (doc3, idx3) => {
                                          return (
                                            <div className="flex mb-1">
                                              <Checkbox
                                                defaultChecked={docinvvalue.value.default.includes(
                                                  idx3
                                                )}
                                                style={{
                                                  marginRight: `0.5rem`,
                                                }}
                                                onChange={(e) => {
                                                  if (
                                                    docinvvalue.value.default
                                                      .length === 0
                                                  ) {
                                                    setdisabledfield(true);
                                                  } else {
                                                    setdisabledfield(false);
                                                    setupdatedata((prev) => {
                                                      var temp = prev;
                                                      const idxfield =
                                                        temp.inventory_values
                                                          .map(
                                                            (docname) =>
                                                              docname.id
                                                          )
                                                          .indexOf(
                                                            docinvvalue.id
                                                          );
                                                      if (idxfield === -1) {
                                                        console.log("1");
                                                        if (
                                                          e.target.checked ===
                                                          true
                                                        ) {
                                                          console.log("1.1");
                                                          docinvvalue.value.default.push(
                                                            idx3
                                                          );
                                                          temp.inventory_values.push(
                                                            {
                                                              id: docinvvalue.id,
                                                              data_type:
                                                                docinvvalue.data_type,
                                                              value:
                                                                docinvvalue.value,
                                                            }
                                                          );
                                                        } else {
                                                          console.log("1.2");
                                                          var idxtoremove =
                                                            docinvvalue.value.default.indexOf(
                                                              idx3
                                                            );
                                                          docinvvalue.value.default.splice(
                                                            idxtoremove,
                                                            1
                                                          );
                                                          temp.inventory_values.push(
                                                            {
                                                              id: docinvvalue.id,
                                                              data_type:
                                                                docinvvalue.data_type,
                                                              value:
                                                                docinvvalue.value,
                                                            }
                                                          );
                                                        }
                                                      } else {
                                                        console.log("2");
                                                        if (
                                                          e.target.checked ===
                                                          true
                                                        ) {
                                                          console.log("2.1");
                                                          // temp.inventory_values[idxfield].value.default.push(idx3)
                                                          docinvvalue.value.default.push(
                                                            idx3
                                                          );
                                                          temp.inventory_values[
                                                            idxfield
                                                          ] = {
                                                            id: docinvvalue.id,
                                                            data_type:
                                                              docinvvalue.data_type,
                                                            value:
                                                              docinvvalue.value,
                                                          };
                                                        } else {
                                                          console.log("2.2");
                                                          var idxtoremove =
                                                            temp.inventory_values[
                                                              idxfield
                                                            ].value.default.indexOf(
                                                              idx3
                                                            );
                                                          temp.inventory_values[
                                                            idxfield
                                                          ].value.default.splice(
                                                            idxtoremove,
                                                            1
                                                          );
                                                        }
                                                      }
                                                      return temp;
                                                    });
                                                  }
                                                }}
                                              ></Checkbox>
                                              <p className="mb-0">{doc3}</p>
                                            </div>
                                          );
                                        }
                                      )}
                                      {disabledfield ? (
                                        <p className=" text-red-500 mb-0">
                                          {docinvvalue.name} harus dipilih
                                        </p>
                                      ) : null}
                                    </div>
                                  )}
                                  {docinvvalue.data_type === "date" && (
                                    <>
                                      <DatePicker
                                        /*style={dynamicfielditem[idxinvvalue].value === "" ? { borderColor: `red` } : null}*/ defaultValue={
                                          docinvvalue.value === ""
                                            ? null
                                            : moment(docinvvalue.value)
                                        }
                                        onChange={(date, datestring) => {
                                          if (datestring === "") {
                                            setdisabledfield(true);
                                          } else {
                                            setdisabledfield(false);
                                            setupdatedata((prev) => {
                                              var temp = prev;
                                              const idxfield =
                                                temp.inventory_values
                                                  .map((docname) => docname.id)
                                                  .indexOf(docinvvalue.id);
                                              if (idxfield === -1) {
                                                temp.inventory_values.push({
                                                  id: docinvvalue.id,
                                                  data_type:
                                                    docinvvalue.data_type,
                                                  value:
                                                    datestring === ""
                                                      ? null
                                                      : datestring,
                                                });
                                              } else {
                                                temp.inventory_values[
                                                  idxfield
                                                ].value = datestring;
                                              }
                                              return temp;
                                            });
                                          }
                                        }}
                                      ></DatePicker>
                                      {disabledfield ? (
                                        <p className=" text-red-500 mb-0">
                                          {docinvvalue.name} harus dipilih
                                        </p>
                                      ) : null}
                                    </>
                                  )}
                                  {docinvvalue.data_type === "paragraph" && (
                                    <>
                                      <Input.TextArea
                                        rows={4}
                                        defaultValue={docinvvalue.value}
                                        onChange={(e) => {
                                          if (e.target.value === "") {
                                            setdisabledfield(true);
                                          } else {
                                            setdisabledfield(false);
                                            setupdatedata((prev) => {
                                              var temp = prev;
                                              const idxfield =
                                                temp.inventory_values
                                                  .map((docname) => docname.id)
                                                  .indexOf(docinvvalue.id);
                                              if (idxfield === -1) {
                                                temp.inventory_values.push({
                                                  id: docinvvalue.id,
                                                  data_type:
                                                    docinvvalue.data_type,
                                                  value: e.target.value,
                                                });
                                              } else {
                                                temp.inventory_values[
                                                  idxfield
                                                ].value = e.target.value;
                                              }
                                              return temp;
                                            });
                                          }
                                        }}
                                      ></Input.TextArea>
                                      {disabledfield ? (
                                        <p className=" text-red-500 mb-0">
                                          {docinvvalue.name} harus diisi
                                        </p>
                                      ) : null}
                                    </>
                                  )}
                                  {docinvvalue.data_type === "number" && (
                                    <>
                                      <InputNumber
                                        allowClear
                                        defaultValue={docinvvalue.value}
                                        onChange={(value) => {
                                          if (value === "" || value === null) {
                                            setdisabledfield(true);
                                          } else {
                                            setdisabledfield(false);
                                            setupdatedata((prev) => {
                                              var temp = prev;
                                              const idxfield =
                                                temp.inventory_values
                                                  .map((docname) => docname.id)
                                                  .indexOf(docinvvalue.id);
                                              if (idxfield === -1) {
                                                temp.inventory_values.push({
                                                  id: docinvvalue.id,
                                                  data_type:
                                                    docinvvalue.data_type,
                                                  value:
                                                    value === "" ||
                                                    value === null
                                                      ? ""
                                                      : `${value}`,
                                                });
                                              } else {
                                                temp.inventory_values[
                                                  idxfield
                                                ].value = `${value}`;
                                              }
                                              return temp;
                                            });
                                          }
                                        }}
                                      ></InputNumber>
                                      {disabledfield ? (
                                        <p className=" text-red-500 mb-0">
                                          {docinvvalue.name} harus diisi
                                        </p>
                                      ) : null}
                                    </>
                                  )}
                                  {docinvvalue.data_type === "single" && (
                                    <>
                                      <Input
                                        defaultValue={docinvvalue.value}
                                        onChange={(e) => {
                                          if (e.target.value === "") {
                                            setdisabledfield(true);
                                          } else {
                                            setdisabledfield(false);
                                            setupdatedata((prev) => {
                                              var temp = prev;
                                              const idxfield =
                                                temp.inventory_values
                                                  .map((docname) => docname.id)
                                                  .indexOf(docinvvalue.id);
                                              if (idxfield === -1) {
                                                temp.inventory_values.push({
                                                  id: docinvvalue.id,
                                                  data_type:
                                                    docinvvalue.data_type,
                                                  value: e.target.value,
                                                });
                                              } else {
                                                temp.inventory_values[
                                                  idxfield
                                                ].value = e.target.value;
                                              }
                                              return temp;
                                            });
                                          }
                                        }}
                                      ></Input>
                                      {disabledfield ? (
                                        <p className=" text-red-500 mb-0">
                                          {docinvvalue.name} harus diisi
                                        </p>
                                      ) : null}
                                    </>
                                  )}
                                  {docinvvalue.data_type === "String" && (
                                    <>
                                      <Input
                                        defaultValue={docinvvalue.value}
                                        onChange={(e) => {
                                          if (e.target.value === "") {
                                            setdisabledfield(true);
                                          } else {
                                            setdisabledfield(false);
                                            setupdatedata((prev) => {
                                              var temp = prev;
                                              const idxfield =
                                                temp.inventory_values
                                                  .map((docname) => docname.id)
                                                  .indexOf(docinvvalue.id);
                                              if (idxfield === -1) {
                                                temp.inventory_values.push({
                                                  id: docinvvalue.id,
                                                  data_type:
                                                    docinvvalue.data_type,
                                                  value: e.target.value,
                                                });
                                              } else {
                                                temp.inventory_values[
                                                  idxfield
                                                ].value = e.target.value;
                                              }
                                              return temp;
                                            });
                                          }
                                        }}
                                      ></Input>
                                      {disabledfield ? (
                                        <p className=" text-red-500 mb-0">
                                          {docinvvalue.name} harus diisi
                                        </p>
                                      ) : null}
                                    </>
                                  )}
                                </>
                              </Form.Item>
                            );
                          } else {
                            return (
                              <Form.Item
                                name={docinvvalue.name}
                                label={docinvvalue.name}
                              >
                                <>
                                  {docinvvalue.data_type === "dropdown" && (
                                    <Select
                                      defaultValue={docinvvalue.value.default}
                                      style={{ width: `100%` }}
                                      onChange={(value, label) => {
                                        setupdatedata((prev) => {
                                          var temp = prev;
                                          const idxfield = temp.inventory_values
                                            .map((docname) => docname.id)
                                            .indexOf(docinvvalue.id);
                                          if (idxfield === -1) {
                                            // temp.inventory_values[idxfield].value.default = value
                                            temp.inventory_values.push({
                                              id: docinvvalue.id,
                                              data_type: docinvvalue.data_type,
                                              value: {
                                                default: value,
                                                opsi: docinvvalue.value.opsi,
                                              },
                                            });
                                          } else {
                                            temp.inventory_values[idxfield] = {
                                              id: docinvvalue.id,
                                              data_type: docinvvalue.data_type,
                                              value: {
                                                default: value,
                                                opsi: docinvvalue.value.opsi,
                                              },
                                            };
                                          }
                                          return temp;
                                        });
                                      }}
                                    >
                                      {docinvvalue.value.opsi.map(
                                        (doc2, idx2) => (
                                          <Select.Option
                                            key={doc2}
                                            value={idx2}
                                          >
                                            {doc2}
                                          </Select.Option>
                                        )
                                      )}
                                    </Select>
                                  )}
                                  {docinvvalue.data_type === "checkbox" && (
                                    <div className="w-full flex flex-col">
                                      {docinvvalue.value.opsi.map(
                                        (doc3, idx3) => {
                                          return (
                                            <div className="flex mb-1">
                                              <Checkbox
                                                defaultChecked={docinvvalue.value.default.includes(
                                                  idx3
                                                )}
                                                style={{
                                                  marginRight: `0.5rem`,
                                                }}
                                                onChange={(e) => {
                                                  setupdatedata((prev) => {
                                                    var temp = prev;
                                                    const idxfield =
                                                      temp.inventory_values
                                                        .map(
                                                          (docname) =>
                                                            docname.id
                                                        )
                                                        .indexOf(
                                                          docinvvalue.id
                                                        );
                                                    if (idxfield === -1) {
                                                      console.log("1");
                                                      if (
                                                        e.target.checked ===
                                                        true
                                                      ) {
                                                        console.log("1.1");
                                                        docinvvalue.value.default.push(
                                                          idx3
                                                        );
                                                        temp.inventory_values.push(
                                                          {
                                                            id: docinvvalue.id,
                                                            data_type:
                                                              docinvvalue.data_type,
                                                            value:
                                                              docinvvalue.value,
                                                          }
                                                        );
                                                      } else {
                                                        console.log("1.2");
                                                        var idxtoremove =
                                                          docinvvalue.value.default.indexOf(
                                                            idx3
                                                          );
                                                        docinvvalue.value.default.splice(
                                                          idxtoremove,
                                                          1
                                                        );
                                                        temp.inventory_values.push(
                                                          {
                                                            id: docinvvalue.id,
                                                            data_type:
                                                              docinvvalue.data_type,
                                                            value:
                                                              docinvvalue.value,
                                                          }
                                                        );
                                                      }
                                                    } else {
                                                      console.log("2");
                                                      if (
                                                        e.target.checked ===
                                                        true
                                                      ) {
                                                        console.log("2.1");
                                                        // temp.inventory_values[idxfield].value.default.push(idx3)
                                                        docinvvalue.value.default.push(
                                                          idx3
                                                        );
                                                        temp.inventory_values[
                                                          idxfield
                                                        ] = {
                                                          id: docinvvalue.id,
                                                          data_type:
                                                            docinvvalue.data_type,
                                                          value:
                                                            docinvvalue.value,
                                                        };
                                                      } else {
                                                        console.log("2.2");
                                                        var idxtoremove =
                                                          temp.inventory_values[
                                                            idxfield
                                                          ].value.default.indexOf(
                                                            idx3
                                                          );
                                                        temp.inventory_values[
                                                          idxfield
                                                        ].value.default.splice(
                                                          idxtoremove,
                                                          1
                                                        );
                                                      }
                                                    }
                                                    return temp;
                                                  });
                                                }}
                                              ></Checkbox>
                                              <p className="mb-0">{doc3}</p>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  )}
                                  {docinvvalue.data_type === "date" && (
                                    <DatePicker
                                      defaultValue={
                                        docinvvalue.value === ""
                                          ? null
                                          : moment(docinvvalue.value)
                                      }
                                      onChange={(date, datestring) => {
                                        console.log(datestring);
                                        setupdatedata((prev) => {
                                          var temp = prev;
                                          const idxfield = temp.inventory_values
                                            .map((docname) => docname.id)
                                            .indexOf(docinvvalue.id);
                                          if (idxfield === -1) {
                                            temp.inventory_values.push({
                                              id: docinvvalue.id,
                                              data_type: docinvvalue.data_type,
                                              value:
                                                datestring === ""
                                                  ? null
                                                  : datestring,
                                            });
                                          } else {
                                            temp.inventory_values[
                                              idxfield
                                            ].value = datestring;
                                          }
                                          return temp;
                                        });
                                      }}
                                    ></DatePicker>
                                  )}
                                  {docinvvalue.data_type === "paragraph" && (
                                    <Input.TextArea
                                      rows={4}
                                      defaultValue={docinvvalue.value}
                                      onChange={(e) => {
                                        setupdatedata((prev) => {
                                          var temp = prev;
                                          const idxfield = temp.inventory_values
                                            .map((docname) => docname.id)
                                            .indexOf(docinvvalue.id);
                                          if (idxfield === -1) {
                                            temp.inventory_values.push({
                                              id: docinvvalue.id,
                                              data_type: docinvvalue.data_type,
                                              value: e.target.value,
                                            });
                                          } else {
                                            temp.inventory_values[
                                              idxfield
                                            ].value = e.target.value;
                                          }
                                          return temp;
                                        });
                                      }}
                                    ></Input.TextArea>
                                  )}
                                  {docinvvalue.data_type === "number" && (
                                    <InputNumber
                                      defaultValue={docinvvalue.value}
                                      onChange={(value) => {
                                        setupdatedata((prev) => {
                                          var temp = prev;
                                          const idxfield = temp.inventory_values
                                            .map((docname) => docname.id)
                                            .indexOf(docinvvalue.id);
                                          if (idxfield === -1) {
                                            temp.inventory_values.push({
                                              id: docinvvalue.id,
                                              data_type: docinvvalue.data_type,
                                              value: `${value}`,
                                            });
                                          } else {
                                            temp.inventory_values[
                                              idxfield
                                            ].value = `${value}`;
                                          }
                                          return temp;
                                        });
                                      }}
                                    ></InputNumber>
                                  )}
                                  {docinvvalue.data_type === "single" && (
                                    <Input
                                      defaultValue={docinvvalue.value}
                                      onChange={(e) => {
                                        setupdatedata((prev) => {
                                          var temp = prev;
                                          const idxfield = temp.inventory_values
                                            .map((docname) => docname.id)
                                            .indexOf(docinvvalue.id);
                                          if (idxfield === -1) {
                                            temp.inventory_values.push({
                                              id: docinvvalue.id,
                                              data_type: docinvvalue.data_type,
                                              value: e.target.value,
                                            });
                                          } else {
                                            temp.inventory_values[
                                              idxfield
                                            ].value = e.target.value;
                                          }
                                          return temp;
                                        });
                                      }}
                                    ></Input>
                                  )}
                                  {docinvvalue.data_type === "String" && (
                                    <Input
                                      defaultValue={docinvvalue.value}
                                      onChange={(e) => {
                                        setupdatedata((prev) => {
                                          var temp = prev;
                                          const idxfield = temp.inventory_values
                                            .map((docname) => docname.id)
                                            .indexOf(docinvvalue.id);
                                          if (idxfield === -1) {
                                            temp.inventory_values.push({
                                              id: docinvvalue.id,
                                              data_type: docinvvalue.data_type,
                                              value: e.target.value,
                                            });
                                          } else {
                                            temp.inventory_values[
                                              idxfield
                                            ].value = e.target.value;
                                          }
                                          return temp;
                                        });
                                      }}
                                    ></Input>
                                  )}
                                </>
                              </Form.Item>
                            );
                          }
                        }
                      )}
                    </Form>
                  )}
                </>
              )}
            </div>
          </div>
          <Modal
            title={
              <h1 className="font-semibold">
                Apakah anda yakin ingin mengubah item "
                {updatedata?.model_inventory?.name}"?
              </h1>
            }
            visible={modalupdate}
            onCancel={() => {
              setmodalupdate(false);
            }}
            okText="Ya"
            cancelText="Tidak"
            onOk={handleUpdateItem}
            okButtonProps={{ loading: loadingupdate }}
          >
            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="mb-0">Notes</p>
                <Input
                  placeholder="Masukkan Notes"
                  onChange={(e) => {
                    setupdatedata((prev) => {
                      var temp = prev;
                      temp.notes = e.target.value;
                      return temp;
                    });
                  }}
                ></Input>
              </div>
            </div>
          </Modal>
        </AccessControl>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const itemid = params.itemId;
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "3",
      itemid,
    },
  };
}

export default ItemUpdate;
