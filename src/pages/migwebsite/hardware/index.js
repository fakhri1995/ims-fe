import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Collapse,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import Linkk from "next/link";
import { useRouter } from "next/router";
import { React, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReCAPTCHA from "react-google-recaptcha";
import Slider from "react-slick";

import { generateStaticAssetUrl, objectToFormData } from "lib/helper";
import { getBase64 } from "lib/helper";

import Layout from "../../../components/migwebsite/layout.js";
import ThankForm from "../../../components/migwebsite/thank-form.js";
import en from "../../../locales/en";
import id from "../../../locales/id";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Hardware({}) {
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const { Option } = Select;
  const { TextArea } = Input;
  const [dataBanking, setDataBanking] = useState(null);
  const [dataWorkstation, setDataWorkStation] = useState(null);
  const [dataServer, setDataServer] = useState(null);
  const [dataUps, setDataUps] = useState(null);
  const [dateNow, setDateNow] = useState(new Date());
  const [dataTestimonial, setDataTestimonial] = useState(null);
  const [showCollapsible, setShowCollapsible] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProduct`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          var dataBank = res2.data.filter(function (el) {
            return el.category_product_id == 1;
          });
          var dataStation = res2.data.filter(function (el) {
            return el.category_product_id == 2;
          });
          var dataServers = res2.data.filter(function (el) {
            return el.category_product_id == 3;
          });
          var dataUp = res2.data.filter(function (el) {
            return el.category_product_id == 4;
          });
          if (dataBank.length != 0) {
            setDataBanking(dataBank);
          }
          if (dataStation.length != 0) {
            setDataWorkStation(dataStation);
          }
          if (dataServers.length != 0) {
            setDataServer(dataServers);
          }
          if (dataUp.length != 0) {
            setDataUps(dataUp);
          }
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
    getDataTestimonial();
  }, []);

  const getDataTestimonial = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTestimonialHardwarePage`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("get data testimonial ", res2);
        if (res2.success) {
          setDataTestimonial(res2.data);
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        // setLoadingEmployees(false);
      });
  };
  const handleSubmit = () => {
    // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addMessage`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataHardware),
    // })
    //   .then((res) => res.json())
    //   .then((res2) => {
    //     if (res2.success) {
    //       form.resetFields();
    //       setFeedback(false);
    //       setTimeout(() => {
    //         setFeedback(true);
    //       }, 5000);
    //     } else if (!res2.success) {
    //       notification["error"]({
    //         message: res2.message.errorInfo.status_detail,
    //         duration: 5,
    //       });
    //     }
    //   });
    setFormActive("second");
    window.scrollTo(0, 0);
  };

  const handleForm = (value) => {
    if (value == "third") {
      if (valuePurpose == null) {
        notification["error"]({
          message: "You must filled your purpose",
          duration: 5,
        });
      } else {
        setFormActive(value);
        window.scrollTo(0, 0);
      }
    } else {
      setFormActive(value);
      window.scrollTo(0, 0);
    }
  };
  const [dataHardware, setDataHardware] = useState({
    company_name: null,
    company_email: null,
    name: null,
    phone_number: null,
    interested_in: "hardware",
    message: null,
    time_need: null,
    time_used: null,
    product: null,
    many_product: null,
    max_budget: null,
    details: null,
    attachment: null,
  });

  const [dataHardwareSummary, setDataHardwareSummary] = useState([]);
  const [email, setEmail] = useState(null);
  const [showForm, setShowform] = useState(false);
  const [formActive, setFormActive] = useState("first");
  const [feedback, setFeedback] = useState(true);
  const [valuePurpose, setValuePurpose] = useState(null);
  const [manyTalent, setManyTalent] = useState(null);
  const [manyTalentErrorStatus, setManyTalentErrorStatus] = useState(false);
  const [urgently, setUrgently] = useState(null);
  const [urgentlyErrorStatus, setUrgentlyErrorStatus] = useState(false);
  const [timeUsed, setTimeUsed] = useState(null);
  const [timeUsedErrorStatus, setTimeUsedErrorStatus] = useState(false);
  const [maxBudget, setMaxBudget] = useState(null);
  const [maxBudgetErrorStatus, setMaxBudgetErrorStatus] = useState(false);
  const [productErrorStatus, setProductErrorStatus] = useState(false);
  const [details, setDetails] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [indexEdit, setIndexEdit] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [deleteHardwareValue, setDeleteHardwareValue] = useState(null);
  const [valueDate, onChangeDate] = useState(new Date());
  const [valueDateTemp, onChangeDateTemp] = useState(null);
  const [valueMeetingTime, setValueMeetingTime] = useState(null);
  const [labelMeetingTime, setLabelMeetingTime] = useState(null);
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const dataGetProduct = [
    {
      id: 1,
      name: "Bank Machinery",
      selected: true,
      image: "/image/hardware/banking.png",
      image_selected: "/image/hardware/banking_selected.png",
    },
    {
      id: 2,
      name: "Workstation",
      selected: false,
      image: "/image/hardware/station.png",
      image_selected: "/image/hardware/banking_selected.png",
    },
    {
      id: 3,
      name: "Server & Hosting",
      selected: false,
      image: "/image/hardware/server.png",
      image_selected: "/image/hardware/server_selected.png",
    },
    {
      id: 4,
      name: "UPS",
      selected: false,
      image: "/image/hardware/UPS.png",
      image_selected: "/image/hardware/ups_selected.png",
    },
    {
      id: 5,
      name: "Others",
      selected: false,
      image: "/image/hardware/others_notselected.png",
      image_selected: "/image/hardware/others_selected.png",
    },
  ];

  const [dataProduct, setDataProduct] = useState(dataGetProduct);
  const [kindOfHardware, setKindOfHardware] = useState(null);
  const [hardwareSuggestion, setHardwareSuggestion] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("dataForm")) {
      let dataForm = JSON.parse(localStorage.getItem("dataForm"));
      setDataHardware({
        ...dataHardware,
        company_email: dataForm.company_email,
        company_name: dataForm.company_name,
        contact_name: dataForm.name,
        phone_number: dataForm.phone_number,
      });
      setShowform(true);
      setFormActive("second");
      window.scrollTo(0, 0);
      localStorage.removeItem("dataForm");
    }
  }, []);
  const onChangeValuePurpose = (e) => {
    setValuePurpose(e.target.value);
  };
  const onChangeManyProduct = (value) => {
    if (Number(value)) setManyTalent(value);
  };
  const [product, setProduct] = useState(null);
  const [productSelected, setProductSelected] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [showThankForm, setShowThankForm] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(true);
  const [captchaStatus, setCaptchaStatus] = useState(false);
  const [meetingDateStatus, setMeetingDateStatus] = useState(false);
  const [meetingTimeStatus, setMeetingTimeStatus] = useState(false);
  const captchaRef = useRef(null);
  const captchaRefMobile = useRef(null);
  const dataMeetingTime = [
    {
      id: 1,
      value: "13:00",
      label_meeting: "13.00 WIB - 13.30 WIB",
    },
    {
      id: 2,
      value: "13:30",
      label_meeting: "13.30 WIB - 14.00 WIB",
    },
    {
      id: 3,
      value: "14:00",
      label_meeting: "14.00 WIB - 14.30 WIB",
    },
    {
      id: 4,
      value: "14:30",
      label_meeting: "14.30 WIB - 15.00 WIB",
    },
    {
      id: 5,
      value: "15:00",
      label_meeting: "15.00 WIB - 15.30 WIB",
    },
  ];
  const dataMeetingTime2 = [
    {
      id: 6,
      value: "15:30",
      label_meeting: "15.30 WIB - 16.00 WIB",
    },
    {
      id: 7,
      value: "16:00",
      label_meeting: "16.00 WIB - 16.30 WIB",
    },
    {
      id: 8,
      value: "16:30",
      label_meeting: "16.30 WIB - 17.00 WIB",
    },
    {
      id: 9,
      value: "17:00",
      label_meeting: "17.00 WIB - 17.30 WIB",
    },
    {
      id: 10,
      value: "17:30",
      label_meeting: "17.30 WIB - 18.00 WIB",
    },
  ];

  const deleteProduct = (index) => {
    let arr_product = [...productSelected];
    console.log("delete product ", index);
    arr_product.splice(index, 1);
    setProductSelected([...arr_product]);
  };
  const handleShowForm = () => {
    setShowform(true);
  };
  const changeCaptcha = (value) => {
    console.log("valuenya ", value);
    setCaptchaStatus(false);
  };
  const submitFormSoftware = (device) => {
    let recaptchaValue = null;
    if (device == "web") {
      recaptchaValue = captchaRef.current.getValue();
    } else {
      recaptchaValue = captchaRefMobile.current.getValue();
    }
    if (
      recaptchaValue != "" &&
      valueDateTemp != null &&
      valueMeetingTime != null
    ) {
      setCaptchaStatus(false);
      setMeetingTimeStatus(false);
      setMeetingDateStatus(false);
      let devicesObjectList = dataHardwareSummary.map((device, idx) => {
        let obj = {};
        obj[`hardware_list[${idx}][kind_of_product]`] = device.kindOfHardware;
        obj[`hardware_list[${idx}][product]`] = device.product;
        obj[`hardware_list[${idx}][manyTalent]`] = device.manyTalent;
        obj[`hardware_list[${idx}][urgently]`] = device.urgently;
        obj[`hardware_list[${idx}][timeUsed]`] = device.timeUsed;
        obj[`hardware_list[${idx}][maxBudget]`] = device.maxBudget;
        obj[`hardware_list[${idx}][details]`] = device.details;
        obj[`hardware_list[${idx}][attachment]`] = device.attachment;
        return obj;
      });

      let allDevicesObject = {};
      for (let deviceObject of devicesObjectList) {
        Object.assign(allDevicesObject, deviceObject);
      }
      let payloadFormData;

      let dataHardwarePost = {
        company_name: dataHardware.company_name,
        contact_name: dataHardware.name,
        company_email: dataHardware.company_email,
        phone_number: dataHardware.phone_number,
        purpose: valuePurpose,
        kind_form: "hardware",
        meeting_schedule:
          moment(valueDate).format("YYYY-MM-DD") + " " + valueMeetingTime,
      };
      let inventoryDataWithDevice = {
        ...dataHardwarePost,
        ...allDevicesObject,
      };
      payloadFormData = objectToFormData(inventoryDataWithDevice);

      console.log("datahardware ", payloadFormData);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addFormSolutionHardware`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
        body: payloadFormData,
      })
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            form.resetFields();
            setFeedback(false);
            notification.success({
              message: "Submit Form Solution Hardware Success!",
              duration: 3,
            });
            setShowThankForm(true);
          } else if (!res2.success) {
            notification["error"]({
              message: res2.message.errorInfo.status_detail,
              duration: 5,
            });
          }
        });
    } else {
      if (recaptchaValue == "") {
        setCaptchaStatus(true);
      }
      if (valueDateTemp == null) {
        setMeetingDateStatus(true);
      }
      if (valueMeetingTime == null) {
        setMeetingTimeStatus(true);
      }
    }
  };
  const onPanelChange = (value) => {
    console.log("date valuenya ", value);
    setMeetingDateStatus(false);
    onChangeDateTemp(value);
    onChangeDate(value);
  };
  const onChangeValueMeetingTime = (value, label) => {
    if (value == valueMeetingTime) {
      setValueMeetingTime(null);
    } else {
      setMeetingTimeStatus(false);
      setValueMeetingTime(value);
      setLabelMeetingTime(label);
    }
  };

  const readTestimoni = (page_path) => {
    let path = "/migwebsite/customerstories/" + page_path;
    let pathname = "/migwebsite/customerstories/[stories_id]";
    router.push(pathname, path, { locale: "id" });
    // rt.push("/id/migwebsite/customerstories/" + page_path);
  };

  const handleSubmitHardware = () => {
    setModalSubmit(true);
  };

  const handleKindOfHardware = (value) => {
    setKindOfHardware(value);
    let arr = [];
    if (value == "Bank Machinery") {
      arr.push("GRG Automated Teller Machine");
      arr.push("GRG Cash Recycle Machine");
      arr.push("Hyosung Automated Teller Machine");
      arr.push("Hyosung Cash Recycle Machine");
      arr.push("GRG Video Teller Machine");
      arr.push("Smart Teller Machine");
      arr.push("Smart Embosser Machine");
      arr.push("Branch Bulk Cash Recycler");
      arr.push("Bulk Cash Recycler");
      arr.push("Teller Cash Recycler");
      arr.push("GRG Branch Cash Recycler");
      arr.push("Hyosung Branch Cash Recycler");
      arr.push("Hyosung Video Teller Machine");
      arr.push("Cash Sorting Machine (Small)");
      arr.push("Cash Sorting Machine (Medium)");
      arr.push("Cash Sorting Machine (Large)");
      arr.push("High Speed Cash Deposit Machine");
      arr.push("Intelligent Cash Deposit Machine");
      arr.push("Night Safe");
      arr.push("Compact Cash Recycler");
      arr.push("Entry Level Cash Dispenser");
    } else if (value == "Workstation") {
      arr.push("Laptop (Windows)");
      arr.push("Macbook");
      arr.push("Personal Computer");
      arr.push("iMac");
      arr.push("Mini PC");
    } else if (value == "Server") {
      arr.push("Server");
      arr.push("Hosting");
    } else if (value == "UPS") {
      arr.push("UPS");
    } else {
      arr.push("Smartphone");
      arr.push("Tablet");
    }
    setHardwareSuggestion(arr);
  };

  const handleSuggestionHardware = (skill) => {
    let double = 0;
    for (let a = 0; a < productSelected.length; a++) {
      if (productSelected[a].toLowerCase() == skill.toLowerCase()) {
        double = 1;
      }
    }
    if (double == 0) {
      let arr_product = productSelected;
      arr_product.push(skill);
      setProductSelected([...arr_product]);
    }
    // form.setFieldValue(form, "product", "");
  };

  const handleAddAnotherProduct = () => {
    console.log("oe ", statusEdit);
    if (
      productSelected.length == 0 ||
      urgently == null ||
      urgently == "" ||
      manyTalent == null ||
      manyTalent == 0 ||
      timeUsed == null ||
      timeUsed == "" ||
      maxBudget == null ||
      maxBudget == 0
    ) {
      if (productSelected.length == 0) {
        setProductErrorStatus(true);
      }
      if (urgently == null || urgently == "") {
        setUrgentlyErrorStatus(true);
      }
      if (manyTalent == null || manyTalent == 0) {
        setManyTalentErrorStatus(true);
      }
      if (timeUsed == null || timeUsed == "") {
        setTimeUsedErrorStatus(true);
      }
      if (maxBudget == null || maxBudget == 0) {
        setMaxBudgetErrorStatus(true);
      }
    } else {
      console.log("status edit ", statusEdit);
      if (statusEdit == true) {
        let array_hardwares = [];
        for (let i = 0; i < dataHardwareSummary.length; i++) {
          if (i == indexEdit) {
            array_hardwares.push({
              kindOfHardware: kindOfHardware,
              product: productSelected,
              manyTalent: manyTalent,
              urgently: urgently,
              timeUsed: timeUsed,
              maxBudget: maxBudget,
              details: details,
              attachment: attachment,
            });
          } else {
            array_hardwares.push({
              kindOfHardware: dataHardware[i].kindOfHardware,
              product: dataHardware[i].product,
              manyTalent: dataHardware[i].manyTalent,
              urgently: dataHardware[i].urgently,
              timeUsed: dataHardware[i].timeUsed,
              maxBudget: dataHardware[i].maxBudget,
              details: dataHardware[i].details,
              attachment: dataHardware[i].attachment,
            });
          }
        }
        setDataHardwareSummary([...array_hardwares]);
        setStatusEdit(false);
        notification.success({
          message: "Edit Hardware Product success!",
          duration: 3,
        });
      } else {
        let array_hardwares = dataHardwareSummary;
        array_hardwares.push({
          kindOfHardware: kindOfHardware,
          product: productSelected,
          manyTalent: manyTalent,
          urgently: urgently,
          timeUsed: timeUsed,
          maxBudget: maxBudget,
          details: details,
          attachment: attachment,
        });
        setDataHardwareSummary([...array_hardwares]);
        notification.success({
          message: "Add Hardware Product success!",
          duration: 3,
        });
      }
      handleClearForm();
    }
  };

  const handleUpdateProduct = () => {
    console.log("update ", statusEdit);
    console.log("1 ", productSelected.length);
    console.log("2 ", urgently);
    console.log("3 ", manyTalent);
    console.log("4 ", timeUsed);
    console.log("5 ", maxBudget);
    if (
      productSelected.length == 0 ||
      urgently == null ||
      urgently == "" ||
      manyTalent == null ||
      manyTalent == 0 ||
      timeUsed == null ||
      timeUsed == "" ||
      maxBudget == null ||
      maxBudget == 0
    ) {
      console.log("masuk if ");
      console.log("productSelected.length ", productSelected.length);
      console.log("urgently ", urgently);
      console.log("manyTalent ", manyTalent);
      console.log("timeUsed ", timeUsed);
      console.log("maxBudget ", maxBudget);
      if (productSelected.length == 0) {
        setProductErrorStatus(true);
      }
      if (urgently == null || urgently == "") {
        setUrgentlyErrorStatus(true);
      }
      if (manyTalent == null || manyTalent == 0) {
        setManyTalentErrorStatus(true);
      }
      if (timeUsed == null || timeUsed == "") {
        setTimeUsedErrorStatus(true);
      }
      if (maxBudget == null || maxBudget == 0) {
        setMaxBudgetErrorStatus(true);
      }
    } else {
      console.log("status edit ", statusEdit);

      let array_hardwares = [];
      for (let i = 0; i < dataHardwareSummary.length; i++) {
        if (i == indexEdit) {
          array_hardwares.push({
            kindOfHardware: kindOfHardware,
            product: productSelected,
            manyTalent: manyTalent,
            urgently: urgently,
            timeUsed: timeUsed,
            maxBudget: maxBudget,
            details: details,
            attachment: attachment,
          });
        } else {
          console.log("index ke ", i);
          console.log("dataHardware[i] ", dataHardwareSummary[i]);
          array_hardwares.push({
            kindOfHardware: dataHardwareSummary[i].kindOfHardware,
            product: dataHardwareSummary[i].product,
            manyTalent: dataHardwareSummary[i].manyTalent,
            urgently: dataHardwareSummary[i].urgently,
            timeUsed: dataHardwareSummary[i].timeUsed,
            maxBudget: dataHardwareSummary[i].maxBudget,
            details: dataHardwareSummary[i].details,
            attachment: dataHardwareSummary[i].attachment,
          });
        }
      }
      setDataHardwareSummary([...array_hardwares]);
      setStatusEdit(false);
      notification.success({
        message: "Edit Hardware Product success!",
        duration: 3,
      });

      handleClearForm();
    }
  };
  const handleEdit = (index) => {
    setStatusEdit(true);
    setIndexEdit(index);
    setProductSelected(dataHardwareSummary[index].product);
    setKindOfHardware(dataHardwareSummary[index].kindOfHardware);
    setMaxBudget(dataHardwareSummary[index].maxBudget);
    setUrgently(dataHardwareSummary[index].urgently);
    setManyTalent(dataHardwareSummary[index].manyTalent);
    setTimeUsed(dataHardwareSummary[index].timeUsed);
    handleSetForm(index);
    handleKindOfHardware(dataHardwareSummary[index].kindOfHardware);
  };
  const handleSetForm = (index) => {
    form.setFieldsValue({
      time_need_product: dataHardwareSummary[index].urgently,
    });
    form.setFieldsValue({ time_used: dataHardwareSummary[index].timeUsed });
    // form.setFieldsValue({product: dataHardwareSummary[index].product });
    form.setFieldsValue({ max_budget: dataHardwareSummary[index].maxBudget });
    form.setFieldsValue({ manyproduct: dataHardwareSummary[index].manyTalent });
    form.setFieldsValue({ Details: dataHardwareSummary[index].details });
  };

  const handleClearForm = () => {
    form.setFieldsValue({ time_need_product: null });
    // form.resetFields();
    form.setFieldsValue({ time_used: null });
    form.setFieldsValue({ product: null });
    form.setFieldsValue({ max_budget: null });
    form.setFieldsValue({ manyproduct: null });
    form.setFieldsValue({ Details: null });
    form.setFieldsValue({ attachment: null });
    setHardwareSuggestion([]);
    setProductSelected([]);
    setKindOfHardware(null);
    setManyTalent(null);
    setUrgently(null);
    setTimeUsed(null);
    setMaxBudget(null);
    setDetails(null);
    setAttachment(null);
    setShowUploadFile(false);
  };
  const handleSubmitConfirm = () => {
    setFormActive("four");
    setModalSubmit(false);
    window.scrollTo(0, 0);
  };
  const handleCancelSubmit = () => {
    setModalSubmit(false);
  };
  const handleCancelDelete = () => {
    setModalDelete(false);
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img
          style={{ width: "16px", height: "16px" }}
          src="/image/landingpage/arrow-sm-left.png"
        />
      </div>
    );
  };

  const handleDeleteHardware = (value, index) => {
    setIndexEdit(index);
    setDeleteHardwareValue(value);
    setModalDelete(true);
  };

  const handleDeleteConfirm = () => {
    if (dataHardwareSummary.length == 1) {
      setDataHardwareSummary([]);
      setModalDelete(false);
    } else {
      let array_talents = dataHardwareSummary;
      array_talents.splice(indexEdit, 1);
      setModalDelete(false);
      setDataHardwareSummary(array_talents);
    }
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <img
          style={{ width: "16px", height: "16px" }}
          src="/image/landingpage/arrow-sm-left.png"
        />
      </div>
    );
  };
  const slider = useRef(null);

  const sliderSettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  const sliderSettingsPhone = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };

  const sliderSettingsPhone2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };

  const handleLetsTalk = () => {
    console.log(
      "data email ",
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        dataHardware.company_email
      )
    );
    if (dataHardware.company_email == null) {
      console.log("set show form email first");
      setShowEmailError(true);
      setEmailError("you must filled email first");
    } else if (
      dataHardware.company_email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      console.log("set show form email third");
      setShowEmailError(false);
      setShowform(true);
    } else {
      console.log("set show form email second");
      setEmailError("your email is invalid");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleHardwareType = (value, selected_value) => {
    const newArr = dataProduct.map((object) => {
      if (object.id === value) {
        // 👇️ change value of name property
        return { ...object, selected: !selected_value };
      }
      return object;
    });
    setDataProduct(newArr);
  };
  const handleInputProduct = (value) => {
    let double = 0;
    for (let a = 0; a < productSelected.length; a++) {
      if (productSelected[a].toLowerCase() == value.toLowerCase()) {
        double = 1;
      }
    }
    if (double == 0) {
      let arr_product = productSelected.length > 0 ? productSelected : [];
      arr_product.push(value);
      setProductSelected([...arr_product]);
    }
    // form.resetFields([product]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let numbersCopy = [];
      let i = -1;

      while (++i < productSelected.length) {
        numbersCopy[i] = productSelected[i];
      }
      numbersCopy.push(e.target.value);
      console.log("numbers copy ", numbersCopy);
      setProductSelected([...numbersCopy]);
      form.resetFields([product]);
    }
  };

  const onChangeFile = async (info) => {
    if (info.file.status === "uploading") {
      // setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);
      setAttachment(blobFile);
      setShowUploadFile(true);
    }
  };

  const tileDisabled = ({ activeStartDate, date, view }) => {
    let $today = new Date();
    let disabledate = moment($today).subtract(1, "day");
    return date < disabledate;
  };

  useEffect(() => {}, []);
  return (
    <Layout>
      <Head>
        <title>{t.hardwaremetatitle}</title>
        <meta name="description" content={t.hardwaremetadescription} />
      </Head>
      {showForm == false && (
        <section
          className={
            "section1advantages hidden lg:block fixed w-full z-50 px-4 lg:px-[112px]"
          }
          style={{ background: "#F4F4F4" }}
        >
          <div className={"block lg:flex container mx-auto"}>
            <div className={"flex py-4"}>
              <Link href={{ pathname: "/hardware" }}>
                <p
                  className={
                    "cursor-pointer flex-col font-gilroybold text-lg mr-4"
                  }
                  style={{
                    borderBottom: "solid 2px #10B981",
                    paddingBottom: "2.5px",
                  }}
                >
                  Hardware
                </p>
              </Link>
              <Link href={{ pathname: "/software" }}>
                <p className={"cursor-pointer flex-col  text-lg mx-4"}>
                  Software
                </p>
              </Link>
              <Link href={{ pathname: "/talents" }}>
                <p className={"cursor-pointer flex-col  text-lg mx-4"}>
                  Talents
                </p>
              </Link>
            </div>
          </div>
        </section>
      )}
      {showForm && showThankForm == false ? (
        <div>
          <section
            className={
              formActive == "first"
                ? "px-[60px] xl:pl-[112px] 2xl:pl-[224px] py-[76px] hidden lg:flex lg:flex-row lg:justify-between"
                : "px-[60px] xl:pl-[112px] 2xl:pl-[224px] py-[76px] hidden lg:flex lg:flex-row"
            }
          >
            {formActive == "first" ? (
              <div className="w-[100%] lg:w-[52%]">
                <p
                  style={{ lineHeight: "120%" }}
                  className={
                    "text-[30px] text-primarygreen font-gilroysemibold"
                  }
                >
                  {t.thankyouforyourinterest}
                </p>
                <p
                  style={{ lineHeight: "150%" }}
                  className={"mt-4 text-xl text-blackmig"}
                >
                  {t.beforewereach}
                </p>
                <div className="mt-6">
                  <Form
                    id="formcontact"
                    hidden={!feedback}
                    layout={"vertical"}
                    onFinish={handleSubmit}
                    form={form}
                  >
                    <div className={"w-[495px]"}>
                      <Form.Item
                        name={t.companyname}
                        className={"text-base"}
                        label={
                          <p style={{ fontSize: "16px" }}>{t.companyname}</p>
                        }
                        style={{ fontSize: "16px" }}
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                            fontSize: "16px",
                          }}
                          name={t.companyname}
                          onChange={(e) => {
                            setDataHardware({
                              ...dataHardware,
                              company_name: e.target.value,
                            });
                          }}
                          placeholder={t.companynameplaceholder}
                        />
                      </Form.Item>
                      <Form.Item
                        name={"Email"}
                        initialValue={dataHardware.company_email}
                        className={" text-base -mt-2"}
                        label=<p style={{ fontSize: "16px" }}>Email</p>
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input
                          // disabled={true}
                          style={{
                            border: "1px solid #B8B8B8",
                            fontSize: "16px",
                          }}
                          name={"Email"}
                          onChange={(e) => {
                            setDataHardware({
                              ...dataHardware,
                              company_email: e.target.value,
                            });
                          }}
                          placeholder={t.talentheroemailplaceholder}
                        />
                      </Form.Item>
                    </div>
                    <div className={"w-[495px]"}>
                      <Form.Item
                        name={"Contact Name"}
                        className={" text-base -mt-2"}
                        label={
                          <p style={{ fontSize: "16px" }}>{t.contactname}</p>
                        }
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                            fontSize: "16px",
                          }}
                          name={"Contact Name"}
                          onChange={(e) => {
                            setDataHardware({
                              ...dataHardware,
                              name: e.target.value,
                            });
                          }}
                          placeholder={t.contactnameplaceholder}
                        />
                      </Form.Item>
                      <Form.Item
                        name={"Phone Number"}
                        className={" text-base -mt-2"}
                        label={
                          <p style={{ fontSize: "16px" }}>{t.phonenumber}</p>
                        }
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[0-9]*$"),
                            message: "Please input valid phone number",
                          },
                        ]}
                      >
                        <Input
                          // style={{ border: "1px solid #B8B8B8",height:"37px" }}
                          addonBefore="+62"
                          name={"Phone Number"}
                          onChange={(e) => {
                            setDataHardware({
                              ...dataHardware,
                              phone_number: parseInt(e.target.value),
                            });
                          }}
                          style={{ fontSize: "16px" }}
                          placeholder={t.phonenumberplaceholder}
                        />
                      </Form.Item>
                    </div>
                    <div className={"border border-dividermig w-[90%]"}></div>
                    <Form.Item>
                      <div className={"w-full flex justify-start mt-2"}>
                        <button
                          type={"submit"}
                          className={
                            "rounded w-[190px] h-[54px] text-white border-2 bg-primarygreen border-primarygreen py-3 pl-6 pr-[19px] mt-9"
                          }
                        >
                          <div className={"flex flex-row justify-between"}>
                            <p className={"text-[18px] font-gilroysemibold"}>
                              {t.getstarted}
                            </p>
                            <img
                              className={"self-center"}
                              style={{ width: "20px", height: "20px" }}
                              src="/image/landingpage/arrow_forward_ios2.png"
                            />
                          </div>
                        </button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            ) : formActive == "second" ? (
              <div className="w-[52%]">
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-[30px] text-blackmig font-gilroysemibold"}
                >
                  {t.generalinformation}
                </p>
                <p
                  style={{ lineHeight: "120%", fontSize: "16px" }}
                  className={"pt-9"}
                >
                  {t.whatisyourpurpose}
                </p>
                <div className={"mt-4"}>
                  <Radio.Group
                    onChange={onChangeValuePurpose}
                    value={valuePurpose}
                    buttonStyle={"solid"}
                  >
                    <Space direction="vertical">
                      <Radio
                        className="text-blackmig text-base"
                        value={"I want to buy the product"}
                      >
                        {t.iwanttobuytheproduct}
                      </Radio>
                      <Radio
                        className="text-blackmig text-base"
                        value={
                          "I want to lease the product and having hardware managed"
                        }
                      >
                        {t.iwanttoleasetheproduct}
                      </Radio>
                      <Radio
                        className="text-blackmig text-base"
                        value={
                          "None of the above, I just want to know about the service"
                        }
                      >
                        {t.noneoftheabove}
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
                <div className={"border border-dividermig w-full mt-9"} />
                <div className={"mt-9 flex flex-row justify-between"}>
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("first")}
                  >
                    <p className={"text-[18px] text-primarygreen"}>{t.back}</p>
                  </button>
                  <button
                    onClick={() => handleForm("third")}
                    className={
                      "text-white bg-primarygreen w-[95px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                    }
                  >
                    <p className={"text-[18px] text-white"}>{t.next}</p>
                    <img
                      className={"self-center"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow_forward_ios2.png"
                    />
                  </button>
                </div>
              </div>
            ) : formActive == "third" ? (
              // hardware information form

              <div className="w-[52%]">
                <Modal
                  open={modalDelete}
                  onCancel={handleCancelDelete}
                  width={392}
                  closeIcon={
                    <img
                      className={"w-[24px] mt-8 h-[24px]"}
                      src="/image/people/close.png"
                    />
                  }
                  footer={null}
                >
                  <div className={"text-center mx-auto"}>
                    <div className={"mt-9 grid justify-items-center"}>
                      <img
                        src="image/icon-warning.png"
                        className={"w-[72px] h-[72px]"}
                      />
                    </div>
                    <div className={"mt-8"}>
                      <p
                        className={
                          "font-gilroysemibold text-blackmig text-[32px]"
                        }
                      >
                        Delete
                      </p>
                      <p
                        className={
                          "mt-4 text-base text-blackmig font-gilroyregular"
                        }
                      >
                        Are you sure you want to remove{" "}
                        <span className={"font-gilroysemibold"}>
                          {deleteHardwareValue}
                        </span>{" "}
                        ?
                      </p>
                    </div>
                    <button
                      className={
                        "mt-8 py-2 px-[112.5px] bg-primarygreen rounded"
                      }
                      onClick={handleDeleteConfirm}
                    >
                      <p className={"text-base text-white font-gilroysemibold"}>
                        Delete Item
                      </p>
                    </button>
                    <button
                      className={
                        "mt-4 py-2 bg-white border border-primarygreen rounded px-[129px]"
                      }
                      onClick={handleCancelDelete}
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        Cancel
                      </p>
                    </button>
                  </div>
                </Modal>
                <Modal
                  open={modalSubmit}
                  onCancel={handleCancelSubmit}
                  width={392}
                  closeIcon={
                    <img
                      className={"w-[24px] mt-8 h-[24px]"}
                      src="/image/people/close.png"
                    />
                  }
                  footer={null}
                >
                  <div className={"text-center mx-auto"}>
                    <div className={"mt-9 grid justify-items-center"}>
                      <img
                        src="image/icon-warning.png"
                        className={"w-[72px] h-[72px]"}
                      />
                    </div>
                    <div className={"mt-8"}>
                      <p
                        className={
                          "font-gilroysemibold text-blackmig text-[32px]"
                        }
                      >
                        {t.submitrequest}
                      </p>
                      <div className={"mt-2 border border-dividermig px-8"} />
                      <p
                        className={
                          "mt-4 text-base text-blackmig font-gilroyregular"
                        }
                      >
                        {locale == "en"
                          ? "Are you sure you want to submit your request with only  "
                          : "Apakah Anda yakin untuk mengirim permintaan hanya dengan "}
                        <span className={"font-gilroysemibold"}>
                          {dataHardwareSummary.length}
                        </span>{" "}
                        {locale == "en" ? "item " : "produk "} ?
                      </p>
                    </div>
                    <button
                      className={"mt-8 py-2 px-[60px] bg-primarygreen rounded"}
                      onClick={handleSubmitConfirm}
                    >
                      <p className={"text-base text-white font-gilroysemibold"}>
                        Yes, continue with {dataHardwareSummary.length} item
                      </p>
                    </button>
                    <button
                      className={
                        "mt-4 py-2 bg-white border border-primarygreen rounded px-[27.5px]"
                      }
                      onClick={handleCancelSubmit}
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        {t.noiwanttocomplete}{" "}
                      </p>
                    </button>
                  </div>
                </Modal>
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-[30px] text-blackmig font-gilroysemibold"}
                >
                  {t.hardwareinformation}
                </p>
                <p style={{ lineHeight: "150%" }} className={"mt-9 text-base"}>
                  {t.whatkindofhardware}
                </p>
                <Form
                  id="formhardware"
                  // hidden={!feedback}
                  layout={"vertical"}
                  onFinish={() => handleAddAnotherProduct()}
                  form={form}
                >
                  {/* <p className={"text-primarygreen text-base"}>
                    You can choose more than one
                  </p> */}
                  {/* choose product */}
                  <div className={"flex flex-row mt-4"}>
                    <a
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("Bank Machinery")}
                    >
                      <div
                        className={
                          kindOfHardware == "Bank Machinery"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "Bank Machinery" ? (
                          <div className={"flex justify-end mt-1 mr-2"}>
                            <img
                              src={"image/hardware/check-list.png"}
                              className={"w-[19px] h-[19px]"}
                            />
                          </div>
                        ) : (
                          <div
                            className={
                              "flex justify-end mt-1 mr-2 w-[19px] h-[19px]"
                            }
                          ></div>
                        )}
                        <div className={"flex justify-center"}>
                          <img
                            src={
                              kindOfHardware == "Bank Machinery"
                                ? "image/hardware/banking_selected.png"
                                : "image/hardware/banking.png"
                            }
                            className={"w-[102px] h-[85px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "Bank Machinery"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            Bank Machinery
                          </p>
                        </div>
                      </div>
                    </a>
                    <a
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("Workstation")}
                    >
                      <div
                        className={
                          kindOfHardware == "Workstation"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "Workstation" ? (
                          <div className={"flex justify-end mt-1 mr-2"}>
                            <img
                              src={"image/hardware/check-list.png"}
                              className={"w-[19px] h-[19px]"}
                            />
                          </div>
                        ) : (
                          <div
                            className={
                              "flex justify-end mt-1 mr-2 w-[19px] h-[19px]"
                            }
                          ></div>
                        )}
                        <div className={"flex justify-center"}>
                          <img
                            src={
                              kindOfHardware == "Workstation"
                                ? "image/hardware/workstation_selected.png"
                                : "image/hardware/station.png"
                            }
                            className={"w-[98px] h-[91px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "Workstation"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            Workstation
                          </p>
                        </div>
                      </div>
                    </a>
                    <a
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("Server")}
                    >
                      <div
                        className={
                          kindOfHardware == "Server"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "Server" ? (
                          <div className={"flex justify-end mt-1 mr-2"}>
                            <img
                              src={"image/hardware/check-list.png"}
                              className={"w-[19px] h-[19px]"}
                            />
                          </div>
                        ) : (
                          <div
                            className={
                              "flex justify-end mt-1 mr-2 w-[19px] h-[19px]"
                            }
                          ></div>
                        )}
                        <div className={"flex justify-center"}>
                          <img
                            src={
                              kindOfHardware == "Server"
                                ? "image/hardware/server_selected.png"
                                : "image/hardware/server.png"
                            }
                            className={"w-[90px] h-[86px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "Server"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            Server & Hosting
                          </p>
                        </div>
                      </div>
                    </a>
                    <a
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("UPS")}
                    >
                      <div
                        className={
                          kindOfHardware == "UPS"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "UPS" ? (
                          <div className={"flex justify-end mt-1 mr-2"}>
                            <img
                              src={"image/hardware/check-list.png"}
                              className={"w-[19px] h-[19px]"}
                            />
                          </div>
                        ) : (
                          <div
                            className={
                              "flex justify-end mt-1 mr-2 w-[19px] h-[19px]"
                            }
                          ></div>
                        )}
                        <div className={"flex justify-center"}>
                          <img
                            src={
                              kindOfHardware == "UPS"
                                ? "image/hardware/ups_selected.png"
                                : "image/hardware/UPS.png"
                            }
                            className={"w-[108px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "UPS"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            UPS
                          </p>
                        </div>
                      </div>
                    </a>
                    <a
                      className={"bg-white"}
                      onClick={() => handleKindOfHardware("Others")}
                    >
                      <div
                        className={
                          kindOfHardware == "Others"
                            ? "rounded-[15.258px] border-[1.5px] border-primarygreen w-[122px] mr-5 px-auto"
                            : "rounded-[15.258px] border-[1.5px] border-borderProduct w-[122px] mr-5 px-auto"
                        }
                      >
                        {kindOfHardware == "Others" ? (
                          <div className={"flex justify-end mt-1 mr-2"}>
                            <img
                              src={"image/hardware/check-list.png"}
                              className={"w-[19px] h-[19px]"}
                            />
                          </div>
                        ) : (
                          <div
                            className={
                              "flex justify-end mt-1 mr-2 w-[19px] h-[19px]"
                            }
                          ></div>
                        )}
                        <div className={"flex justify-center"}>
                          <img
                            src={
                              kindOfHardware == "Others"
                                ? "image/hardware/others_selected.png"
                                : "image/hardware/others_notselected.png"
                            }
                            className={"w-[100px] h-[84px]"}
                          />
                        </div>
                        <div
                          className={
                            "mt-1 mb-1 text-center text-base text-blackmig "
                          }
                        >
                          <p
                            className={
                              kindOfHardware == "Others"
                                ? "font-gilroysemibold"
                                : "font-gilroyregular"
                            }
                          >
                            {t.others}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div
                    className={"mt-8 bg-lightgreen py-2.5 pl-2.5 rounded-lg"}
                  >
                    <p
                      className={"text-blackmig text-base font-gilroysemibold"}
                    >
                      {t.hardwarespecification}
                    </p>
                  </div>
                  <div className={"mt-8 w-1/2"}>
                    <Form.Item
                      name="time_need_product"
                      className={" text-base"}
                      label={
                        <p style={{ fontSize: "16px" }}>
                          {t.howsoondoyouneedproject}
                        </p>
                      }
                      rules={[
                        {
                          required: true,
                          message: "This input is must be filled",
                        },
                      ]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "16px",
                        }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="time_need_product"
                        onChange={(value) => {
                          setUrgently(value);
                        }}
                        allowClear
                      >
                        <Option value="Within this week">
                          {t.withinthisweek}
                        </Option>
                        <Option value="Within this month">
                          {t.withinthismonth}
                        </Option>
                        <Option value="Next Month">{t.nextmonth}</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8 w-1/2"}>
                    <Form.Item
                      name="time_used"
                      className={" text-base"}
                      label={
                        <p style={{ fontSize: "16px" }}>{t.howlongdoyouneed}</p>
                      }
                      rules={[
                        {
                          required: true,
                          message: "This input is must be filled",
                        },
                      ]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "16px",
                        }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="time_used"
                        onChange={(value) => {
                          setTimeUsed(value);
                        }}
                        allowClear
                      >
                        <Option value="6">{t.lessthan6month}</Option>
                        <Option value="6 - 12">{t.until12month}</Option>
                        <Option value="6 - 12">{t.morethan6month}</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      name={"product"}
                      className={" text-base"}
                      label={
                        <p style={{ fontSize: "16px" }}>
                          {locale == "en" ? "*What product in " : "Produk"}
                          <span className={"font-gilroysemibold"}>
                            {kindOfHardware}
                          </span>{" "}
                          {locale == "en"
                            ? " do you need?"
                            : " apa yang anda butuhkan?"}
                        </p>
                      }
                      // rules={[{ required: true }]}
                    >
                      <Input
                        value={product}
                        style={{
                          border: "1px solid #B8B8B8",
                          height: "37px",
                          fontSize: "16px",
                        }}
                        name={"product"}
                        onChange={(e) => {
                          setProduct(e.target.value);
                        }}
                        onPressEnter={(e) => {
                          handleInputProduct(e.target.value);
                        }}
                        placeholder={t.enterproduct}
                      />
                    </Form.Item>
                  </div>
                  {console.log("product selected  render", productSelected)}
                  {productSelected.length > 0 && (
                    <div className={"flex flex-wrap w-full mt-3"}>
                      {productSelected.map((data, index) => (
                        <div
                          className={
                            "bg-transp45 rounded-[20px] py-2 pl-2 pr-2 flex flex-row mr-3 mt-2"
                          }
                        >
                          <p
                            className={
                              "text-base text-blackmig font-gilroyregular"
                            }
                          >
                            {data}
                          </p>
                          <img
                            onClick={() => deleteProduct(index)}
                            className={"w-5 h-5"}
                            src="/image/hardware/cancel.png"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className={"mt-3"}>
                    {locale == "en" ? (
                      <p className={"text-base text-blackmig"}>
                        Popular products in{" "}
                        {kindOfHardware ? kindOfHardware : ""}
                      </p>
                    ) : (
                      <p className={"text-base text-blackmig"}>
                        Produk {kindOfHardware ? kindOfHardware : ""} populer
                      </p>
                    )}
                    {hardwareSuggestion.length > 0 && (
                      <div className={"flex flex-row flex-wrap mt-3"}>
                        {hardwareSuggestion.map((data, index) => (
                          <div
                            onClick={() => handleSuggestionHardware(data)}
                            className={
                              " border bg-white border-transp45 rounded-[20px] py-1 px-2 flex flex-row mr-3 mt-3"
                            }
                          >
                            <p
                              className={
                                "text-[16px] text-darkgrey font-gilroyregular"
                              }
                            >
                              {data}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className={"mt-8 bg-lightgreen py-2.5 pl-2.5 rounded-lg"}
                  >
                    <p
                      className={"text-blackmig text-base font-gilroysemibold"}
                    >
                      {t.additionalinformation}
                    </p>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      label={
                        <p className={"text-base"}>
                          {" "}
                          {locale == "en"
                            ? " How many product in"
                            : " Berapa banyak produk"}
                          <span className={"font-gilroysemibold text-blackmig"}>
                            {kindOfHardware ? kindOfHardware : ""}{" "}
                          </span>
                          {locale == "en"
                            ? "you need? (pieces)"
                            : "yang anda butuhkan?"}
                        </p>
                      }
                      name={"manyproduct"}
                      rules={[
                        { message: "You must fill this field", required: true },
                      ]}
                    >
                      {/* <Form.Item name="input-number" noStyle> */}

                      <InputNumber
                        // value={manyTalent}
                        min={1}
                        name={"manyproduct"}
                        // max={10}
                        style={{
                          // border: "1px solid #B8B8B8",
                          // height: "37px",
                          width: "170px",
                          fontSize: "16px",
                        }}
                        onChange={onChangeManyProduct}
                      />

                      {/* </Form.Item> */}
                      {/* <span className="ant-form-text" style={{ marginLeft: 8 }}>
                        pieces
                      </span> */}
                    </Form.Item>
                    <Form.Item
                      name={"max_budget"}
                      label={
                        <p className={"text-base"}>
                          {t.whatisyourmaximumbudget}
                        </p>
                      }
                      rules={[{ required: true }]}
                    >
                      {/* <Form.Item name="input-number" noStyle> */}
                      <InputNumber
                        value={maxBudget}
                        name="max_budget"
                        formatter={(value) =>
                          `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\Rp\s?|(,*)/g, "")}
                        min={1}
                        // max={10}
                        style={{
                          // border: "1px solid #B8B8B8",
                          // height: "37px",
                          width: "170px",
                          fontSize: "16px",
                        }}
                        onChange={(value) => {
                          setMaxBudget(value);
                        }}
                      />
                      {/* </Form.Item> */}
                      {/* <span className="ant-form-text" style={{ marginLeft: 8 }}>
                        / piece / month
                      </span> */}
                    </Form.Item>
                    <Form.Item
                      name={"Details"}
                      className={" text-base"}
                      label={<p style={{ fontSize: "16px" }}>{t.details}</p>}
                      // rules={[{ required: true }]}
                    >
                      <TextArea
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "16px",
                        }}
                        name={"Details"}
                        onChange={(value) => {
                          setDetails(value.target.value);
                        }}
                        rows={4}
                        placeholder={t.tellusemorehardware}
                      />
                    </Form.Item>
                    <Form.Item
                      label={<p style={{ fontSize: "16px" }}>{t.attachment}</p>}
                    >
                      <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                      >
                        <Upload.Dragger
                          status={"success"}
                          className={"border-1 border-dashed border-accentblue"}
                          name="files"
                          maxCount={1}
                          onChange={onChangeFile}
                          accept=".pdf,.jpg,.jpeg,.png"
                          // action="/upload.do"
                          style={{ width: "298px", height: "180px" }}
                        >
                          <img
                            className="anticon anticon-inbox mt-3"
                            style={{ width: "48px", height: "32px" }}
                            src="/image/landingpage/upload.png"
                          />
                          <p className="text-xs font-gilroyregular px-9 mt-9">
                            {t.draganddrop}
                          </p>
                          <p className="text-xs font-gilroyregular mt-2">
                            {t.or}
                          </p>
                          <p className="text-xs font-gilroyregular text-bluemig mt-2">
                            {t.browse}
                          </p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                  </div>
                  <div className={"border border-dividermig w-full mt-9"} />
                  <div className={"mt-9 flex flex-row justify-between"}>
                    <button
                      className={"bg-white py-2 px-4"}
                      onClick={() => handleForm("second")}
                    >
                      <p className={"text-[18px] text-primarygreen"}>
                        {t.back}
                      </p>
                    </button>
                    {statusEdit ? (
                      <button
                        // onClick={form.submit}
                        // type="submit"
                        onClick={() => handleUpdateProduct()}
                        className={
                          "text-white bg-white border-2 border-primarygreen w-[289px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                        }
                      >
                        <p
                          className={
                            "text-[18px] text-primarygreen font-gilroysemibold"
                          }
                        >
                          I want to Update product
                        </p>
                        <img
                          className={"self-center"}
                          style={{ width: "20px", height: "20px" }}
                          src="/image/plus.png"
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => form.submit}
                        // type="submit"
                        // onClick={handleAddAnotherProduct}
                        className={
                          "text-white bg-white border-2 border-primarygreen w-[289px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                        }
                      >
                        <p
                          className={
                            "text-[18px] text-primarygreen font-gilroysemibold"
                          }
                        >
                          {t.iwanttoaddanotherproduct}
                        </p>
                        <img
                          className={"self-center"}
                          style={{ width: "20px", height: "20px" }}
                          src="/image/plus.png"
                        />
                      </button>
                    )}
                  </div>
                </Form>
              </div>
            ) : (
              <div className="w-[52%]">
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-[30px] text-blackmig font-gilroysemibold"}
                >
                  {t.choosemeetingdate}
                </p>
                <div
                  className={
                    "mt-9 bg-bgjoinmig  w-[788px]  px-3 py-2 rounded-lg flex flex-row"
                  }
                >
                  <img src={"image/software/information-circle.png"} />
                  <p className={"ml-3 text-base text-blackmig self-center"}>
                    {t.pleasechoosemeetingdate}
                  </p>
                </div>
                <div className={"flex flex-row mt-4"}>
                  <div className={"w-[392px]"}>
                    <div className="site-calendar-demo-card">
                      <Calendar
                        locale={locale == "en" ? "en" : "id"}
                        onChange={onPanelChange}
                        value={valueDate}
                        tileDisabled={tileDisabled}
                      />
                    </div>
                  </div>
                  <div className={"ml-8"}>
                    <p
                      className={"text-base text-blackmig font-gilroysemibold"}
                    >
                      {t.choosetime}
                    </p>
                    <p
                      className={
                        "text-base text-blackmig font-gilroyregular mt-1"
                      }
                    >
                      {t.meetingduration}: 30 {t.minutes}
                    </p>
                    <div className={"mt-4 flex flex-row"}>
                      <div
                        className={
                          "text-base text-blackmig font-gilroysemibold w-[174px]"
                        }
                      >
                        {dataMeetingTime.map((data) => (
                          <button
                            onClick={() =>
                              onChangeValueMeetingTime(
                                data.value,
                                data.label_meeting
                              )
                            }
                            className={
                              valueMeetingTime == data.value
                                ? "w-[174px] rounded bg-greenTrans20 border border-primarygreen py-2 px-[72px] mt-5"
                                : "mt-5 w-[174px] rounded bg-divider py-2 px-[72px]"
                            }
                          >
                            <p
                              className={
                                valueMeetingTime == data.value &&
                                "text-primarygreen"
                              }
                            >
                              {data.value}
                            </p>
                          </button>
                        ))}
                      </div>
                      <div
                        className={
                          "text-base text-blackmig font-gilroysemibold ml-4 w-[174px]"
                        }
                      >
                        {dataMeetingTime2.map((data) => (
                          <button
                            onClick={() =>
                              onChangeValueMeetingTime(
                                data.value,
                                data.label_meeting
                              )
                            }
                            className={
                              valueMeetingTime == data.value
                                ? "w-[174px] rounded bg-greenTrans20 border border-primarygreen py-2 px-[72px] mt-5"
                                : "mt-5 w-[174px] rounded bg-divider py-2 px-[72px]"
                            }
                          >
                            <p
                              className={
                                valueMeetingTime == data.value &&
                                "text-primarygreen"
                              }
                            >
                              {data.value}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"mt-[35px]"}>
                  <p className={"text-base text-blackmig font-gilroyregular"}>
                    {t.meetingtime}
                  </p>

                  {valueDateTemp == null ? (
                    <p className={"mt-1 text-redmig text-xs"}>
                      {t.pleasechooseyourdate}
                    </p>
                  ) : (
                    <div
                      className={"text-base text-blackmig font-gilroysemibold"}
                    >
                      <p className={""}>
                        {locale == "en"
                          ? moment(valueDateTemp)
                              .locale("en")
                              .format("dddd, DD MMMM YYYY")
                          : moment(valueDateTemp)
                              .locale("id")
                              .format("dddd, DD MMMM YYYY")}
                      </p>
                      <p>{labelMeetingTime}</p>
                    </div>
                  )}
                </div>
                <div className={"mt-4"}>
                  <ReCAPTCHA
                    ref={captchaRef}
                    onChange={changeCaptcha}
                    // sitekey={"6LdBDkkjAAAAAH9NtxIC8IhWeDbdbSfuKJUaR074"}
                    sitekey={`${process.env.NEXT_PUBLIC_G_RECAPTCHA_CID}`}
                  />
                </div>
                {captchaStatus && (
                  <div className="ant-form-item-explain-error">
                    <p>You must fill captcha</p>
                  </div>
                )}
                <div className={"mt-9 flex flex-row justify-between"}>
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("third")}
                  >
                    <p className={"text-[18px] text-primarygreen"}>{t.back}</p>
                  </button>
                  <button
                    type={"submit"}
                    onClick={() => submitFormSoftware("web")}
                    className={
                      "text-white bg-primarygreen w-[95px] rounded py-2 pl-4 pr-2.5 flex flex-row justify-between"
                    }
                  >
                    <p className={"text-[18px] text-white"}>{t.submit}</p>
                    <img
                      className={"self-center"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow_forward_ios2.png"
                    />
                  </button>
                </div>
              </div>
            )}
            {formActive == "third" ? (
              dataHardwareSummary.length > 0 && (
                <div
                  className={
                    "w-[400px] h-[100%] py-4 pl-4 pr-[17px] ml-5 top-20 sticky "
                  }
                  style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)" }}
                >
                  <p className={"font-gilroybold text-primarygreen text-base"}>
                    {t.hardwarerequestsummary}
                  </p>
                  <div className={"mt-3 border border-dividermig"} />
                  {dataHardwareSummary.map((data, index) => (
                    <div className={"mt-4   hover:bg-greenTrans5 w-full"}>
                      <div className={"flex flex-row"}>
                        <button
                          className={"bg-transparent w-[90%] text-left"}
                          onClick={() => handleEdit(index)}
                        >
                          <div className={""}>
                            <p
                              className={
                                "text-blackmig font-gilroysemibold text-sm "
                              }
                            >
                              {data.kindOfHardware}
                            </p>
                            <p
                              className={
                                "text-blackmig font-gilroyregular text-sm"
                              }
                            >
                              {data.timeUsed +
                                " month duration, " +
                                data.urgently +
                                " , " +
                                data.manyTalent +
                                " products"}
                            </p>
                            <div className={"flex"}>
                              <p
                                className={
                                  "text-blackmig text-xs font-gilroysemibold"
                                }
                              >
                                Hardware:{" "}
                                {data.product.map((data, index) => (
                                  <span
                                    className={
                                      "text-xs text-blackmig font-gilroyregular"
                                    }
                                  >
                                    {data}
                                    {" ,"}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </div>
                        </button>
                        <div className={"w-[10%] flex justify-end self-center"}>
                          <button
                            className={"bg-transparent"}
                            onClick={() =>
                              handleDeleteHardware(data.kindOfHardware, index)
                            }
                          >
                            <img src="image/trash.png" className={"w-6 h-6"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSubmitHardware}
                    className={
                      "mt-8 py-2 pl-4 bg-primarygreen pr-[9.3px] w-[176px] rounded"
                    }
                  >
                    <div className={"flex flex-row justify-between"}>
                      <p className={"text-white text-base font-gilroysemibold"}>
                        {t.submitrequest}
                      </p>
                      <div
                        className={
                          "w-[22px] h-[22px] bg-white rounded-[100px] items-center self-center"
                        }
                      >
                        <p
                          className={
                            "text-primarygreen text-base font-gilroysemibold"
                          }
                        >
                          {dataHardwareSummary.length}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )
            ) : (
              <div className={"w-[50%] lg:flex lg:justify-end"}>
                <img
                  className={"w-[607px] h-[354px]"}
                  src="/image/landingpage/Talents-2.png"
                />
              </div>
            )}
          </section>
          {/* section form mobile */}
          <section
            className={
              formActive == "first" ? "px-4 lg:hidden" : "px-4 lg:hidden"
            }
          >
            {formActive == "first" ? (
              <div className="">
                <p
                  style={{ lineHeight: "24px" }}
                  className={"text-xl text-primarygreen font-gilroysemibold"}
                >
                  {t.thankyouforyourinterest}
                </p>
                <p
                  style={{ lineHeight: "150%" }}
                  className={"mt-4 text-sm text-blackmig font-gilroyregular"}
                >
                  {t.beforewereach}
                </p>
                <div className="mt-6">
                  <Form
                    id="formcontact"
                    hidden={!feedback}
                    layout={"vertical"}
                    onFinish={handleSubmit}
                    form={form}
                  >
                    <div className={""}>
                      <Form.Item
                        name={t.companyname}
                        className={"text-base"}
                        label={
                          <p style={{ fontSize: "14px" }}>{t.companyname}</p>
                        }
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                            fontSize: "14px",
                          }}
                          name={t.companyname}
                          onChange={(e) => {
                            setDataHardware({
                              ...dataHardware,
                              company_name: e.target.value,
                            });
                          }}
                          placeholder={t.companynameplaceholder}
                        />
                      </Form.Item>
                      <Form.Item
                        name={"Email"}
                        initialValue={dataHardware.company_email}
                        className={" text-base -mt-2"}
                        label=<p style={{ fontSize: "14px" }}>Email</p>
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input
                          // disabled={true}
                          style={{
                            border: "1px solid #B8B8B8",
                            fontSize: "14px",
                          }}
                          name={"Email"}
                          onChange={(e) => {
                            setDataHardware({
                              ...dataHardware,
                              company_email: e.target.value,
                            });
                          }}
                          placeholder={t.talentheroemailplaceholder}
                        />
                      </Form.Item>
                    </div>
                    <div className={""}>
                      <Form.Item
                        name={"Contact Name"}
                        className={" text-base -mt-2"}
                        label={
                          <p style={{ fontSize: "14px" }}>{t.contactname}</p>
                        }
                        rules={[{ required: true }]}
                      >
                        <Input
                          style={{
                            border: "1px solid #B8B8B8",
                            height: "37px",
                            fontSize: "14px",
                          }}
                          name={"Contact Name"}
                          onChange={(e) => {
                            setDataHardware({
                              ...dataHardware,
                              name: e.target.value,
                            });
                          }}
                          placeholder={t.contactnameplaceholder}
                        />
                      </Form.Item>
                      <Form.Item
                        name={"Phone Number"}
                        className={" text-xs -mt-2"}
                        label={
                          <p style={{ fontSize: "14px" }}>{t.phonenumber}</p>
                        }
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[0-9]*$"),
                            message: "Please input valid phone number",
                          },
                        ]}
                      >
                        <Input
                          // style={{ border: "1px solid #B8B8B8",height:"37px" }}
                          addonBefore="+62"
                          name={"Phone Number"}
                          onChange={(e) => {
                            setDataHardware({
                              ...dataHardware,
                              phone_number: parseInt(e.target.value),
                            });
                          }}
                          style={{ fontSize: "14px" }}
                          placeholder={t.phonenumberplaceholder}
                        />
                      </Form.Item>
                    </div>
                    <div className={"border border-dividermig w-[90%]"}></div>
                    <Form.Item>
                      <div className={"w-full flex justify-center mt-2 mb-4"}>
                        <button
                          type={"submit"}
                          className={
                            "rounded text-white border-2 bg-primarygreen border-primarygreen py-2 pl-4 pr-[12.18px] mt-9"
                          }
                        >
                          <div className={"flex flex-row justify-between"}>
                            <p className={"text-base font-gilroysemibold"}>
                              {t.getstarted}
                            </p>
                            <img
                              className={"self-center ml-[13.52px]"}
                              style={{ width: "20px", height: "20px" }}
                              src="/image/landingpage/arrow_forward_ios2.png"
                            />
                          </div>
                        </button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            ) : formActive == "second" ? (
              <div className="w-full">
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-base text-blackmig font-gilroysemibold"}
                >
                  {t.generalinformation}
                </p>
                <p
                  style={{ lineHeight: "120%", fontSize: "14px" }}
                  className={"pt-9"}
                >
                  {t.whatisyourpurpose}
                </p>
                <div className={"mt-4"}>
                  <Radio.Group
                    onChange={onChangeValuePurpose}
                    value={valuePurpose}
                    buttonStyle={"solid"}
                  >
                    <Space direction="vertical">
                      <Radio
                        className="text-blackmig text-sm"
                        value={"I want to buy the product"}
                      >
                        {t.iwanttobuytheproduct}
                      </Radio>
                      <Radio
                        className="text-blackmig text-sm"
                        value={
                          "I want to lease the product and having hardware managed"
                        }
                      >
                        {t.iwanttoleasetheproduct}
                      </Radio>
                      <Radio
                        className="text-blackmig text-sm"
                        value={
                          "None of the above, I just want to know about the service"
                        }
                      >
                        {t.noneoftheabove}
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
                <div className={"border border-dividermig w-full mt-9"} />
                <div className={"mt-9 flex flex-row justify-between pb-4"}>
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("first")}
                  >
                    <p
                      className={
                        "text-base text-primarygreen font-gilroysemibold"
                      }
                    >
                      {t.back}
                    </p>
                  </button>
                  <button
                    onClick={() => handleForm("third")}
                    className={
                      "text-white bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                    }
                  >
                    <p className={"text-base text-white"}>{t.next}</p>
                    <img
                      className={"self-center ml-[13.52px]"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow_forward_ios2.png"
                    />
                  </button>
                </div>
              </div>
            ) : formActive == "third" ? (
              // hardware information form

              <div className="w-full  ">
                <Modal
                  open={modalDelete}
                  onCancel={handleCancelDelete}
                  width={392}
                  closeIcon={
                    <img
                      className={"w-[24px] mt-8 h-[24px]"}
                      src="/image/people/close.png"
                    />
                  }
                  footer={null}
                >
                  <div className={"text-center mx-auto"}>
                    <div className={"mt-9 grid justify-items-center"}>
                      <img
                        src="image/icon-warning.png"
                        className={"w-[72px] h-[72px]"}
                      />
                    </div>
                    <div className={"mt-8"}>
                      <p
                        className={
                          "font-gilroysemibold text-blackmig text-[32px]"
                        }
                      >
                        Delete
                      </p>
                      <p
                        className={
                          "mt-4 text-base text-blackmig font-gilroyregular"
                        }
                      >
                        Are you sure you want to remove{" "}
                        <span className={"font-gilroysemibold"}>
                          {deleteHardwareValue}
                        </span>{" "}
                        ?
                      </p>
                    </div>
                    <button
                      className={
                        "mt-8 py-2 px-[112.5px] bg-primarygreen rounded"
                      }
                      onClick={handleDeleteConfirm}
                    >
                      <p className={"text-base text-white font-gilroysemibold"}>
                        Delete Item
                      </p>
                    </button>
                    <button
                      className={
                        "mt-4 py-2 bg-white border border-primarygreen rounded px-[129px]"
                      }
                      onClick={handleCancelDelete}
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        Cancel
                      </p>
                    </button>
                  </div>
                </Modal>
                <Modal
                  open={modalSubmit}
                  onCancel={handleCancelSubmit}
                  width={392}
                  closeIcon={
                    <img
                      className={"w-[24px] mt-8 h-[24px]"}
                      src="/image/people/close.png"
                    />
                  }
                  footer={null}
                >
                  <div className={"text-center mx-auto"}>
                    <div className={"mt-9 grid justify-items-center"}>
                      <img
                        src="image/icon-warning.png"
                        className={"w-[72px] h-[72px]"}
                      />
                    </div>
                    <div className={"mt-8"}>
                      <p
                        className={
                          "font-gilroysemibold text-blackmig text-[32px]"
                        }
                      >
                        {t.submitrequest}
                      </p>
                      <div className={"mt-2 border border-dividermig px-8"} />
                      <p
                        className={
                          "mt-4 text-base text-blackmig font-gilroyregular"
                        }
                      >
                        {locale == "en"
                          ? "Are you sure you want to submit your request with only  "
                          : "Apakah Anda yakin untuk mengirim permintaan hanya dengan "}
                        <span className={"font-gilroysemibold"}>
                          {dataHardwareSummary.length}
                        </span>{" "}
                        {locale == "en" ? "item " : "produk "} ?
                      </p>
                    </div>
                    <button
                      className={"mt-8 py-2 px-[60px] bg-primarygreen rounded"}
                      onClick={handleSubmitConfirm}
                    >
                      <p className={"text-base text-white font-gilroysemibold"}>
                        {locale == "en"
                          ? "Yes, continue with "
                          : "Ya, lanjutkan dengan "}{" "}
                        {dataHardwareSummary.length}{" "}
                        {locale == "en" ? "item" : "produk"}
                      </p>
                    </button>
                    <button
                      className={
                        "mt-4 py-2 bg-white border border-primarygreen rounded px-[27.5px]"
                      }
                      onClick={handleCancelSubmit}
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        {t.noiwanttocomplete}{" "}
                      </p>
                    </button>
                  </div>
                </Modal>
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-base text-blackmig font-gilroysemibold py-9"}
                >
                  {t.hardwareinformation}
                </p>
                {/* <p style={{ lineHeight: "150%" }} className={"mt-9 text-base"}>
                  What kind of hardware are you looking for?
                </p> */}
                <Form
                  id="formhardware"
                  // hidden={!feedback}
                  layout={"vertical"}
                  onFinish={() => handleAddAnotherProduct()}
                  form={form}
                >
                  {/* <p className={"text-primarygreen text-base"}>
                    You can choose more than one
                  </p> */}
                  {/* choose product */}
                  <Form.Item
                    name="kind_of_hardware"
                    className={" text-sm"}
                    label={
                      <p style={{ fontSize: "14px" }}>{t.whatkindofhardware}</p>
                    }
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "This input is must be filled",
                    //   },
                    // ]}
                  >
                    <Select
                      style={{
                        border: "1px solid #B8B8B8",
                        fontSize: "14px",
                      }}
                      // dropdownStyle={{ backgroundColor: "green" }}
                      name="kind_of_hardware"
                      onChange={(value) => {
                        handleKindOfHardware(value);
                      }}
                      allowClear
                    >
                      <Option value="Bank Machinery">Bank Machinery</Option>
                      <Option value="Workstation">Workstation</Option>
                      <Option value="Server">Server & Hosting</Option>
                      <Option value="UPS">UPS</Option>
                      <Option value="Others">
                        {locale == "en" ? "Others" : "Lainnya"}
                      </Option>
                    </Select>
                  </Form.Item>

                  <div
                    className={"mt-8 bg-lightgreen py-2.5 pl-2.5 rounded-lg"}
                  >
                    <p
                      className={"text-blackmig text-base font-gilroysemibold"}
                    >
                      {t.hardwarespecification}
                    </p>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      name="time_need_product"
                      className={" text-sm"}
                      label={
                        <p style={{ fontSize: "14px" }}>
                          {t.howsoondoyouneedproject}
                        </p>
                      }
                      rules={[
                        {
                          required: true,
                          message: "This input is must be filled",
                        },
                      ]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "14px",
                        }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="time_need_product"
                        onChange={(value) => {
                          setUrgently(value);
                        }}
                        allowClear
                      >
                        <Option value="Within this week">
                          {t.withinthisweek}
                        </Option>
                        <Option value="Within this month">
                          {t.withinthismonth}
                        </Option>
                        <Option value="Next Month">{t.nextmonth}</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      name="time_used"
                      className={" text-sm"}
                      label={
                        <p style={{ fontSize: "14px" }}>{t.howlongdoyouneed}</p>
                      }
                      rules={[
                        {
                          required: true,
                          message: "This input is must be filled",
                        },
                      ]}
                    >
                      <Select
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "14px",
                        }}
                        // dropdownStyle={{ backgroundColor: "green" }}
                        name="time_used"
                        onChange={(value) => {
                          setTimeUsed(value);
                        }}
                        allowClear
                      >
                        <Option value="6">{t.lessthan6month}</Option>
                        <Option value="6 - 12">{t.until12month}</Option>
                        <Option value="12">{t.morethan6month}</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      name={"product"}
                      className={" text-base"}
                      label={
                        <p style={{ fontSize: "14px" }}>
                          {locale == "en" ? "*What product in " : " Produk"}
                          <span className={"font-gilroysemibold"}>
                            {kindOfHardware}
                          </span>{" "}
                          {locale == "en"
                            ? "do you need?"
                            : "apa yang anda butuhkan?"}
                        </p>
                      }
                      // rules={[{ required: true }]}
                    >
                      <Input
                        value={product}
                        style={{
                          border: "1px solid #B8B8B8",
                          height: "37px",
                          fontSize: "14px",
                        }}
                        name={"product"}
                        onChange={(e) => {
                          setProduct(e.target.value);
                        }}
                        onPressEnter={(e) => {
                          handleInputProduct(e.target.value);
                        }}
                        placeholder={t.enterproduct}
                      />
                    </Form.Item>
                  </div>
                  {console.log("product selected  render", productSelected)}
                  {productSelected.length > 0 && (
                    <div className={"flex flex-wrap w-full mt-3"}>
                      {productSelected.map((data, index) => (
                        <div
                          className={
                            "bg-transp45 rounded-[20px] py-2 pl-2 pr-2 flex flex-row mr-3 mt-2"
                          }
                        >
                          <p
                            className={
                              "text-sm text-blackmig font-gilroyregular"
                            }
                          >
                            {data}
                          </p>
                          <img
                            onClick={() => deleteProduct(index)}
                            className={"w-5 h-5"}
                            src="/image/hardware/cancel.png"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className={"mt-3"}>
                    {locale == "en" ? (
                      <p className={"text-sm text-blackmig"}>
                        Popular products in{" "}
                        {kindOfHardware ? kindOfHardware : ""}
                      </p>
                    ) : (
                      <p className={"text-sm text-blackmig"}>
                        Produk {kindOfHardware ? kindOfHardware : ""} populer
                      </p>
                    )}
                    {hardwareSuggestion.length > 0 && (
                      <div className={"flex flex-wrap mt-3"}>
                        {hardwareSuggestion.map((data, index) => (
                          <div
                            onClick={() => handleSuggestionHardware(data)}
                            className={
                              " border bg-white border-transp45 rounded-[20px] py-1 px-2 flex flex-row mr-3 mt-2"
                            }
                          >
                            <p
                              className={
                                "text-sm text-darkgrey font-gilroyregular"
                              }
                            >
                              {data}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className={"mt-8 bg-lightgreen py-2.5 pl-2.5 rounded-lg"}
                  >
                    <p className={"text-blackmig text-sm font-gilroysemibold"}>
                      {t.additionalinformation}
                    </p>
                  </div>
                  <div className={"mt-8"}>
                    <Form.Item
                      label={
                        <p className={"text-sm"}>
                          {" "}
                          {locale == "en"
                            ? "How many product in "
                            : "Berapa banyak produk "}
                          <span className={"font-gilroysemibold text-blackmig"}>
                            {kindOfHardware ? kindOfHardware : ""}{" "}
                          </span>
                          {locale == "en"
                            ? "you need? (pieces)"
                            : "yang anda butuhkan?"}
                        </p>
                      }
                      name={"manyproduct"}
                      rules={[
                        { message: "You must fill this field", required: true },
                      ]}
                    >
                      {/* <Form.Item name="input-number" noStyle> */}

                      <InputNumber
                        // value={manyTalent}
                        min={1}
                        name={"manyproduct"}
                        // max={10}
                        style={{
                          // border: "1px solid #B8B8B8",
                          // height: "37px",
                          width: "170px",
                          fontSize: "16px",
                        }}
                        onChange={onChangeManyProduct}
                      />

                      {/* </Form.Item> */}
                      {/* <span className="ant-form-text" style={{ marginLeft: 8 }}>
                        pieces
                      </span> */}
                    </Form.Item>
                    <Form.Item
                      name={"max_budget"}
                      label={
                        <p className={"text-sm"}>{t.whatisyourmaximumbudget}</p>
                      }
                      rules={[{ required: true }]}
                    >
                      {/* <Form.Item name="input-number" noStyle> */}
                      <InputNumber
                        value={maxBudget}
                        name="max_budget"
                        formatter={(value) =>
                          `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\Rp\s?|(,*)/g, "")}
                        min={1}
                        // max={10}
                        style={{
                          // border: "1px solid #B8B8B8",
                          // height: "37px",
                          width: "170px",
                          fontSize: "14px",
                        }}
                        onChange={(value) => {
                          setMaxBudget(value);
                        }}
                      />
                      {/* </Form.Item> */}
                      {/* <span className="ant-form-text" style={{ marginLeft: 8 }}>
                        / piece / month
                      </span> */}
                    </Form.Item>
                    <Form.Item
                      name={"Details"}
                      className={" text-base"}
                      label={<p style={{ fontSize: "16px" }}>{t.details}</p>}
                      // rules={[{ required: true }]}
                    >
                      <TextArea
                        style={{
                          border: "1px solid #B8B8B8",
                          fontSize: "16px",
                        }}
                        name={"Details"}
                        onChange={(value) => {
                          setDetails(value.target.value);
                        }}
                        rows={4}
                        placeholder={t.tellusemorehardware}
                      />
                    </Form.Item>
                    <Form.Item
                      label={<p style={{ fontSize: "16px" }}>{t.attachment}</p>}
                    >
                      <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                      >
                        <Upload.Dragger
                          status={"success"}
                          className={"border-1 border-dashed border-accentblue"}
                          name="files"
                          maxCount={1}
                          onChange={onChangeFile}
                          accept=".pdf,.jpg,.jpeg,.png"
                          // action="/upload.do"
                          style={{ width: "298px", height: "180px" }}
                        >
                          <img
                            className="anticon anticon-inbox mt-3"
                            style={{ width: "48px", height: "32px" }}
                            src="/image/landingpage/upload.png"
                          />
                          <p className="text-xs font-gilroyregular px-9 mt-9">
                            {t.draganddrop}
                          </p>
                          <p className="text-xs font-gilroyregular mt-2">
                            {t.or}
                          </p>
                          <p className="text-xs font-gilroyregular text-bluemig mt-2">
                            {t.browse}
                          </p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                  </div>
                  <div className={"border border-dividermig w-full mt-9"} />
                  <div className={"mt-9 flex flex-row justify-between pb-4"}>
                    <button
                      className={"bg-white py-2 px-4"}
                      onClick={() => handleForm("second")}
                    >
                      <p
                        className={
                          "text-base text-primarygreen font-gilroysemibold"
                        }
                      >
                        {t.back}
                      </p>
                    </button>
                    {statusEdit ? (
                      <button
                        // onClick={form.submit}
                        // type="submit"
                        onClick={() => handleUpdateProduct()}
                        className={
                          "text-white bg-white border-2 border-primarygreen w-[289px] rounded py-2 pl-4 pr-[16px] flex flex-row justify-between"
                        }
                      >
                        <p
                          className={
                            "text-sm text-primarygreen font-gilroysemibold"
                          }
                        >
                          I want to Update request
                        </p>
                        <img
                          className={"self-center ml-[12.17px]"}
                          style={{ width: "20px", height: "20px" }}
                          src="/image/plus.png"
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => form.submit}
                        // type="submit"
                        // onClick={handleAddAnotherProduct}
                        className={
                          "text-white bg-white border-2 border-primarygreen rounded py-2 pl-4 pr-[16px] flex flex-row justify-between"
                        }
                      >
                        <p
                          className={
                            "text-sm text-primarygreen font-gilroysemibold"
                          }
                        >
                          Add Request
                        </p>
                        <img
                          className={"self-center ml-[12.17px]"}
                          style={{ width: "20px", height: "20px" }}
                          src="/image/plus.png"
                        />
                      </button>
                    )}
                  </div>
                </Form>
              </div>
            ) : (
              <div className="w-full">
                <p
                  style={{ lineHeight: "120%" }}
                  className={"text-base text-blackmig font-gilroysemibold"}
                >
                  {t.choosemeetingdate}
                </p>
                <div className={"mt-9 bg-bgjoinmig px-3 py-2 rounded-lg"}>
                  <p className={"ml-3 text-xs text-blackmig self-center"}>
                    {t.pleasechoosemeetingdate}
                  </p>
                </div>
                <div className={"mt-9"}>
                  <div className={"w-full"}>
                    <p
                      className={
                        "text-sm text-blackmig font-gilroyregular mb-1"
                      }
                    >
                      *{t.meetingdate}
                    </p>
                    <div className="site-calendar-demo-card">
                      <Calendar
                        locale={"en"}
                        onChange={onPanelChange}
                        value={valueDate}
                        tileDisabled={tileDisabled}
                      />
                    </div>
                  </div>
                  <div className={"w-full mt-4"}>
                    <p
                      style={{ lineHeight: "18px" }}
                      className={"text-xs text-blackmig font-gilroysemibold"}
                    >
                      {t.choosetime}
                    </p>
                    <p
                      style={{ lineHeight: "18px" }}
                      className={
                        "text-xs text-blackmig font-gilroyregular mt-1"
                      }
                    >
                      {t.meetingduration}: 30 {t.minutes}
                    </p>
                    {valueDateTemp == null ? (
                      <p className={"mt-1 text-redmig text-xs"}>
                        * {t.pleasechooseyourdate}
                      </p>
                    ) : (
                      <div
                        className={"text-sm text-blackmig font-gilroysemibold"}
                      >
                        <p className={"text-sm"}>
                          {locale == "en"
                            ? moment(valueDateTemp)
                                .locale("en")
                                .format("dddd, DD MMMM YYYY")
                            : moment(valueDateTemp)
                                .locale("id")
                                .format("dddd, DD MMMM YYYY")}
                        </p>
                        <p>{labelMeetingTime}</p>
                      </div>
                    )}
                    {valueDateTemp != null && (
                      <div className={"mt-4 flex flex-col"}>
                        <div
                          className={
                            "text-xs text-blackmig font-gilroysemibold flex flex-row"
                          }
                        >
                          {dataMeetingTime.map((data) => (
                            <button
                              onClick={() =>
                                onChangeValueMeetingTime(
                                  data.value,
                                  data.label_meeting
                                )
                              }
                              className={
                                valueMeetingTime == data.value
                                  ? " rounded bg-greenTrans20 border border-primarygreen py-2 px-[21px] mt-5 mr-[13.33px]"
                                  : "mt-5 rounded bg-divider py-2 px-[21px] mr-[13.33px]"
                              }
                            >
                              <p
                                className={
                                  valueMeetingTime == data.value &&
                                  "text-primarygreen"
                                }
                              >
                                {data.value}
                              </p>
                            </button>
                          ))}
                        </div>
                        <div
                          className={
                            "text-xs text-blackmig font-gilroysemibold"
                          }
                        >
                          {dataMeetingTime2.map((data) => (
                            <button
                              onClick={() =>
                                onChangeValueMeetingTime(
                                  data.value,
                                  data.label_meeting
                                )
                              }
                              className={
                                valueMeetingTime == data.value
                                  ? "rounded bg-greenTrans20 border border-primarygreen py-2 px-[21px] mt-5 mr-[13.33px]"
                                  : "mt-5 rounded bg-divider py-2 px-[21px] mr-[13.33px]"
                              }
                            >
                              <p
                                className={
                                  valueMeetingTime == data.value &&
                                  "text-primarygreen"
                                }
                              >
                                {data.value}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={"mt-4"}>
                  <ReCAPTCHA
                    ref={captchaRefMobile}
                    onChange={changeCaptcha}
                    // sitekey={"6LdBDkkjAAAAAH9NtxIC8IhWeDbdbSfuKJUaR074"}
                    sitekey={`${process.env.NEXT_PUBLIC_G_RECAPTCHA_CID}`}
                  />
                </div>
                {captchaStatus && (
                  <div className="ant-form-item-explain-error">
                    <p>You must fill captcha</p>
                  </div>
                )}
                <div className={"mt-9 flex flex-row justify-between"}>
                  <button
                    className={"bg-white py-2 px-4"}
                    onClick={() => handleForm("third")}
                  >
                    <p
                      className={
                        "text-base text-primarygreen font-gilroysemibold"
                      }
                    >
                      {t.back}
                    </p>
                  </button>
                  <button
                    type={"submit"}
                    onClick={() => submitFormSoftware("mobile")}
                    className={
                      "text-white bg-primarygreen rounded py-2 pl-4 pr-[12.18px] flex flex-row justify-between"
                    }
                  >
                    <p className={"text-base text-white"}>{t.next}</p>
                    <img
                      className={"self-center ml-[13.52px]"}
                      style={{ width: "20px", height: "20px" }}
                      src="/image/landingpage/arrow_forward_ios2.png"
                    />
                  </button>
                </div>
              </div>
            )}
            {formActive == "third" ? (
              dataHardwareSummary.length > 0 && (
                <div
                  className={" h-[100%] py-4 pl-4 pr-[17px] mt-4 mb-4"}
                  style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)" }}
                >
                  <div className={"flex justify-between"}>
                    <p className={"font-gilroybold text-primarygreen text-sm"}>
                      {t.hardwarerequestsummary}
                    </p>
                    {showCollapsible ? (
                      <DownOutlined
                        onClick={() => setShowCollapsible(false)}
                        className={"self-center"}
                        style={{
                          height: "6.59px",
                          width: "11.18px",
                          color: "#188E4D",
                        }}
                      />
                    ) : (
                      <UpOutlined
                        onClick={() => setShowCollapsible(true)}
                        className={"self-center"}
                        style={{
                          height: "6.59px",
                          width: "11.18px",
                          color: "#188E4D",
                        }}
                      />
                    )}
                  </div>
                  <div className={"mt-3 border border-dividermig"} />
                  {dataHardwareSummary.map((data, index) =>
                    showCollapsible ? (
                      <div className={"mt-4   hover:bg-greenTrans5 w-full"}>
                        <div className={"flex flex-row"}>
                          <button
                            className={"bg-transparent w-[90%] text-left"}
                            onClick={() => handleEdit(index)}
                          >
                            <div className={""}>
                              <p
                                className={
                                  "text-blackmig font-gilroysemibold text-xs "
                                }
                              >
                                {data.kindOfHardware}
                              </p>
                              <p
                                className={
                                  "text-blackmig font-gilroyregular text-xs"
                                }
                              >
                                {data.timeUsed +
                                  " month duration, " +
                                  data.urgently +
                                  " , " +
                                  data.manyTalent +
                                  " products"}
                              </p>
                              <div className={"flex"}>
                                <p
                                  className={
                                    "text-blackmig text-xs font-gilroysemibold"
                                  }
                                >
                                  Hardware:{" "}
                                  {data.product.map((data, index) => (
                                    <span
                                      className={
                                        "text-xs text-blackmig font-gilroyregular"
                                      }
                                    >
                                      {data}
                                      {" ,"}
                                    </span>
                                  ))}
                                </p>
                              </div>
                            </div>
                          </button>
                          <div
                            className={"w-[10%] flex justify-end self-center"}
                          >
                            <button
                              className={"bg-transparent"}
                              onClick={() =>
                                handleDeleteHardware(data.kindOfHardware, index)
                              }
                            >
                              <img
                                src="image/trash.png"
                                className={"w-6 h-6"}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={"mt-4   hover:bg-greenTrans5 w-full"}>
                        <p
                          className={
                            "text-blackmig font-gilroysemibold text-xs "
                          }
                        >
                          {data.manyTalent + " products"}
                        </p>
                        <p className={"text-blackmig text-xs mt-2"}>
                          {data.kindOfHardware}
                        </p>
                      </div>
                    )
                  )}
                  <button
                    onClick={handleSubmitHardware}
                    className={
                      "mt-4 py-2 bg-primarygreen w-full rounded self-center"
                    }
                  >
                    <div className={"flex flex-row justify-center"}>
                      <p className={"text-white text-base font-gilroysemibold"}>
                        {t.submitrequest}
                      </p>
                      <div
                        className={
                          "w-[22px] h-[22px] ml-2 bg-white rounded-[100px] items-center self-center"
                        }
                      >
                        <p
                          className={
                            "text-primarygreen text-base font-gilroysemibold"
                          }
                        >
                          {dataHardwareSummary.length}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )
            ) : (
              <div className={"w-[50%] lg:flex lg:justify-end"}>
                {/* <img
                  className={"w-[607px] h-[354px]"}
                  src="/image/landingpage/Talents-2.png"
                /> */}
              </div>
            )}
          </section>
        </div>
      ) : showForm && showThankForm == true ? (
        <div className="grid justify-items-center">
          <ThankForm type_form={"Hardware"} />
        </div>
      ) : (
        <div className={"sectionhardware noform"}>
          <section className={"section2hardware py-4 lg:py-16 lg:px-[113.5px]"}>
            <div className={"hidden lg:flex  mt-16 justify-between mx-auto"}>
              <div className={"flex-col w-1/2"}>
                <h1
                  style={{ lineHeight: "120%" }}
                  className={"text-xl lg:text-[36px] pb-4 font-gilroysemibold"}
                >
                  {t.hardwareherosection}
                </h1>
                <p
                  style={{ lineHeight: "150%" }}
                  className={"mt:4 lg:mt-8 font-gilroyregular text-xl"}
                >
                  {t.hardwareherosectionsubtitle}
                </p>
                <div className={"mt-10"}>
                  <p
                    style={{ lineHeight: "150%" }}
                    className={"font-gilroybold text-primarygreen text-xl"}
                  >
                    {t.hardwarereachus}
                  </p>
                  <div className={"flex flex-row items-center mt-1"}>
                    <Input
                      name={"email"}
                      className={"w-[253px] h-[40px]"}
                      style={{
                        fontSize: 16,
                      }}
                      onChange={(e) => {
                        setDataHardware({
                          ...dataHardware,
                          company_email: e.target.value,
                        });
                      }}
                      placeholder={t.hardwareenteremail}
                    />
                    <button
                      onClick={handleLetsTalk}
                      className={
                        "text-[18px] text-center rounded ml-4 lg:w-[131px] py-1 lg:py-2 pl-2 pr-1 lg:pl-4 lg:pr-3 text-white border-2 bg-primarygreen border-primarygreen"
                      }
                    >
                      <div className={"flex flex-row justify-between"}>
                        <p
                          style={{ lineHeight: "120%" }}
                          className={" font-gilroysemibold"}
                        >
                          {locale == "en" ? "Let's talk!" : "Konsultasi gratis"}
                        </p>
                        <img
                          className={"w-[20px] h-[20px] self-center"}
                          src="/image/landingpage/arrow-circle-right.png"
                        />
                      </div>
                    </button>
                  </div>
                  {showEmailError && (
                    <div className={"mt-2"}>
                      <p
                        className={"text-redmig font-gilroysemibold text-base"}
                      >
                        {emailError}
                      </p>
                    </div>
                  )}
                  <div
                    className={
                      "mt-10 w-[495px] border rounded-lg p-2 bg-greentrans15"
                    }
                  >
                    <div className={"flex flex-row"}>
                      <img
                        className={"w-[20px] h-[20px] mr-2.5 mt-[2.5px]"}
                        src="/image/landingpage/info.png"
                      />
                      <div>
                        <p
                          className={
                            "text-base text-blackmig font-gilroyregular"
                          }
                        >
                          {t.hardwaregreenbox}
                        </p>
                        {locale == "en" ? (
                          <ul className={""}>
                            <li className={"mt-1"}>
                              <p
                                className={
                                  "text-base text-blackmig font-gilroyregular"
                                }
                              >
                                {""}
                                <span className={"font-bold"}>
                                  A predictable
                                </span>{" "}
                                monthly cost
                              </p>
                            </li>
                            <li className={"mt-1"}>
                              <p
                                className={
                                  "text-base text-blackmig font-gilroyregular"
                                }
                              >
                                {""}
                                <span className={"font-bold"}>
                                  A guaranteed
                                </span>{" "}
                                service level
                              </p>
                            </li>
                          </ul>
                        ) : (
                          <ul className={""}>
                            <li className={"mt-1"}>
                              <p
                                className={
                                  "text-base text-blackmig font-gilroyregular"
                                }
                              >
                                Biaya bulanan yang{" "}
                                <span className={"font-bold"}>
                                  dapat diprediksi.
                                </span>{" "}
                              </p>
                            </li>
                            <li className={"mt-1"}>
                              <p
                                className={
                                  "text-base text-blackmig font-gilroyregular"
                                }
                              >
                                Tingkat layanan yang {""}
                                <span className={"font-bold"}>
                                  terjamin.
                                </span>{" "}
                              </p>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"w-1/2 pl-[40px]"}>
                <img
                  src="/image/hardware/Hardware-Solution.png"
                  className={"w-4/5 h-auto"}
                />
              </div>
            </div>
            <div className={"block lg:hidden py-9 px-4"}>
              <div className={"px-3"}>
                <p
                  className={
                    "text-blackmig text-xl text-center font-gilroysemibold"
                  }
                >
                  {t.hardwareherosection}
                </p>
                <img
                  src="/image/hardware/Hardware-Solution.png"
                  className={"w-[304px] h-[174px] mt-6 mx-auto"}
                ></img>
                <p
                  className={
                    "py-6 text-center text-base font-gilroyregular text-blackmig mx-auto"
                  }
                >
                  {t.hardwareherosectionsubtitle}
                </p>
              </div>
              <div className={"w-[328px] mx-auto"}>
                <p className={"font-gilroysemibold text-primarygreen text-sm"}>
                  {t.hardwarereachus}
                </p>
                <div className={"flex flex-row items-center mt-1 mx-auto"}>
                  <Input
                    name={"email"}
                    className={"w-[241px] h-[37px]"}
                    onChange={(e) => {
                      setDataHardware({
                        ...dataHardware,
                        company_email: e.target.value,
                      });
                    }}
                    placeholder={t.hardwareenteremail}
                  />
                  <button
                    onClick={handleLetsTalk}
                    className={
                      "py-2 px-[29.5px] rounded ml-2 w-[79px] h-[36px]  border-2 bg-primarygreen border-primarygreen"
                    }
                  >
                    <img
                      className={"w-[16px] h-[16px]"}
                      src="/image/landingpage/arrow-circle-right.png"
                    />
                  </button>
                </div>
              </div>
              <div
                className={
                  "mt-6 w-[328px] border rounded-lg p-2 bg-greentrans15 mx-auto"
                }
              >
                <div className={"flex flex-row"}>
                  <img
                    className={"w-[20px] h-[20px] mr-1"}
                    src="/image/landingpage/info.png"
                  />
                  <div>
                    <p className={"text-sm text-blackmig font-gilroyregular"}>
                      {t.hardwaregreenbox}
                    </p>
                    <ul className={""}>
                      <li className={"mt-1"}>
                        <p
                          className={"text-sm text-blackmig font-gilroyregular"}
                        >
                          {""}
                          <span className={"font-bold"}>
                            A predictable
                          </span>{" "}
                          monthly cost
                        </p>
                      </li>
                      <li className={"mt-1"}>
                        <p
                          className={"text-sm text-blackmig font-gilroyregular"}
                        >
                          {""}
                          <span className={"font-bold"}>A guaranteed</span>{" "}
                          service level
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section jenis hardware */}
          <section
            className={
              "section2somehardwarebrowser bg-bgjoinmig py-4 lg:py-12 px-4 lg:px-[113.5px]"
            }
          >
            <div className={"container text-center mx-auto"}>
              {locale == "en" ? (
                <h2
                  style={{ lineHeight: "120%" }}
                  className={
                    "text-xl lg:text-[36px] px-8 lg:px-0 font-gilroysemibold"
                  }
                >
                  Explore our{" "}
                  <span
                    style={{
                      borderBottom: "solid 3px #188E4D",
                      paddingBottom: "2.5px",
                    }}
                  >
                    hardware
                  </span>{" "}
                  options
                </h2>
              ) : (
                <h2
                  style={{ lineHeight: "120%" }}
                  className={
                    "text-xl lg:text-[36px] px-8 lg:px-0 font-gilroysemibold"
                  }
                >
                  Jelajahi beragam{" "}
                  <span
                    style={{
                      borderBottom: "solid 3px #188E4D",
                      paddingBottom: "2.5px",
                    }}
                  >
                    hardware
                  </span>{" "}
                  kami.
                </h2>
              )}
              <div className={"hidden lg:block"}>
                {dataBanking && (
                  <div className={"flex flex-row mt-[42px] justify-between"}>
                    <div
                      className={
                        "w-[15%] flex flex-col justify-between text-center bg-lightblue rounded-lg p-3"
                      }
                    >
                      <p
                        style={{ lineHeight: "150%" }}
                        className={
                          "text-[22px] font-gilroybold text-accentblue"
                        }
                      >
                        Banking Machinery
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-base font-gilroysemibold italic text-blackmig"
                        }
                      >
                        {t.hardwarebankingsubtitle}
                      </p>
                      <div className={"self-center"}>
                        <button
                          className={"bg-lightblue"}
                          onClick={handleShowForm}
                        >
                          <div
                            className={
                              "flex flex-row justify-between px-4 py-3"
                            }
                          >
                            <p
                              className={
                                "text-xl text-accentblue font-gilroysemibold"
                              }
                            >
                              {locale == "en" ? "Get yours" : "Dapatkan produk"}
                            </p>
                            <img
                              src="/image/hardware/arrow_forward_ios_blue.png"
                              className={"w-[20px] h-[20px] self-center ml-2"}
                              alt=""
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className={"w-[85%] flex flex-row ml-[11px]"}>
                      {dataBanking.map((data, index) => (
                        <button
                          className="bg-white p-3 border border-divider rounded-lg w-[15%] text-center ml-[11px] flex flex-col justify-center items-center"
                          onClick={handleShowForm}
                        >
                          <img
                            src={generateStaticAssetUrl(
                              data.attachment_product.link
                            )}
                            className={"w-[128px] h-[90px]"}
                            alt=""
                          />
                          <p
                            style={{ lineHeight: "120%" }}
                            className={"mt-3 font-gilroybold text-xl"}
                          >
                            {data.name_product}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {dataWorkstation && (
                  <div className={"flex flex-row mt-8"}>
                    <div
                      className={
                        "w-[15%] flex flex-col justify-between text-center bg-lightgreen rounded-lg p-3"
                      }
                    >
                      <p
                        style={{ lineHeight: "150%" }}
                        className={
                          "text-[22px] font-gilroybold text-primarygreen"
                        }
                      >
                        Workstation
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-base font-gilroysemibold italic text-blackmig"
                        }
                      >
                        {t.hardwareworkstationsubtitle}
                      </p>
                      <div className={"self-center"}>
                        <button
                          className={"bg-lightgreen"}
                          onClick={handleShowForm}
                        >
                          <div
                            className={
                              "flex flex-row justify-between px-4 py-3"
                            }
                          >
                            <p
                              className={
                                "text-xl text-primarygreen font-gilroysemibold"
                              }
                            >
                              {locale == "en" ? "Get yours" : "Dapatkan produk"}
                            </p>
                            <img
                              src="/image/hardware/arrow_forward_ios_green.png"
                              className={"w-[20px] h-[20px] self-center ml-2"}
                              alt=""
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className={"w-[85%] flex flex-row ml-[11px]"}>
                      {dataWorkstation.map((data, index) => (
                        <button
                          className="bg-white p-3 border border-divider rounded-lg w-[15%] text-center ml-[11px] flex flex-col justify-center items-center"
                          onClick={handleShowForm}
                        >
                          <img
                            src={generateStaticAssetUrl(
                              data.attachment_product.link
                            )}
                            className={"w-[128px] h-[90px] self-center"}
                            alt=""
                          />
                          <p
                            style={{ lineHeight: "120%" }}
                            className={"mt-3 font-gilroybold text-xl"}
                          >
                            {data.name_product}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {dataServer && (
                  <div className={"flex flex-row mt-8"}>
                    <div
                      className={
                        "w-[15%] flex flex-col justify-between text-center bg-lightgrey rounded-lg p-3"
                      }
                    >
                      <p
                        style={{ lineHeight: "150%" }}
                        className={
                          "text-[22px] font-gilroybold text-primarygreen"
                        }
                      >
                        Server & Hosting
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-base font-gilroysemibold italic text-blackmig"
                        }
                      >
                        {t.hardwareserversubtitle}
                      </p>
                      <div className={"self-center"}>
                        <button
                          className={"bg-lightgrey"}
                          onClick={handleShowForm}
                        >
                          <div
                            className={
                              "flex flex-row justify-between px-4 py-3"
                            }
                          >
                            <p
                              className={
                                "text-xl text-primarygreen font-gilroysemibold"
                              }
                            >
                              {locale == "en" ? "Get yours" : "Dapatkan produk"}
                            </p>
                            <img
                              src="/image/hardware/arrow_forward_ios_green.png"
                              className={"w-[20px] h-[20px] self-center ml-2"}
                              alt=""
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className={"w-[85%] flex flex-row ml-[11px]"}>
                      {dataServer.map((data, index) => (
                        <button
                          className="bg-white p-3 border border-divider rounded-lg w-[15%] text-center ml-[11px] flex flex-col justify-center items-center"
                          onClick={handleShowForm}
                        >
                          <img
                            src={generateStaticAssetUrl(
                              data.attachment_product.link
                            )}
                            className={"w-[128px] h-[90px] self-center"}
                            alt=""
                          />
                          <p
                            style={{ lineHeight: "120%" }}
                            className={"mt-3 font-gilroybold text-xl"}
                          >
                            {data.name_product}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {dataUps && (
                  <div className={"flex flex-row mt-8"}>
                    <div
                      className={
                        "w-[15%] flex flex-col justify-between text-center bg-lightpink rounded-lg p-3"
                      }
                    >
                      <p
                        style={{ lineHeight: "150%" }}
                        className={
                          "text-[22px] font-gilroybold text-primarygreen"
                        }
                      >
                        UPS
                      </p>
                      <p
                        style={{ lineHeight: "120%" }}
                        className={
                          "text-base font-gilroysemibold italic text-blackmig"
                        }
                      >
                        {t.hardwareserversubtitle}
                      </p>
                      <div className={"self-center"}>
                        <button
                          className={"bg-lightpink"}
                          onClick={handleShowForm}
                        >
                          <div
                            className={
                              "flex flex-row justify-between px-4 py-3"
                            }
                          >
                            <p
                              className={
                                "text-xl text-primarygreen font-gilroysemibold"
                              }
                            >
                              {locale == "en" ? "Get yours" : "Dapatkan produk"}
                            </p>
                            <img
                              src="/image/hardware/arrow_forward_ios_green.png"
                              className={"w-[20px] h-[20px] self-center ml-2"}
                              alt=""
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className={"w-[85%] flex flex-row ml-[11px]"}>
                      {dataUps.map((data, index) => (
                        <button
                          className="bg-white p-3 border border-divider rounded-lg w-[15%] text-center ml-[11px] flex flex-col justify-center items-center"
                          onClick={handleShowForm}
                        >
                          <img
                            src={generateStaticAssetUrl(
                              data.attachment_product.link
                            )}
                            className={"w-[128px] h-[90px] self-center"}
                            alt=""
                          />
                          <p
                            style={{ lineHeight: "120%" }}
                            className={"mt-3 font-gilroybold text-xl"}
                          >
                            {data.name_product}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={"block lg:hidden"}>
                {dataBanking && (
                  <div className={"mt-7 px-2"}>
                    <p
                      className={
                        "text-base text-left text-blackmig font-gilroysemibold"
                      }
                    >
                      Banking Machinery
                    </p>
                    <Slider {...sliderSettingsPhone2}>
                      {dataBanking.map((data, index) => (
                        <div
                          onClick={handleShowForm}
                          className={
                            "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                          }
                        >
                          <img
                            className={"w-[110px] h-[77.79px]"}
                            src={generateStaticAssetUrl(
                              data.attachment_product.link
                            )}
                          />
                          <p
                            className={"text-blackmig font-gilroybold text-xs"}
                          >
                            {data.name_product}
                          </p>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
                {dataWorkstation && (
                  <div className={"mt-7 px-2"}>
                    <p
                      className={
                        "text-base text-left  text-blackmig font-gilroysemibold"
                      }
                    >
                      Workstation
                    </p>
                    <Slider {...sliderSettingsPhone2}>
                      {dataWorkstation.map((data, index) => (
                        <div
                          onClick={handleShowForm}
                          className={
                            "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                          }
                        >
                          <img
                            className={"w-[110px] h-[77.79px]"}
                            src={generateStaticAssetUrl(
                              data.attachment_product.link
                            )}
                          />
                          <p
                            className={"text-blackmig font-gilroybold text-xs"}
                          >
                            {data.name_product}
                          </p>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
                {dataServer && (
                  <div className={"mt-7 px-2"}>
                    <p
                      className={
                        "text-base text-left  text-blackmig font-gilroysemibold"
                      }
                    >
                      Server & Hosting
                    </p>

                    {dataServer.length >= 2 ? (
                      <Slider {...sliderSettingsPhone2}>
                        {dataServer.map((data, index) => (
                          <div
                            onClick={handleShowForm}
                            className={
                              "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                            }
                          >
                            <img
                              className={"w-[110px] h-[77.79px]"}
                              src={generateStaticAssetUrl(
                                data.attachment_product.link
                              )}
                            />
                            <p
                              className={
                                "text-blackmig font-gilroybold text-xs"
                              }
                            >
                              {data.name_product}
                            </p>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <div
                        onClick={handleShowForm}
                        className={
                          "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                        }
                      >
                        <img
                          className={"w-[110px] h-[77.79px]"}
                          src={generateStaticAssetUrl(
                            dataServer[0].attachment_product.link
                          )}
                        />
                        <p className={"text-blackmig font-gilroybold text-xs"}>
                          {dataServer[0].name_product}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {dataUps && (
                  <div className={"mt-7 px-2"}>
                    <p
                      className={
                        "text-base text-left  text-blackmig font-gilroysemibold"
                      }
                    >
                      UPS
                    </p>
                    {dataUps.length >= 2 ? (
                      <Slider {...sliderSettingsPhone2}>
                        {dataUps.map((data, index) => (
                          <div
                            onClick={handleShowForm}
                            className={
                              "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                            }
                          >
                            <img
                              className={"w-[110px] h-[77.79px]"}
                              src={generateStaticAssetUrl(
                                data.attachment_product.link
                              )}
                            />
                            <p
                              className={
                                "text-blackmig font-gilroybold text-xs"
                              }
                            >
                              {data.name_product}
                            </p>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <div
                        onClick={handleShowForm}
                        className={
                          "mt-2  bg-white w-[130px] p-[10.11px] px-[10px] mr-1"
                        }
                      >
                        <img
                          className={"w-[110px] h-[77.79px]"}
                          src={generateStaticAssetUrl(
                            dataUps[0].attachment_product.link
                          )}
                        />
                        <p className={"text-blackmig font-gilroybold text-xs"}>
                          {dataUps[0].name_product}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div
                className={
                  "mt-7 lg:mt-[42px] text-left lg:text-center lg:mx-auto lg:w-[646px]"
                }
              >
                <p
                  style={{ lineHeight: "120%" }}
                  className={
                    "font-gilroysemibold text-sm px-2 lg:px-0  lg:text-xl"
                  }
                >
                  {t.hardwarecustomizetext}
                </p>
                <p
                  style={{ lineHeight: "120%" }}
                  className={
                    "font-gilroyregular text-sm px-2 lg:px-0  lg:text-xl"
                  }
                >
                  {t.hardwarecustomizetext2}
                </p>
              </div>
              <div className={"mt-1 lg:mt-4 mx-auto"}>
                <Link href="/contactus">
                  <button
                    className={
                      "text-sm -mt-10 rounded text-primarygreen border-2 bg-white border-primarygreen px-4 py-2 lg:px-2 mt-4"
                    }
                  >
                    <p className={"text-xl  font-gilroysemibold"}>
                      {t.hardwarecustomizetextcta}
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <section
            className={
              "section3hardwarebrowser bg-transp60 py-4 lg:py-12 px-4 lg:px-[113.5px]"
            }
          >
            <div className={"flex lg:flex-row"}>
              <div className={"hidden lg:block w-2/5"}>
                <img
                  src="/image/people/People-Solution.png"
                  className={"w-full h-[282px]"}
                  alt=""
                />
              </div>
              <div className="flex flex-col lg:w-3/5 md:lg-[40px] ">
                <h2
                  style={{ lineHeight: "120%" }}
                  className="mb-2 text-[28px] text-center lg:text-left font-gilroysemibold text-blackmig"
                >
                  {locale == "en" ? "We are " : "Kami adalah "}
                  <span
                    style={{
                      borderBottom: "solid 3px #188E4D",
                      paddingBottom: "2.5px",
                    }}
                  >
                    {locale == "en" ? "the top choice " : "pilihan terbaik "}
                  </span>{" "}
                  {locale == "en"
                    ? "for managing your hardware."
                    : "untuk mengelola hardware Anda."}
                </h2>

                <div className={"block lg:hidden mx-auto my-[17px]"}>
                  <img
                    src="/image/people/People-Solution.png"
                    className={"w-[253px] h-[150px]"}
                    alt=""
                  />
                </div>
                <div className="flex flex-row mt-5">
                  <img
                    src="/image/landingpage/career-icon1.png"
                    className="w-[42px] h-[42px]"
                  />
                  <div>
                    <h5
                      style={{ lineHeight: "150%" }}
                      className="ml-3.5 text-sm lg:text-xl font-gilroysemibold text-blackmig"
                    >
                      {t.hardwarewhyussection1}
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
                    >
                      {t.hardwarewhyussection1description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-[17px]">
                  <img
                    src="/image/landingpage/career-icon2.png"
                    className="w-[42px] h-[42px]"
                  />
                  <div>
                    <h5
                      style={{ lineHeight: "150%" }}
                      className="ml-3.5 text-sm lg:text-xl font-gilroysemibold text-blackmig"
                    >
                      {t.hardwarewhyussection2}
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
                    >
                      {t.hardwarewhyussection2description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-[17px]">
                  <img
                    src="/image/landingpage/career-icon3.png"
                    className="w-[42px] h-[42px]"
                  />
                  <div>
                    <h5
                      style={{ lineHeight: "150%" }}
                      className="ml-3.5 text-sm lg:text-xl font-gilroysemibold text-blackmig"
                    >
                      {t.hardwarewhyussection3}
                    </h5>
                    <p
                      style={{ lineHeight: "150%" }}
                      className="text-left ml-3.5 text-xl text-blackmig font-gilroyregular"
                    >
                      {t.hardwarewhyussection3description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section how it work */}
          <section
            className={
              "section4howitworkbrowser bg-white py-4 lg:py-16 lg:mb-10 hidden lg:block px-4 sm:px-10 lg:px-[113.5px]"
            }
          >
            <div className={"container text-center mx-auto"}>
              <h2
                style={{ lineHeight: "120%" }}
                className={
                  "text-xl lg:text-[36px] font-gilroybold py-8 lg:py-0"
                }
              >
                {locale == "en"
                  ? "See how we handle your "
                  : "Pelajari cara kami mengelola "}
                <span
                  style={{
                    borderBottom: "solid 3px #188E4D",
                    paddingBottom: "2.5px",
                  }}
                >
                  {locale == "en"
                    ? " IT infrastructure."
                    : "infrastruktur teknologi Anda."}
                </span>{" "}
              </h2>
            </div>
            <div className={"flex flex-row justify-between mt-10"}>
              <div className={""}>
                <div className={"w-[360px]"}>
                  <img
                    className={"mx-auto"}
                    src="/image/hardware/hardware-work-1.png"
                    style={{ width: "145px", height: "145px" }}
                  />
                  <p
                    style={{ lineHeight: "150%" }}
                    className={
                      "text-blackmig text-sm lg:text-xl  font-gilroysemibold mt-4 text-center"
                    }
                  >
                    {t.hardwarehowitworksection1}
                  </p>
                </div>
              </div>
              <div className={"self-center"}>
                <img
                  src="/image/hardware/how-it-work-arrow.png"
                  style={{ width: "42px", height: "21px" }}
                />
              </div>
              <div className={"w-[360px]"}>
                <img
                  className={"mx-auto"}
                  src="/image/hardware/hardware-work-2.png"
                  style={{ width: "145px", height: "145px" }}
                />
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-blackmig text-sm lg:text-xl  font-gilroysemibold mt-4 text-center"
                  }
                >
                  {t.hardwarehowitworksection2}
                </p>
              </div>
              <div className={"self-center"}>
                <img
                  src="/image/hardware/how-it-work-arrow.png"
                  style={{ width: "42px", height: "21px" }}
                />
              </div>
              <div className={"w-[360px]"}>
                <img
                  className={"mx-auto"}
                  src="/image/hardware/hardware-work-3.png"
                  style={{ width: "145px", height: "145px" }}
                />
                <p
                  style={{ lineHeight: "150%" }}
                  className={
                    "text-blackmig text-sm lg:text-xl  font-gilroysemibold mt-4 text-center"
                  }
                >
                  {t.hardwarehowitworksection3}
                </p>
              </div>
            </div>
          </section>
          {/* section how it work mobile */}
          <section
            className={"section4howitworkmobile lg:hidden bg-white py-9 px-4"}
          >
            <p className="mb-2 text-2xl text-center font-gilroysemibold text-blackmig">
              {locale == "en"
                ? "See how we handle your "
                : "Pelajari cara kami mengelola "}
              <span
                style={{
                  borderBottom: "solid 3px #188E4D",
                  paddingBottom: "2.5px",
                }}
              >
                {locale == "en"
                  ? " IT infrastructure."
                  : "infrastruktur teknologi Anda."}
              </span>{" "}
            </p>
            <div className={"mt-4 flex flex-row"}>
              <img
                src="/image/hardware/how-it-work-mobile-1.png"
                className="w-[44px] h-[44px]"
              />
              <div className={"ml-3"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  {t.hardwarehowitworksection1}
                </p>
                {/* <p className={"text-sm text-blackmig font-gilroyregular"}>
                  We have extensive network and partnerships with hardware
                  principles ready to be leveraged for your advantage
                </p> */}
              </div>
            </div>
            <div className={"mt-4 flex flex-row"}>
              <img
                src="/image/hardware/how-it-work-mobile-2.png"
                className="w-[44px] h-[44px]"
              />
              <div className={"ml-3"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  {t.hardwarehowitworksection2}
                </p>
                {/* <p className={"text-sm text-blackmig font-gilroyregular"}>
                  We customize our procurement with your specification needs
                </p> */}
              </div>
            </div>
            <div className={"mt-4 flex flex-row"}>
              <img
                src="/image/hardware/how-it-work-mobile-3.png"
                className="w-[44px] h-[44px]"
              />
              <div className={"ml-3"}>
                <p className={"text-sm text-blackmig font-gilroysemibold"}>
                  {t.hardwarehowitworksection3}
                </p>
                {/* <p className={"text-sm text-blackmig font-gilroyregular"}>
                  We ensure guaranteed level of hardware performance throughout
                </p> */}
              </div>
            </div>
          </section>
          {/* testimonial */}
          {dataTestimonial && (
            <section
              className={
                "section3landingpageadvantages hidden lg:block bg-bgjoinmig py-8 lg:pt-8 lg:py-16 px-[30px] lg:px-10"
              }
            >
              <p
                className={
                  "text-xl lg:text-3xl text-center  font-gilroysemibold mb-[42px]"
                }
              >
                {t.customerstorieslandingpage}
              </p>
              <div className={"flex flex-row"}>
                {dataTestimonial ? (
                  dataTestimonial.length > 1 ? (
                    <button onClick={() => slider?.current?.slickPrev()}>
                      <div
                        className={
                          "self-center flex items-center justify-center  absolute left-[180px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                        }
                      >
                        <img
                          className={"grid justify-items-center"}
                          style={{ width: "40px", height: "40px" }}
                          src="/image/landingpage/arrow-sm-left.png"
                        />
                      </div>
                    </button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <div
                  className={"center lg:content-around hidden lg:block"}
                  style={{ maxWidth: 1000 }}
                >
                  <Slider {...sliderSettings2} ref={slider}>
                    {dataTestimonial
                      ? dataTestimonial.map((data1) => (
                          <div className="pt-6 pb-8 lg:px-16 bg-bgadvantagecard border border-advantagecard rounded-lg">
                            <div className={"flex flex-row justify-between"}>
                              <div className={"w-[45%]"}>
                                <div className={"flex relative self-center "}>
                                  {data1.attachment_article ? (
                                    <img
                                      className={"w-[356px] h-[237px] "}
                                      src={generateStaticAssetUrl(
                                        data1.attachment_article.link
                                      )}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      className={"w-[356px] h-[237px] "}
                                      src={
                                        "/image/landingpage/testimonial-client.png"
                                      }
                                      alt=""
                                    />
                                  )}
                                  {data1.quote && (
                                    <div
                                      className={
                                        "bg-white p-4 absolute -bottom-4 -right-[50px] w-[293px] mt-[115px] rounded-lg"
                                      }
                                      style={{
                                        boxShadow:
                                          "0px 16px 40px rgba(113, 176, 112, 0.2)",
                                      }}
                                    >
                                      {locale == "en" ? (
                                        <div
                                          className=""
                                          dangerouslySetInnerHTML={{
                                            __html: data1.quote,
                                          }}
                                        />
                                      ) : locale == "id" &&
                                        data1.quote_id != null ? (
                                        <div
                                          className=""
                                          dangerouslySetInnerHTML={{
                                            __html: data1.quote_id,
                                          }}
                                        />
                                      ) : (
                                        <div
                                          className=""
                                          dangerouslySetInnerHTML={{
                                            __html: data1.quote,
                                          }}
                                        />
                                      )}
                                      <div
                                        className={
                                          "mt-3 border border-dividermig w-[144px]"
                                        }
                                      />
                                      <p
                                        className={
                                          "mt-1 text-[10px] text-blackmig font-gilroysemibold"
                                        }
                                      >
                                        {data1.author}
                                      </p>
                                      <p
                                        className={
                                          "mt-1 text-[10px] text-blackmig  font-gilroyregular"
                                        }
                                      >
                                        {locale == "en"
                                          ? data1.job_title
                                          : locale == "id" &&
                                            data1.job_title_id != null
                                          ? data1.job_title_id
                                          : data1.job_title}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={"w-[45%]"}>
                                <div
                                  className={"flex flex-row justify-between"}
                                >
                                  <div>
                                    <h2
                                      style={{ lineHeight: "120%" }}
                                      className={
                                        "text-blackmig text-[22px] font-gilroysemibold"
                                      }
                                    >
                                      {locale == "en"
                                        ? data1.title
                                        : locale == "id" &&
                                          data1.title_id != null
                                        ? data1.title_id
                                        : data1.title}
                                    </h2>
                                    <p
                                      className={
                                        "text-primarygreen text-base font-gilroysemibold mt-1"
                                      }
                                    >
                                      {data1.company_name}
                                    </p>
                                  </div>
                                  <div>
                                    {data1.company_logo ? (
                                      <img
                                        className={"max-w-[100px] h-auto"}
                                        src={generateStaticAssetUrl(
                                          data1.company_logo.link
                                        )}
                                      />
                                    ) : (
                                      <img
                                        className={"max-w-[100px] h-auto"}
                                        src={
                                          "/image/landingpage/testimonial-client.png"
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="mt-4"
                                  dangerouslySetInnerHTML={{
                                    __html: data1.description,
                                  }}
                                />
                                {locale == "en" ? (
                                  <Linkk
                                    href={`/migwebsite/customerstories/${data1.page_path}`}
                                  >
                                    <button
                                      className={
                                        "text-sm rounded mt-8 pl-4 py-2 pr-[12.18px] text-white border-2 bg-primarygreen border-primarygreen"
                                      }
                                    >
                                      <div
                                        className={
                                          "flex flex-row justify-between"
                                        }
                                      >
                                        <p
                                          className={
                                            "pr-[13.52px] text-base font-gilroysemibold"
                                          }
                                        >
                                          Read Story
                                        </p>
                                        <img
                                          className={"w-5 h-5"}
                                          src="/image/landingpage/arrow_forward_ios2.png"
                                        />
                                      </div>
                                    </button>
                                  </Linkk>
                                ) : (
                                  <button
                                    onClick={() =>
                                      readTestimoni(data1.page_path_id)
                                    }
                                    className={
                                      "text-sm rounded mt-8 pl-4 py-2 pr-[12.18px] text-white border-2 bg-primarygreen border-primarygreen"
                                    }
                                  >
                                    <div
                                      className={
                                        "flex flex-row justify-between"
                                      }
                                    >
                                      <p
                                        className={
                                          "pr-[13.52px] text-base font-gilroysemibold"
                                        }
                                      >
                                        Baca Testimoni
                                      </p>
                                      <img
                                        className={"w-5 h-5"}
                                        src="/image/landingpage/arrow_forward_ios2.png"
                                      />
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </Slider>
                </div>
                {dataTestimonial ? (
                  dataTestimonial.length > 1 ? (
                    <button onClick={() => slider?.current?.slickNext()}>
                      <div
                        className={
                          "self-center flex items-center justify-center  absolute right-[180px] w-[53px] h-[53px] bg-bgIcon rounded-[500px]"
                        }
                      >
                        <img
                          className={"grid justify-items-center"}
                          style={{ width: "40px", height: "40px" }}
                          src="/image/landingpage/arrow-sm-right.png"
                        />
                      </div>
                    </button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </section>
          )}
          {/* testimonial mobile */}
          {dataTestimonial && (
            <section
              className={
                "sectiontestimonialmobile block lg:hidden bg-bgjoinmig py-8 lg:pt-8 lg:py-16 px-[30px] lg:px-10"
              }
            >
              <p
                className={
                  "text-xl lg:text-3xl text-center  font-gilroysemibold lg:py-0 mb-7 lg:mb-10"
                }
              >
                {t.customerstorieslandingpage}
              </p>
              <div className={"block lg:hidden"} style={{ maxWidth: 1000 }}>
                <Slider {...sliderSettingsPhone}>
                  {dataTestimonial.map((data1) => (
                    <div className={"p-4 bg-bgadvantagecard rounded-lg"}>
                      <div className={"flex flex-row justify-between"}>
                        <p className={"font-gilroybold text-sm text-blackmig"}>
                          {locale == "en" ? data1.title : data1.title_id}
                        </p>
                        {data1.company_logo ? (
                          <img
                            className="rounded-full max-w-[100px] h-auto"
                            src={generateStaticAssetUrl(
                              data1.company_logo.link
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            className="rounded-full max-w-[100px] h-auto"
                            src="/image/landingpage/testimonial-client.png"
                            alt=""
                          />
                        )}
                      </div>
                      <p
                        className={
                          "mt-1 text-primarygreen text-xs font-gilroybold"
                        }
                      >
                        {data1.company_name}
                      </p>
                      <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                          __html:
                            locale == "en"
                              ? data1.description
                              : data1.description_id,
                        }}
                      />
                      {data1.quote && (
                        <div
                          className={"mt-2 bg-white p-3"}
                          style={{
                            boxShadow: "0px 16px 40px rgba(112, 144, 176, 0.2)",
                          }}
                        >
                          <p className={"text-xs text-blackmig"}>
                            “{data1.quote}”
                          </p>
                          <div
                            className={"mt-3 border border-dividermig w-1/2"}
                          />
                          <p
                            className={
                              "mt-1 text-[10px] font-gilroysemibold text-blackmig"
                            }
                          >
                            {data1.author}
                          </p>
                          <p
                            className={
                              "mt-1 text-[10px] font-gilroyregular text-blackmig"
                            }
                          >
                            {locale == "en"
                              ? data1.job_title
                              : data1.job_title_id}
                          </p>
                        </div>
                      )}
                      <div className={"mt-3 flex justify-end"}>
                        {locale == "en" ? (
                          <Linkk
                            href={`/migwebsite/customerstories/${data1.page_path}`}
                          >
                            <button
                              className={
                                "bg-primarygreen pl-4 py-[9px] rounded pr-[13.18px] flex flex-row"
                              }
                            >
                              <p
                                className={
                                  "text-base text-white font-gilroysemibold"
                                }
                              >
                                Read Story
                              </p>
                              <img
                                className="w-[8.95px] h-[15.64px] self-center ml-[13.52px]"
                                src="/image/landingpage/arrow_forward_ios2.png"
                                alt=""
                              />
                            </button>
                          </Linkk>
                        ) : (
                          <button
                            onClick={() => readTestimoni(data1.page_path_id)}
                            className={
                              "bg-primarygreen pl-4 py-[9px] rounded pr-[13.18px] flex flex-row"
                            }
                          >
                            <p
                              className={
                                "text-base text-white font-gilroysemibold"
                              }
                            >
                              Baca Testimoni
                            </p>
                            <img
                              className="w-[8.95px] h-[15.64px] self-center ml-[13.52px]"
                              src="/image/landingpage/arrow_forward_ios2.png"
                              alt=""
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className={"block lg:hidden mt-16 flex justify-center"}>
                <Linkk href={`/migwebsite/customerstories`}>
                  <button className={"w-[142px] py-2 px-4 bg-bgjoinmig"}>
                    <div className={"flex flex-row justify-around"}>
                      <p
                        className={
                          "text-base text-primarygreen  font-gilroysemibold"
                        }
                      >
                        {locale == "en" ? "Read More" : "Baca Lainnya"}
                      </p>
                      <img
                        className={"self-center"}
                        style={{ height: "15.64px", width: "8.95px" }}
                        src="/image/landingpage/arrow-forward-ios.png"
                      />
                    </div>
                  </button>
                </Linkk>
              </div>
            </section>
          )}
          {/* coverages */}
          <section
            className={
              "sectioncoverages hidden lg:block bg-transp60 pt-8 pb-32 px-4 sm:px-10 lg:px-[113.5px]"
            }
          >
            <h2
              style={{ lineHeight: "120%" }}
              className={
                "text-xl lg:text-[36px] text-blackmig text-center  font-gilroysemibold py-8 lg:py-0 mb-10"
              }
            >
              {locale == "en" ? "Coverages" : "Area jangkauan kami"}
            </h2>
            <div
              className={"bg-white p-12 items-center w-[788px] mx-auto"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <ul className={"coverage-list text-[18px]"}>
                <li>
                  <p href="">Banda Aceh</p>
                </li>
                <li>
                  <p href="">Medan</p>
                </li>
                <li>
                  <p href="">Padang</p>
                </li>
                <li>
                  <p href="">Jambi</p>
                </li>
                <li>
                  <p href="">Pekanbaru</p>
                </li>
                <li>
                  <p href="">Batam</p>
                </li>
                <li>
                  <p href="">Tanjung pinang</p>
                </li>
                <li>
                  <p href="">Jakarta</p>
                </li>
                <li>
                  <p href="">Bekasi</p>
                </li>
                <li>
                  <p href="">Depok</p>
                </li>
                <li>
                  <p href="">Karawang</p>
                </li>
                <li>
                  <p href="">Cilegon</p>
                </li>
                <li>
                  <p href="">Sukabumi</p>
                </li>
                <li>
                  <p href="">Bandar lampung</p>
                </li>
                <li>
                  <p href="">Palembang</p>
                </li>
                <li>
                  <p href="">Bandung</p>
                </li>
                <li>
                  <p href="">Tasikmalaya</p>
                </li>
                <li>
                  <p href="">Cirebon</p>
                </li>
                <li>
                  <p href="">Semarang</p>
                </li>
                <li>
                  <p href="">Purwokerto</p>
                </li>
                <li>
                  <p href="">Tegal</p>
                </li>
                <li>
                  <p href="">Yogyakarta</p>
                </li>
                <li>
                  <p href="">Magelang</p>
                </li>
                <li>
                  <p href="">Solo</p>
                </li>
                <li>
                  <p href="">Surabaya</p>
                </li>
                <li>
                  <p href="">Madiun</p>
                </li>
                <li>
                  <p href="">Sidoarjo</p>
                </li>
                <li>
                  <p href="">Malang</p>
                </li>
                <li>
                  <p href="">Kediri</p>
                </li>
                <li>
                  <p href="">Bogor</p>
                </li>
                <li>
                  <p href="">Probolingo</p>
                </li>
                <li>
                  <p href="">Banyuwangi</p>
                </li>
                <li>
                  <p href="">Jember</p>
                </li>
                <li>
                  <p href="">Bali</p>
                </li>
                <li>
                  <p href="">Mataram</p>
                </li>
                <li>
                  <p href="">Kupang</p>
                </li>
                <li>
                  <p href="">Samarinda</p>
                </li>
                <li>
                  <p href="">Banjarmasin</p>
                </li>
                <li>
                  <p href="">Pontianak</p>
                </li>
                <li>
                  <p href="">Balikpapan</p>
                </li>
                <li>
                  <p href="">Makasar</p>
                </li>
                <li>
                  <p href="">Sorong</p>
                </li>
                <li>
                  <p href="">Palu</p>
                </li>
                <li>
                  <p href="">Manado</p>
                </li>
                <li>
                  <p href="">Pare-pare</p>
                </li>
              </ul>
            </div>
          </section>
          {/*coverages mobile */}
          <section
            className={
              "sectioncoveragesmobile block lg:hidden bg-transp60 pt-4 px-4 py-[118px]"
            }
          >
            <p
              className={
                "text-xl text-blackmig text-center  font-gilroysemibold"
              }
            >
              {locale == "en" ? "Coverages" : "Area jangkauan kami"}
            </p>
            <div
              className={"bg-white p-6 mt-4 mx-auto"}
              style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)" }}
            >
              <ul className={"coverage-list"}>
                <li>
                  <p href="">Banda Aceh</p>
                </li>
                <li>
                  <p href="">Medan</p>
                </li>
                <li>
                  <p href="">Padang</p>
                </li>
                <li>
                  <p href="">Jambi</p>
                </li>
                <li>
                  <p href="">Pekanbaru</p>
                </li>
                <li>
                  <p href="">Batam</p>
                </li>
                <li>
                  <p href="">Tanjung pinang</p>
                </li>
                <li>
                  <p href="">Jakarta</p>
                </li>
                <li>
                  <p href="">Bekasi</p>
                </li>
                <li>
                  <p href="">Depok</p>
                </li>
                <li>
                  <p href="">Karawang</p>
                </li>
                <li>
                  <p href="">Cilegon</p>
                </li>
                <li>
                  <p href="">Sukabumi</p>
                </li>
                <li>
                  <p href="">Bandar lampung</p>
                </li>
                <li>
                  <p href="">Palembang</p>
                </li>
                <li>
                  <p href="">Bandung</p>
                </li>
                <li>
                  <p href="">Tasikmalaya</p>
                </li>
                <li>
                  <p href="">Cirebon</p>
                </li>
                <li>
                  <p href="">Semarang</p>
                </li>
                <li>
                  <p href="">Purwokerto</p>
                </li>
                <li>
                  <p href="">Tegal</p>
                </li>
                <li>
                  <p href="">Yogyakarta</p>
                </li>
                <li>
                  <p href="">Magelang</p>
                </li>
                <li>
                  <p href="">Solo</p>
                </li>
                <li>
                  <p href="">Surabaya</p>
                </li>
                <li>
                  <p href="">Madiun</p>
                </li>
                <li>
                  <p href="">Sidoarjo</p>
                </li>
                <li>
                  <p href="">Malang</p>
                </li>
                <li>
                  <p href="">Kediri</p>
                </li>
                <li>
                  <p href="">Bogor</p>
                </li>
                <li>
                  <p href="">Probolingo</p>
                </li>
                <li>
                  <p href="">Banyuwangi</p>
                </li>
                <li>
                  <p href="">Jember</p>
                </li>
                <li>
                  <p href="">Bali</p>
                </li>
                <li>
                  <p href="">Mataram</p>
                </li>
                <li>
                  <p href="">Kupang</p>
                </li>
                <li>
                  <p href="">Samarinda</p>
                </li>
                <li>
                  <p href="">Banjarmasin</p>
                </li>
                <li>
                  <p href="">Pontianak</p>
                </li>
                <li>
                  <p href="">Balikpapan</p>
                </li>
                <li>
                  <p href="">Makasar</p>
                </li>
                <li>
                  <p href="">Sorong</p>
                </li>
                <li>
                  <p href="">Palu</p>
                </li>
                <li>
                  <p href="">Manado</p>
                </li>
                <li>
                  <p href="">Pare-pare</p>
                </li>
              </ul>
            </div>
          </section>
          <section
            className={
              "youronestop hidden lg:block lg:flex lg:flex-row lg:justify-between bg-bgfooter pt-[113.5px] h-[173px]"
            }
          >
            <div className={"justify-start self-end"}>
              <img
                style={{ width: "332px", height: "142px" }}
                src="/image/landingpage/footer-left.png"
              />
            </div>
            <div className={"container w-1/2 mx-auto"}>
              <div
                className={
                  "bg-white border-3 mx-auto max-w-[645px] border-solid shadow-2xl rounded-lg text-center -mt-[220px] py-[31.38px]  px-[31.38px]"
                }
              >
                <h2
                  style={{ lineHeight: "120%" }}
                  className={"text-[28px] font-gilroysemibold text-black"}
                >
                  {t.contactussectiontitle}
                </h2>
                <div
                  className={
                    "mt-3.5 text-xl font-gilroyregular text-center text-black"
                  }
                >
                  <p style={{ lineHeight: "120%" }}>
                    {t.contactussectionsubtitle1}
                  </p>
                  <p style={{ lineHeight: "120%" }}>
                    {t.contactussectionsubtitle2}
                  </p>
                </div>
                <div className="mt-3.5 flex flex-row justify-center">
                  <div className={"mr-3.5"}>
                    <Linkk href="/contactus">
                      <button
                        className={
                          "text-sm px-4 py-2 text-white border-2 rounded bg-primarygreen border-primarygreen"
                        }
                      >
                        <p className={"text-xl font-gilroysemibold"}>
                          {t.ctacontactuslandingpage}
                        </p>
                      </button>
                    </Linkk>
                  </div>
                  <div>
                    <Linkk href="/aboutus">
                      <button
                        className={
                          "text-sm px-4 py-2 text-primarygreen border-2 rounded bg-white border-primarygreen"
                        }
                      >
                        <p className={"text-xl font-gilroysemibold"}>
                          {t.ctalearnmorelandingpage}
                        </p>
                      </button>
                    </Linkk>
                  </div>
                </div>
              </div>
            </div>
            <div className={"justify-end  self-end"}>
              <img
                className={"w-[332px] h-[142px]"}
                src="/image/landingpage/footer-right.png"
              />
            </div>
          </section>
          <section
            className={
              "contactusphone mt-[30px] block lg:hidden bg-bgfooter pt-8"
            }
          >
            <div className={"container mx-auto"}>
              <div
                className={
                  "bg-white border-3 border-solid shadow-2xl rounded-[8px] text-center mx-5  -mt-24 py-4 px-8"
                }
              >
                <p className={"text-xl font-gilroysemibold"}>
                  {t.contactussectiontitle}
                </p>
                <p className={" text-sm font-gilroyregular"}>
                  {t.contactussectionsubtitle1}
                </p>
                <p className={"text-sm font-gilroyregular"}>
                  {t.contactussectionsubtitle2}
                </p>
                <div className="mt-4 flex flex-row justify-center">
                  <div className={"mr-1.5"}>
                    <Linkk href="/contactus">
                      <button
                        className={
                          "text-sm px-4 py-2 text-white border-2 rounded bg-primarygreen border-primarygreen"
                        }
                      >
                        <p className={"text-base font-gilroysemibold"}>
                          {t.ctacontactuslandingpage}
                        </p>
                      </button>
                    </Linkk>
                  </div>
                  <div>
                    <Linkk href="/aboutus">
                      <button
                        className={
                          "text-sm px-4 py-2 text-primarygreen border-2 rounded bg-white border-primarygreen"
                        }
                      >
                        <p className={"text-base font-gilroysemibold"}>
                          {t.ctalearnmorelandingpage}
                        </p>
                      </button>
                    </Linkk>
                  </div>
                </div>
              </div>
            </div>
            <div className={"flex justify-between self-end mt-[7.61px]"}>
              <img
                style={{ width: "160px", height: "69px" }}
                src="/image/landingpage/footer-left.png"
              />
              <img
                style={{ width: "160px", height: "69px" }}
                src="/image/landingpage/footer-right.png"
              />
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}

export default Hardware;
