import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  console.log(value, "value");
  return <ReactQuill value={value} onChange={onChange} />;
};

export default RichTextEditor;
