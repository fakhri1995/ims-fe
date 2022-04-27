import { CalendarOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Checkbox, Collapse, Popconfirm, Timeline } from "antd";
import type { FC, ReactNode } from "react";

import type { GetModelData } from "apis/asset";

const { Panel } = Collapse;

export interface IModelPartAccordionList {
  /** Data untuk menampilkan part-part yang telah ditambahkan oleh User */
  modelPartData: GetModelData[];

  /**
   * @param {modelId} number adalah id dari object `GetModelData`. Digunakan untuk menghapus record dari `modelParts` yang mana berisi { [id]: quantity }.
   * @param {modelPartDataIndex} number adalah index model part dari array pada state `modelPartData`. Digunakan untuk remove item tersebut dari accordion list.
   */
  onDeleteModelPartItem: (modelId: number, modelPartDataIndex: number) => void;

  renderChildPartModel: (children: any) => ReactNode;
}

/**
 * ModelPartAccordionList adalah komponen yang menampilkan daftar model part data (refer to `modelPartData`) dengan tampilan
 * collapsible accordion.
 */
export const ModelPartAccordionList: FC<IModelPartAccordionList> = ({
  modelPartData,
  onDeleteModelPartItem,
  renderChildPartModel,
}) => {
  /** Do not render anything if the data is empty */
  if (modelPartData.length === 0) {
    return null;
  }

  return (
    <Collapse accordion>
      {modelPartData.map((doc, idx) => {
        return (
          <Panel
            id={`panel${idx}`}
            key={idx}
            header={<strong>{doc.name}</strong>}
            extra={
              <div className="flex">
                <Popconfirm
                  placement="bottom"
                  title={`Apakah anda yakin ingin menghapus Model ini?`}
                  // title={`Apakah anda yakin ingin menghapus Model ${
                  //   doc.name === "" ? "ini" : doc.name
                  // } dari Model Part ${newdata.name}?`}
                  okText="Ya"
                  cancelText="Tidak"
                  onConfirm={() => {
                    onDeleteModelPartItem(doc.id, idx);
                    // setModelPartData((prev) =>
                    //   prev.filter((_, _idx) => _idx !== idx)
                    // );

                    // setModelParts((prev) => {
                    //   const targetModelId = doc.id;
                    //   if (!(targetModelId in prev)) {
                    //     return prev;
                    //   }

                    //   const mutatedPrevState = { ...prev };
                    //   delete mutatedPrevState[targetModelId];

                    //   return mutatedPrevState;
                    // });

                    // closeInputPart();

                    // setnewdata((prev) => {
                    //   var temp = prev;
                    //   const idxdata = temp.model_parts
                    //     .map((doc2) => doc2.id)
                    //     .indexOf(doc.id);

                    //   if (temp.model_parts[idxdata].quantity > 1) {
                    //     temp.model_parts[idxdata].quantity -= 1;
                    //   } else {
                    //     temp.model_parts.splice(idxdata, 1);
                    //   }
                    //   return temp;
                    // });
                  }}
                >
                  <CloseCircleOutlined style={{ color: `red` }} />
                </Popconfirm>
              </div>
            }
          >
            <div className="flex flex-col p-3">
              <div className="flex flex-col mb-5">
                <h1 className="font-semibold mb-1">
                  Asset Type <span className="judulassettype"></span>
                </h1>
                <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                  <p className="mb-0 text-sm">{doc.asset.name}</p>
                </div>
              </div>
              {doc.model_columns.map((docmc, idxmc) => {
                return (
                  <div className="flex flex-col mb-5" key={idxmc}>
                    <h1 className="font-semibold mb-1">
                      {docmc.name}{" "}
                      {docmc.required ? (
                        <span className="judulsn"></span>
                      ) : null}{" "}
                      <span className="text-gray-400">
                        (
                        {docmc.data_type === "single"
                          ? "Single Textbox"
                          : docmc.data_type.charAt(0).toUpperCase() +
                            docmc.data_type.slice(1)}
                        {docmc.data_type === "paragraph" && ` Text`})
                      </span>
                    </h1>
                    <div className="w-full flex flex-col justify-center my-auto px-2 py-1">
                      {docmc.data_type === "dropdown" ||
                      docmc.data_type === "checkbox" ||
                      docmc.data_type === "paragraph" ||
                      docmc.data_type === "date" ? (
                        <>
                          {docmc.data_type === "dropdown" && (
                            <>
                              {/* {docmc.default.opsi.map( */}
                              {docmc.default["opsi"].map((docopsi, idxopsi) => (
                                <div
                                  key={idxopsi}
                                  className="rounded bg-white border w-3/12 flex items-center my-auto px-2 py-1 mb-1"
                                >
                                  <Checkbox
                                    disabled
                                    checked={
                                      // idxopsi === docmc.default.default
                                      idxopsi === docmc.default["default"]
                                    }
                                    style={{
                                      marginRight: `0.5rem`,
                                    }}
                                  />
                                  {docopsi}
                                </div>
                              ))}
                            </>
                          )}
                          {docmc.data_type === "checkbox" && (
                            <>
                              {/* {docmc.default.opsi.map( */}
                              {docmc.default["opsi"].map((docopsi, idxopsi) => (
                                <div
                                  key={idxopsi}
                                  className="rounded w-full flex items-center my-auto px-2 py-1 mb-1"
                                >
                                  <Checkbox
                                    disabled
                                    checked={
                                      // idxopsi === docmc.default.default
                                      idxopsi === docmc.default["default"]
                                    }
                                    style={{
                                      marginRight: `0.5rem`,
                                    }}
                                  />
                                  {docopsi}
                                </div>
                              ))}
                            </>
                          )}
                          {docmc.data_type === "date" && (
                            <div className="flex w-full items-center bg-gray-100 justify-between rounded h-10 px-3">
                              <p className="mb-0">{docmc.default}</p>
                              <div>
                                <CalendarOutlined></CalendarOutlined>
                              </div>
                            </div>
                          )}
                          {docmc.data_type === "paragraph" && (
                            <div className="flex h-20 rounded border bg-gray-100 w-full px-3">
                              {docmc.default}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="rounded border bg-gray-100 flex items-center w-full h-10 px-3">
                          {docmc.default}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {doc.model_parts.length === 0 ? null : (
                <Timeline style={{ marginTop: `1rem` }}>
                  {renderChildPartModel(doc.model_parts)}
                </Timeline>
              )}
            </div>
            <style jsx>
              {`
                                              .judulassettype::before{
                                                  content: '*';
                                                  color: red;
                                              }
                                              .judulsn::before{
                                                  content: '*';
                                                  color: red;
                                              }
                                          `}
            </style>
          </Panel>
        );
      })}
    </Collapse>
  );
};
