import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import {
  Button,
  Form,
  Input,
  Select,
  TreeSelect,
  Upload,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import dynamic from "next/dynamic";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Sticky from "wil-react-sticky";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { COMPANY_CLIENTS_GET, REQUESTER_ADD, ROLES_GET } from "lib/features";
import { getBase64 } from "lib/helper";

import { RequesterService } from "apis/user";

import CustomTextEditor from "../../../../components/CustomTextEditor";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import RichText from "../../../../components/migwebsite/RichText";
import { objectToFormData } from "../../../../lib/helper";
import httpcookie from "cookie";

// function modifData(dataa) {
//   for (var i = 0; i < dataa.length; i++) {
//     dataa[i]["key"] = dataa[i].id;
//     dataa[i]["value"] = dataa[i].id;
//     dataa[i]["title"] = dataa[i].name;
//     dataa[i]["children"] = dataa[i].members;
//     delete dataa[i].members;
//     if (dataa[i].children) [modifData(dataa[i].children)];
//   }
//   return dataa;
// }

function BlogCreate({ initProps, dataProfile, sidemenu, dataCompanyList }) {
  /**
   * Dependencies
   */
  // Text Editor Config
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRolesList = hasPermission(ROLES_GET);
  const isAllowedToAddRequester = hasPermission(REQUESTER_ADD);
  const isAllowedToGetClientCompanyList = hasPermission(COMPANY_CLIENTS_GET);

  const axiosClient = useAxiosClient();
  const rt = useRouter();
  const { id: articleId, prevpath } = rt.query;
  const tok = initProps;
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Create";
  // dataCompanyList = dataCompanyList.data.members.filter(data => data.company_id !== 66)
  const [instanceForm] = Form.useForm();

  //useState
  const [artikelBlog, setArtikelBlog] = useState({
    id: null,
    title: "",
    description: "",
    content: "",
    pagePath: "",
    tags: "",
    artikel_image_file: null,
    company_name: "",
    company_image: "",
    company_image_file: null,
    quote: "",
    author: "",
    job_title: "",
    meta_title: "",
    meta_description: "",
    title_id: "",
    description_id: "",
    content_id: "",
    pagePathId: "",
    tagsId: "",
    quoteId: "",
    job_title_id: "",
    meta_title_id: "",
    meta_description_id: "",
  });
  const [articleType, setArticleType] = useState("Customer Stories");
  const [isiArtikel, setisiArtikel] = useState("");
  const [artikelEdit, setArtikelEdit] = useState(null);
  const [loadingupload, setLoadingupload] = useState(false);
  const [loadingcreate, setLoadingcreate] = useState(false);
  const [datacompanylist, setdatacompanylist] = useState([]);
  const [dataraw1, setdataraw1] = useState([]);
  const [praloading, setpraloading] = useState(true);
  const [loadingEmployee, setLoadingEmployee] = useState(false);
  const [refresh, setRefresh] = useState(-1);
  const [language, setLanguage] = useState("English");
  //handleCreateButton

  useEffect(() => {
    if (articleId) {
      setLoadingEmployee(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getArticleDetail?id=${articleId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            if (prevpath === "add") {
            } else {
              instanceForm.setFieldsValue({
                judul: res2.data.title,
                isi: res2.data.description,
              });
              setArtikelBlog({
                judul: res2.data.title,
                isi: res2.data.description,
              });
            }
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingEmployee(false);
        });
    }
  }, [refresh]);

  const handleSetLanguage = (value) => {
    setLanguage(value);
  };

  const handleCreateArticle = () => {
    let dataArticle = "";
    if (articleType == "Customer Stories") {
      dataArticle = {
        id: articleId ? articleId : null,
        title: artikelBlog.title,
        description: artikelBlog.description,
        content: artikelBlog.content,
        page_path: artikelBlog.pagePath,
        tags: artikelBlog.tags,
        company_name: artikelBlog.company_name,
        quote: artikelBlog.quote,
        author: artikelBlog.author,
        job_title: artikelBlog.job_title,
        meta_title: artikelBlog.meta_title,
        meta_description: artikelBlog.meta_description,
        title_id: artikelBlog.title_id,
        description_id: artikelBlog.description_id,
        content_id: artikelBlog.content_id,
        page_path_id: artikelBlog.pagePathId,
        tags_id: artikelBlog.tagsId,
        job_title_id: artikelBlog.job_title_id,
        meta_title_id: artikelBlog.meta_title_id,
        meta_description_id: artikelBlog.meta_description_id,
        attachment: artikelBlog.artikel_image_file,
        company_logo: artikelBlog.company_image_file,
        article_type: articleType,
      };
    } else {
      dataArticle = {
        id: articleId ? articleId : null,
        article_type: articleType,
        title: artikelBlog.title,
        description: artikelBlog.description,
        content: artikelBlog.content,
        page_path: artikelBlog.pagePath,
        tags: artikelBlog.tags,
        company_name: "",
        quote: "",
        author: "",
        job_title: "",
        meta_title: artikelBlog.meta_title,
        meta_description: artikelBlog.meta_description,
        title_id: artikelBlog.title_id,
        description_id: artikelBlog.description_id,
        content_id: artikelBlog.content_id,
        page_path_id: artikelBlog.pagePathId,
        tags_id: artikelBlog.tagsId,
        job_title_id: "",
        meta_title_id: artikelBlog.meta_title_id,
        meta_description_id: artikelBlog.meta_description_id,
        attachment: artikelBlog.artikel_image_file,
        company_logo: artikelBlog.company_image_file,
      };
    }
    console.log("data article ", dataArticle);

    let formData = objectToFormData(dataArticle);
    let url = "";
    if (articleId) {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateArticle`;
    } else {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addArticle`;
    }
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        Accept: "*/*",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          instanceForm.resetFields();
          notification.success({
            message: articleId
              ? "Update Article Success!"
              : "Add Article Success!",
            duration: 3,
          });
          rt.push("/admin/blog");
        } else if (!res2.success) {
          notification["error"]({
            message: articleId
              ? "Update Article Failed!"
              : "Add Article Failed!",
            duration: 5,
          });
        }
      });
  };

  const onChangeCreateArtikel = (e) => {
    setArtikelBlog({
      ...artikelBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeArticleType = (value) => {
    setArticleType(value);
  };

  const onChangeCreatePagePath = (e) => {
    console.log("e berubah ", e);
    setArtikelBlog({
      ...artikelBlog,
      pagePath: e.target.value,
    });
  };

  const onChangeTextDescription = (text) => {
    setArtikelBlog({
      ...artikelBlog,
      description: text,
    });
  };
  const onChangeTextDescriptionId = (text) => {
    setArtikelBlog({
      ...artikelBlog,
      description_id: text,
    });
  };
  const onChangeTextContentQuote = (text) => {
    setArtikelBlog({
      ...artikelBlog,
      quote: text,
    });
  };
  const onChangeTextContentQuoteId = (text) => {
    setArtikelBlog({
      ...artikelBlog,
      quote_id: text,
    });
  };

  const onChangeTextContent = (text) => {
    setArtikelBlog({
      ...artikelBlog,
      content: text,
    });
  };

  const onChangeTextContentId = (text) => {
    setArtikelBlog({
      ...artikelBlog,
      content_id: text,
    });
  };

  const beforeUploadProfileImage = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onChangeProfileImage = async (info) => {
    if (info.file.status === "uploading") {
      setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);

      setArtikelBlog({
        ...artikelBlog,
        artikel_image: base64Data,
        artikel_image_file: blobFile,
      });
    }
  };

  const onChangeCompanyLogo = async (info) => {
    if (info.file.status === "uploading") {
      setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);

      setArtikelBlog({
        ...artikelBlog,
        company_image: base64Data,
        company_image_file: blobFile,
      });
    }
  };
  const uploadButton = (
    <div>
      {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //useEffect

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      st={st}
    >
      <div
        className="w-full h-auto grid grid-cols-1 md:grid-cols-4"
        id="createAgentsWrapper"
      >
        <div className="col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#createAgentsWrapper">
            <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Buat Artikel</h1>
              <div className="flex space-x-2">
                {/* <Link href="/admin/requesters"> */}
                <Button
                  // disabled={praloading}
                  onClick={() => {
                    rt.push(`/admin/requesters`);
                  }}
                  type="default"
                >
                  Batal
                </Button>
                {/* <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button> */}
                {/* </Link> */}
                <Button
                  // disabled={
                  //   praloading ||
                  //   !isAllowedToAddRequester ||
                  //   !isAllowedToGetClientCompanyList
                  // }
                  loading={loadingcreate}
                  onClick={instanceForm.submit}
                  type="primary"
                >
                  {articleId ? "Update" : "Simpan"}
                </Button>
                {/* <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md" onClick={handleCreateAgents}>Save</button> */}
              </div>
            </div>
          </Sticky>
        </div>
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
            <div className="border-b border-black p-4 font-semibold mb-5">
              Artikel
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              {/* <div className="p-3 col-span-1 md:col-span-1">
                <Upload
                  name="profile_image"
                  listType="picture-card"
                  className="profileImage"
                  showUploadList={false}
                  beforeUpload={beforeUploadProfileImage}
                  onChange={onChangeProfileImage}
                >
                  {newuserrequesters.profile_image ? (
                    <img
                      src={newuserrequesters.profile_image}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div> */}
              {language == "English" ? (
                <div className="p-3 col-span-1 md:col-span-3">
                  <Form
                    layout="vertical"
                    className="createAgentsForm"
                    onFinish={handleCreateArticle}
                    form={instanceForm}
                  >
                    <div className={"flex flex-row"}>
                      <p
                        className={
                          "font-gilroysemibold text-base textmig self-center mr-2"
                        }
                      >
                        Article type:
                      </p>
                      <Select
                        defaultValue={articleType}
                        style={{ width: 200 }}
                        allowClear
                        onChange={handleChangeArticleType}
                        options={[
                          {
                            value: "Customer Stories",
                            label: "Customer Stories",
                          },
                          {
                            value: "Blog",
                            label: "Blog",
                          },
                        ]}
                      />
                    </div>
                    <div className={"flex flex-row mt-3 mb-3"}>
                      <p
                        className={
                          language == "English"
                            ? "p-3 text-base text-blackmig bg-lightgrey"
                            : "p-3 text-base text-blackmig"
                        }
                        onClick={() => handleSetLanguage("English")}
                      >
                        English
                      </p>
                      <p
                        className={
                          language == "Indonesia"
                            ? "p-3 text-base text-blackmig bg-lightgrey"
                            : "p-3 text-base text-blackmig"
                        }
                        onClick={() => handleSetLanguage("Indonesia")}
                      >
                        Indonesia
                      </p>
                    </div>
                    <Form.Item
                      label="Page Path"
                      required
                      initialValue={artikelBlog.pagePath}
                      name="pagePath"
                      rules={[
                        {
                          required: true,
                          message: "Page Path wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={artikelBlog.pagePath}
                        name={`pagePath`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Article Title"
                      required
                      initialValue={artikelBlog.title}
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Judul Artikel wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={artikelBlog.title}
                        name={`title`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      required
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "description wajib diisi",
                        },
                      ]}
                    >
                      <RichText
                        value={artikelBlog.description}
                        placeholder={"Description"}
                        onChange={onChangeTextDescription}
                      />
                      {/* <ReactQuill
                      theme="snow"
                      defaultValue={artikelBlog.isi}
                      modules={modules}
                      formats={formats}
                      className="h-44 pb-10"
                      onChange={onChangeText}
                    /> */}
                    </Form.Item>

                    <Upload
                      name="artikel_image"
                      listType="picture-card"
                      className="profileImage"
                      showUploadList={false}
                      beforeUpload={beforeUploadProfileImage}
                      onChange={onChangeProfileImage}
                    >
                      {artikelBlog.artikel_image ? (
                        <img
                          src={artikelBlog.artikel_image}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                    <Form.Item
                      label="Content"
                      required
                      name="content"
                      rules={[
                        {
                          required: true,
                          message: "Isi artikel wajib diisi",
                        },
                      ]}
                    >
                      <RichText
                        value={artikelBlog.content}
                        placeholder={"isi Content"}
                        onChange={onChangeTextContent}
                      />
                      {/* <ReactQuill
                      theme="snow"
                      defaultValue={artikelBlog.isi}
                      modules={modules}
                      formats={formats}
                      className="h-44 pb-10"
                      onChange={onChangeText}
                    /> */}
                    </Form.Item>
                    <Form.Item
                      label="Tags   "
                      required
                      initialValue={artikelBlog.tags}
                      name="tags"
                      rules={[
                        {
                          required: true,
                          message: "Tags wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={artikelBlog.tags}
                        name={`tags`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    <p className={"font-gilroysemibold text-blackmig text-xl"}>
                      Company Detail
                    </p>
                    <Form.Item
                      label="Company Name"
                      initialValue={artikelBlog.company_name}
                      name="company_name"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Page Path wajib diisi",
                      //   },
                      // ]}
                    >
                      <Input
                        value={artikelBlog.company_name}
                        name={`company_name`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    <p className={"text-blackmig text-base font-gilroyregular"}>
                      Company logo
                    </p>
                    <Upload
                      name="company_logo"
                      listType="picture-card"
                      className="profileImage"
                      showUploadList={false}
                      beforeUpload={beforeUploadProfileImage}
                      onChange={onChangeCompanyLogo}
                    >
                      {artikelBlog.company_image ? (
                        <img
                          src={artikelBlog.company_image}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                    {/* company stories */}
                    {articleType == "Customer Stories" && (
                      <div>
                        <p
                          className={
                            "font-gilroysemibold text-blackmig text-xl"
                          }
                        >
                          Testimonial
                        </p>
                        <Form.Item
                          label="Quote"
                          name="quote"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Isi artikel wajib diisi",
                          //   },
                          // ]}
                        >
                          <RichText
                            value={artikelBlog.quote}
                            placeholder={"isi Quote"}
                            onChange={onChangeTextContentQuote}
                          />
                          {/* <ReactQuill
                      theme="snow"
                      defaultValue={artikelBlog.isi}
                      modules={modules}
                      formats={formats}
                      className="h-44 pb-10"
                      onChange={onChangeText}
                    /> */}
                        </Form.Item>
                        <Form.Item
                          label="Author"
                          // required
                          initialValue={artikelBlog.author}
                          name="author"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Page Path wajib diisi",
                          //   },
                          // ]}
                        >
                          <Input
                            value={artikelBlog.author}
                            name={`author`}
                            onChange={onChangeCreateArtikel}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Job Title"
                          initialValue={artikelBlog.job_title}
                          name="job_title"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Page Path wajib diisi",
                          //   },
                          // ]}
                        >
                          <Input
                            value={artikelBlog.job_title}
                            name={`job_title`}
                            onChange={onChangeCreateArtikel}
                          />
                        </Form.Item>
                      </div>
                    )}
                    <p className={"font-gilroysemibold text-blackmig text-xl"}>
                      SEO
                    </p>
                    <Form.Item
                      label="Meta Title"
                      required
                      initialValue={artikelBlog.meta_title}
                      name="meta_title"
                      rules={[
                        {
                          required: true,
                          message: "Meta title wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={artikelBlog.meta_title}
                        name={`meta_title`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Meta Description"
                      required
                      initialValue={artikelBlog.meta_description}
                      name="meta_description"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Page Path wajib diisi",
                      //   },
                      // ]}
                    >
                      <Input
                        value={artikelBlog.meta_description}
                        name={`meta_description`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <div className="p-3 col-span-1 md:col-span-3">
                  <Form
                    layout="vertical"
                    className="createAgentsForm"
                    onFinish={handleCreateArticle}
                    form={instanceForm}
                  >
                    <div className={"flex flex-row"}>
                      <p
                        className={
                          "font-gilroysemibold text-base textmig self-center mr-2"
                        }
                      >
                        Article type:
                      </p>
                      <Select
                        defaultValue={articleType}
                        style={{ width: 200 }}
                        allowClear
                        onChange={handleChangeArticleType}
                        options={[
                          {
                            value: "Customer Stories",
                            label: "Customer Stories",
                          },
                          {
                            value: "Blog",
                            label: "Blog",
                          },
                        ]}
                      />
                    </div>
                    <div className={"flex flex-row mt-3 mb-3"}>
                      <p
                        className={
                          language == "English"
                            ? "p-3 text-base text-blackmig bg-lightgrey"
                            : "p-3 text-base text-blackmig"
                        }
                        onClick={() => handleSetLanguage("English")}
                      >
                        English
                      </p>
                      <p
                        className={
                          language == "Indonesia"
                            ? "p-3 text-base text-blackmig bg-lightgrey"
                            : "p-3 text-base text-blackmig"
                        }
                        onClick={() => handleSetLanguage("Indonesia")}
                      >
                        Indonesia
                      </p>
                    </div>
                    <Form.Item
                      label="Page Path ID"
                      required
                      initialValue={artikelBlog.pagePathId}
                      name="pagePathId"
                      rules={[
                        {
                          required: true,
                          message: "Page Path wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={artikelBlog.pagePathId}
                        name={`pagePathId`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Judul Artikel ID"
                      initialValue={artikelBlog.title_id}
                      name="title_id"
                    >
                      <Input
                        value={artikelBlog.title_id}
                        name={`title_id`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    <Form.Item label="Description ID" name="description_id">
                      <RichText
                        value={artikelBlog.description_id}
                        placeholder={"isi Artikel Text"}
                        onChange={onChangeTextDescriptionId}
                      />
                      {/* <ReactQuill
                      theme="snow"
                      defaultValue={artikelBlog.isi}
                      modules={modules}
                      formats={formats}
                      className="h-44 pb-10"
                      onChange={onChangeText}
                    /> */}
                    </Form.Item>
                    <Form.Item label="Content ID" name="content_id">
                      <RichText
                        value={artikelBlog.content_id}
                        placeholder={"isi Content"}
                        onChange={onChangeTextContentId}
                      />
                      {/* <ReactQuill
                      theme="snow"
                      defaultValue={artikelBlog.isi}
                      modules={modules}
                      formats={formats}
                      className="h-44 pb-10"
                      onChange={onChangeText}
                    /> */}
                    </Form.Item>
                    <Form.Item
                      label="Tags ID "
                      initialValue={artikelBlog.tagsId}
                      name="tagsId"
                    >
                      <Input
                        value={artikelBlog.tagsId}
                        name={`tagsId`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    {/* customer stories id */}
                    {articleType == "Customer Stories" && (
                      <div>
                        <p
                          className={
                            "font-gilroysemibold text-blackmig text-xl"
                          }
                        >
                          Testimonial
                        </p>
                        <Form.Item
                          label="Quote ID"
                          name="quoteId"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Isi artikel wajib diisi",
                          //   },
                          // ]}
                        >
                          <RichText
                            value={artikelBlog.quoteId}
                            placeholder={"isi Quote"}
                            onChange={onChangeTextContentQuoteId}
                          />
                          {/* <ReactQuill
                      theme="snow"
                      defaultValue={artikelBlog.isi}
                      modules={modules}
                      formats={formats}
                      className="h-44 pb-10"
                      onChange={onChangeText}
                    /> */}
                        </Form.Item>
                        <Form.Item
                          label="Judul Pekerjaan"
                          initialValue={artikelBlog.job_title_id}
                          name="job_title_id"
                        >
                          <Input
                            value={artikelBlog.job_title_id}
                            name={`job_title_id`}
                            onChange={onChangeCreateArtikel}
                          />
                        </Form.Item>
                      </div>
                    )}
                    <p className={"font-gilroysemibold text-blackmig text-xl"}>
                      SEO
                    </p>
                    <Form.Item
                      label="Meta Title ID"
                      initialValue={artikelBlog.meta_title_id}
                      name="meta_title_id"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Page Path wajib diisi",
                      //   },
                      // ]}
                    >
                      <Input
                        value={artikelBlog.meta_title_id}
                        name={`meta_title_id`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Meta Description ID"
                      initialValue={artikelBlog.meta_description_id}
                      name="meta_description_id"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Page Path wajib diisi",
                      //   },
                      // ]}
                    >
                      <Input
                        value={artikelBlog.meta_description_id}
                        name={`meta_description_id`}
                        onChange={onChangeCreateArtikel}
                      />
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const reqBody = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
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

  const resources = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjson = await resources.json();
  const dataProfile = resjson;

  // if (![117].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  // const resourcesGCL = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getClientCompanyList`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps),
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(reqBody)
  // })
  // const resjsonGCL = await resourcesGCL.json()
  // const dataCompanyList = resjsonGCL

  return {
    props: {
      initProps,
      dataProfile,
      // dataCompanyList,
      sidemenu: "62",
    },
  };
}

export default BlogCreate;
