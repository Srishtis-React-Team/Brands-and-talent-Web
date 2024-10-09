import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange, from }) => {
  console.log(from, "from");
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      placeholder={
        from === "service"
          ? "Offering professional photoshoots tailored to your brand's needs, including fashion, product, or lifestyle photography."
          : ""
      }
    />
  );
};

export default RichTextEditor;
