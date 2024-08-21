import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

import CustomToolbar, { formats, modules } from "./CustomToolbar";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CustomTextEditor = ({ placeholder, value, onChange }) => {
  const [toolbarMounted, setToolbarMounted] = useState(false);

  const generateRandomId = () => {
    return `toolbar-${Math.random().toString(36).substring(2, 9)}`;
  };
  const toolbarId = useMemo(() => generateRandomId(), []);

  return (
    <div className="text-editor">
      <CustomToolbar
        toolbarId={toolbarId}
        onMounted={() => setToolbarMounted(true)}
      />
      {toolbarMounted && (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules(toolbarId)}
          formats={formats}
          className="h-44 pb-10"
        />
      )}
    </div>
  );
};

export default CustomTextEditor;
