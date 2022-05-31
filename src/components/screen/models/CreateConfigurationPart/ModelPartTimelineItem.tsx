import { CalendarOutlined } from "@ant-design/icons";
import { Checkbox, Collapse, Select, Timeline } from "antd";
import { FC } from "react";

const { Panel } = Collapse;

/**
 * ModelPartTimelineItem adalah subkomponen dari komponen ModelPartAccordionList.
 *
 * @see {ModelPartAccordionList}
 */
export const ModelPartTimelineItem: FC<any> = ({ doc, idx }) => {
  return (
    <Timeline.Item>
      <Collapse accordion>
        <Panel key={idx} header={doc.name}>
          <div className="flex flex-col p-3">
            {/* <div className="flex flex-col mb-5">
                                    <h1 className="font-semibold mb-1">Quantity <span className="judulsn"></span></h1>
                                    <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                                        <p className="mb-0 text-sm">{doc.quantity}</p>
                                    </div>
                                </div> */}
            {doc.model_columns.map((docmc2, idx) => {
              var default2 = {};
              if (
                docmc2.data_type === "dropdown" ||
                docmc2.data_type === "checkbox"
              ) {
                default2 = JSON.parse(docmc2.default);
              }
              return (
                <div className="flex flex-col mb-5">
                  <h1 className="font-semibold mb-1">
                    {docmc2.name}{" "}
                    {docmc2.required ? <span className="judulsn"></span> : null}{" "}
                    <span className="text-gray-400">
                      (
                      {docmc2.data_type === "single"
                        ? "Single Textbox"
                        : docmc2.data_type.charAt(0).toUpperCase() +
                          docmc2.data_type.slice(1)}
                      {docmc2.data_type === "paragraph" && ` Text`})
                    </span>
                  </h1>
                  <div className="w-full flex items-center my-auto px-2">
                    {docmc2.data_type === "dropdown" ||
                    docmc2.data_type === "checkbox" ||
                    docmc2.data_type === "date" ||
                    docmc2.data_type === "paragraph" ? (
                      <>
                        {docmc2.data_type === "dropdown" && (
                          <Select
                            disabled
                            style={{
                              width: `100%`,
                              backgroundColor: `rgba(229, 231, 235,1)`,
                              color: `rgba(229, 231, 235,1)`,
                            }}
                          >
                            {default2["opsi"].map((doc2, idx2) => (
                              // {default2.opsi.map((doc2, idx2) => (
                              <Select.Option disabled value={idx2}>
                                {doc2}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                        {docmc2.data_type === "checkbox" && (
                          <div className="w-full flex flex-col">
                            {default2["opsi"].map((doc3, idx3) => (
                              // {default2.opsi.map((doc3, idx3) => (
                              <div className="flex mb-1">
                                <Checkbox
                                  disabled
                                  style={{ marginRight: `0.5rem` }}
                                ></Checkbox>
                                <p className="mb-0">{doc3}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {docmc2.data_type === "date" && (
                          <div className="flex w-full items-center justify-between rounded bg-gray-100 h-10 px-3">
                            <p className="mb-0">{docmc2.default}</p>
                            <div>
                              <CalendarOutlined></CalendarOutlined>
                            </div>
                          </div>
                        )}
                        {docmc2.data_type === "paragraph" && (
                          <div className="flex h-20 rounded border bg-gray-100 w-full px-3">
                            {docmc2.default}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="rounded border bg-gray-100 flex items-center w-full h-10 px-3">
                        {docmc2.default}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {doc.model_parts.length > 0 &&
              renderChildPartModel(doc.model_parts)}
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
      </Collapse>
    </Timeline.Item>
  );
};

const renderChildPartModel = (item) => {
  return item.map((doc, idx) => {
    return <Children doc={doc}></Children>;
  });
};

const Children = ({ doc }) => {
  return (
    <Timeline.Item>
      <Collapse accordion>
        {
          <Panel header={doc.name} key={doc.name}>
            <div className="flex flex-col p-3">
              {/* <div className="flex flex-col mb-5">
                                  <h1 className="font-semibold mb-1">Quantity <span className="judulsn"></span></h1>
                                  <div className="rounded bg-gray-200 w-full flex items-center my-auto h-12 px-2">
                                      <p className="mb-0 text-sm">{doc.quantity}</p>
                                  </div>
                              </div> */}
              {doc.model_columns.map((docmc2, idx) => {
                var default2 = {} as any;
                if (
                  docmc2.data_type === "dropdown" ||
                  docmc2.data_type === "checkbox"
                ) {
                  default2 = JSON.parse(docmc2.default);
                }

                return (
                  <div className="flex flex-col mb-5">
                    <h1 className="font-semibold mb-1">
                      {docmc2.name}{" "}
                      {docmc2.required ? (
                        <span className="judulsn"></span>
                      ) : null}{" "}
                      <span className="text-gray-400">
                        (
                        {docmc2.data_type === "single"
                          ? "Single Textbox"
                          : docmc2.data_type.charAt(0).toUpperCase() +
                            docmc2.data_type.slice(1)}
                        {docmc2.data_type === "paragraph" && ` Text`})
                      </span>
                    </h1>
                    <div className="w-full flex items-center my-auto px-2">
                      {docmc2.data_type === "dropdown" ||
                      docmc2.data_type === "checkbox" ||
                      docmc2.data_type === "date" ||
                      docmc2.data_type === "paragraph" ? (
                        <>
                          {docmc2.data_type === "dropdown" && (
                            <Select
                              disabled
                              style={{
                                width: `100%`,
                                backgroundColor: `rgba(229, 231, 235,1)`,
                                color: `rgba(229, 231, 235,1)`,
                              }}
                            >
                              {default2.opsi?.map((doc2, idx2) => (
                                <Select.Option disabled value={idx2}>
                                  {doc2}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                          {docmc2.data_type === "checkbox" && (
                            <div className="w-full flex flex-col">
                              {default2.opsi?.map((doc3, idx3) => (
                                <div className="flex mb-1">
                                  <Checkbox
                                    disabled
                                    style={{ marginRight: `0.5rem` }}
                                  ></Checkbox>
                                  <p className="mb-0">{doc3}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          {docmc2.data_type === "date" && (
                            <div className="flex w-full items-center justify-between rounded bg-gray-100 h-10 px-3">
                              <p className="mb-0">{docmc2.default}</p>
                              <div>
                                <CalendarOutlined></CalendarOutlined>
                              </div>
                            </div>
                          )}
                          {docmc2.data_type === "paragraph" && (
                            <div className="flex h-20 rounded border bg-gray-100 w-full px-3">
                              {docmc2.default}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="rounded border bg-gray-100 flex items-center w-full h-10 px-3">
                          {docmc2.default}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {doc.model_parts.length > 0 &&
                renderChildPartModel(doc.model_parts)}
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
        }
      </Collapse>
    </Timeline.Item>
  );
};
