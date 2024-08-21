import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const NAME_FORMAT = "[candidate_name]";
const ROLE_FORMAT = "[role_name]";

function insertNameVar() {
  const cursorPosition = this.quill.getSelection()?.index;
  if (cursorPosition !== null && cursorPosition !== undefined) {
    this.quill.insertText(cursorPosition, NAME_FORMAT);
    this.quill.setSelection(cursorPosition + NAME_FORMAT.length);
  }
}

function insertRoleVar() {
  const cursorPosition = this.quill.getSelection().index;
  if (cursorPosition !== null && cursorPosition !== undefined) {
    this.quill.insertText(cursorPosition, ROLE_FORMAT);
    this.quill.setSelection(cursorPosition + ROLE_FORMAT.length);
  }
}

export const modules = (toolbarId) => {
  return {
    toolbar: {
      container: `#${toolbarId}`,
      handlers: {
        insert_name: insertNameVar,
        insert_role: insertRoleVar,
      },
    },
  };
};

export const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "indent",
  "link",
];

const CustomToolbar = ({ toolbarId, onMounted }) => {
  useEffect(() => {
    onMounted();
  }, [onMounted]);

  return (
    <div id={toolbarId}>
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
};

export default CustomToolbar;
