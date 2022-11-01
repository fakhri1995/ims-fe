import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NAME_FORMAT = "[candidate_name]";
const ROLE_FORMAT = "[role_name]";

function insertNameVar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, NAME_FORMAT);
  this.quill.setSelection(cursorPosition + NAME_FORMAT.length);
}

function insertRoleVar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, ROLE_FORMAT);
  this.quill.setSelection(cursorPosition + ROLE_FORMAT.length);
}

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
    <span className="ql-formats">
      <button className="ql-link"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-insert_name">Name</button>
      <button className="ql-insert_role">Role</button>
    </span>
  </div>
);

const CustomTextEditor = ({ placeholder, value, onChange }) => {
  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insert_name: insertNameVar,
        insert_role: insertRoleVar,
      },
    },
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

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
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

export default CustomTextEditor;
