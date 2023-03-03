import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";

import { generateStaticAssetUrl, objectToFormData } from "../../lib/helper";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

const CustomToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
    </span>
  </div>
);

const RichText = ({ placeholder, value, onChange, initProps }) => {
  const editorRef = React.useRef(null);
  const imageHandler = (a) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        console.warn("You could only upload images.");
      }
    };
  };

  function saveToServer(file) {
    let dataImage = {
      attachment_content: file,
    };
    let formData = objectToFormData(dataImage);
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploadFile`;
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
        let url_upload = generateStaticAssetUrl(res2.data.new_data.link);
        insertToEditor(url_upload);
      });
  }
  function insertToEditor(url) {
    let position = editorRef.current.selection;
    editorRef.current.getEditor().insertEmbed(position, "image", url);
  }

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline"],
          [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const formats = [
    "bold",
    "italic",
    "underline",
    "header",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="text-editor">
      {/* <CustomToolbar /> */}
      <ReactQuill
        forwardedRef={editorRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="h-44 pb-10"
      />
    </div>
  );
};

export default RichText;
