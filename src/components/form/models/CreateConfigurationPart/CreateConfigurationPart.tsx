import {
  CalendarOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  PlusSquareTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Collapse,
  Form,
  InputNumber,
  Popconfirm,
  Select,
  Spin,
  Timeline,
} from "antd";
import { FC, useState } from "react";

import { useBulkConfigurationModelParts, useModels } from ".";

const { Panel } = Collapse;

export interface ICreateConfigurationPart {
  isAllowedToEditPart?: boolean;
  editPartIsEnabled?: boolean;
}

export const CreateConfigurationPart: FC<ICreateConfigurationPart> = ({
  isAllowedToEditPart = false,
  editPartIsEnabled = false,
}) => {
  const { models, refetchModels, isLoading: isFetchingModels } = useModels();
  const {
    modelParts,
    currentModelPartQuantity,
    setCurrentModelPartQuantity,
    resetCurrentModelPart,
    updateCurrentModelPart,
    updateModelParts,
  } = useBulkConfigurationModelParts();

  const [isInputPartShown, setIsInputPartShown] = useState(false);

  const closeInputPart = () => {
    setIsInputPartShown(false);
    resetCurrentModelPart();
  };

  const onSearchHandler = (searchValue: string) => {
    refetchModels({ rows: 10, name: searchValue });
  };

  const onTambahButtonClicked = () => {
    /**
     * The order is important.
     * - Trigger `updateModalPart()` first. Then close the input part form.
     */
    updateModelParts();
    closeInputPart();

    /**
     * Reset our models select options.
     */
    refetchModels();
  };

  return (
    <div className="mb-8 col-span-1 md:col-span-4 px-5 flex flex-col bg-red-400 space-y-5">
      <div className="mb-5">
        <h1 className="font-bold text-xl">Konfigurasi Part Model</h1>
      </div>

      {isInputPartShown && (
        <div className="shadow-md border p-8 flex flex-col rounded-md relative bg-green-400">
          <button
            className="absolute top-2 right-5 text-lg cursor-pointer bg-white/0"
            onClick={closeInputPart}
          >
            x
          </button>

          <Form layout="vertical" className="bg-red-200">
            <div className="flex mb-2 space-x-4">
              <div className="w-2/3">
                <Form.Item
                  name="id"
                  label="Nama Model"
                  rules={[
                    {
                      required: true,
                      message: "Nama Model wajib diisi",
                    },
                  ]}
                >
                  <Select
                    notFoundContent={
                      isFetchingModels ? <Spin size="small" /> : null
                    }
                    onSearch={onSearchHandler}
                    showSearch
                    optionFilterProp="children"
                    placeholder="Cari nama modul"
                    onChange={(value) => {
                      updateCurrentModelPart(value);
                    }}
                    filterOption={(input, opt) => {
                      console.log("Select.filterOption: ", input, opt);

                      return true;

                      // return opt.children
                      //   .toLowerCase()
                      //   .indexOf(input.toLowerCase()) >= 0
                    }}
                  >
                    {models.map((doc) => (
                      <Select.Option key={doc.id} value={doc.id}>
                        {doc.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="w-1/3 flex items-center space-x-4">
                <label htmlFor="part-quantity">Jumlah</label>

                <div className="flex w-full justify-end space-x-4">
                  <InputNumber
                    id="part-quantity"
                    min={0}
                    value={currentModelPartQuantity}
                    onChange={(value) => setCurrentModelPartQuantity(value)}
                  />

                  <button
                    className="cursor-pointer bg-white/0"
                    onClick={() => {
                      console.log("setModalCreateModel(true)");
                      // setmodalcreatemodel(true);
                    }}
                  >
                    <PlusSquareTwoTone style={{ fontSize: `1.5rem` }} />
                  </button>
                </div>
              </div>
            </div>

            <hr />

            <div className="flex mt-4 justify-end">
              <button
                className="flex items-center mr-4 hover:text-red-500 cursor-pointer bg-white/0"
                onClick={closeInputPart}
              >
                <DeleteOutlined
                  style={{ fontSize: `1.25rem` }}
                ></DeleteOutlined>
              </button>

              <Button
                // loading={loadinggetmodel}
                type="primary"
                onClick={() => {
                  console.log("Button(Tambah) is currently disabled...");
                  onTambahButtonClicked();

                  // seteditpart(false);
                  // setloadinggetmodel(true);
                  // fetch(
                  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/getModel?id=${currentidmodel}`,
                  //   {
                  //     method: `GET`,
                  //     headers: {
                  //       Authorization: JSON.parse(initProps),
                  //     },
                  //   }
                  // )
                  //   .then((res) => res.json())
                  //   .then((res2) => {
                  //     setmodelpartfielddata((prev) => {
                  //       var temp1 = prev;
                  //       var t = {};
                  //       for (var prop in res2.data) {
                  //         if (prop === "model_columns") {
                  //           t[prop] = res2.data[prop].map(
                  //             (doc, idx) => {
                  //               if (
                  //                 doc.data_type === "dropdown" ||
                  //                 doc.data_type === "checkbox"
                  //               ) {
                  //                 return {
                  //                   ...doc,
                  //                   default: JSON.parse(doc.default),
                  //                 };
                  //               } else {
                  //                 return { ...doc };
                  //               }
                  //             }
                  //           );
                  //         } else {
                  //           t[prop] = res2.data[prop];
                  //         }
                  //       }
                  //       temp1 = [...temp1, t];
                  //       return temp1;
                  //     });
                  //     // setconcatpartvalue(res2.data.model_parts)
                  //     // setconcatparttrigger(prev => !prev)
                  //     setnewdata((prev) => {
                  //       var temp = prev;
                  //       const idxdata2 = temp.model_parts
                  //         .map((doc3) => doc3.id)
                  //         .indexOf(currentidmodel);
                  //       if (
                  //         temp.model_parts.length === 0 ||
                  //         idxdata2 === -1
                  //       ) {
                  //         temp.model_parts.push({
                  //           id: currentidmodel,
                  //           quantity: 1,
                  //         });
                  //       } else if (idxdata2 !== -1) {
                  //         temp.model_parts.map((doc1) => {
                  //           if (doc1.id === currentidmodel) {
                  //             doc1.quantity = doc1.quantity + 1;
                  //           }
                  //         });
                  //       }
                  //       return temp;
                  //     });
                  //     setloadinggetmodel(false);
                  //     setcurrentidmodel("");
                  //   });
                }}
              >
                Tambah
              </Button>
            </div>
          </Form>
        </div>
      )}

      <Button
        disabled={!isAllowedToEditPart || isInputPartShown}
        type="dashed"
        onClick={() => {
          setIsInputPartShown((prev) => !prev);
          // seteditpart(true);
        }}
        className="w-full h-16"
      >
        + Tambah Part Model
      </Button>
    </div>
  );
};
