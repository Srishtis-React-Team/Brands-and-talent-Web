import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/kidsformthree.css";
import "../assets/css/register.css";
import "../assets/css/kidsmain.scss";
import "../assets/css/createjobs.css";
import "../assets/css/talent-profile.css";

const EditFeatures = ({ featuresStructure, featureValues, onValuesChange }) => {
  const [formValues, setFormValues] = useState([]);

  // Initialize state with featureValues
  useEffect(() => {
    const initialValues = featuresStructure.map((feature) => {
      const existingValue = featureValues.find(
        (item) => item.label === feature.label
      );
      return {
        label: feature.label,
        value: existingValue ? existingValue.value : "",
      };
    });
    setFormValues(initialValues);
  }, [featuresStructure, featureValues]);

  // Handle changes for input, select, and creatableSelect
  const handleChange = (name, value) => {
    const newValues = formValues.map((item) =>
      item.label === name ? { ...item, value } : item
    );
    setFormValues(newValues);
    onValuesChange(newValues);
  };

  // Convert options to the format expected by CreatableSelect
  const getOptions = (options) =>
    options.map((option) => ({ value: option, label: option }));

  return (
    <div className="edit-features-wrapper">
      {featuresStructure.map((feature, index) => {
        const { label, type, options } = feature;
        const item = formValues.find((item) => item.label === label);
        const value = item ? item.value : "";

        if (type === "input") {
          return (
            <div key={index} className="features-seperator">
              <label htmlFor={label}>{label}</label>
              <input
                className="form-control"
                id={label}
                name={label}
                type="text"
                value={value}
                onChange={(e) => handleChange(label, e.target.value)}
                placeholder={options[0] || ""}
              />
            </div>
          );
        } else if (type === "select") {
          return (
            <div key={index} className="features-seperator">
              <label htmlFor={label}>{label}</label>
              <select
                className="form-select"
                id={label}
                name={label}
                value={value}
                onChange={(e) => handleChange(label, e.target.value)}
              >
                <option value="">Select...</option>
                {options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        } else if (type === "creatableSelect") {
          return (
            <div key={index} className="features-seperator">
              <label htmlFor={label}>{label}</label>
              <CreatableSelect
                id={label}
                name={label}
                value={value ? { label: value, value } : null}
                onChange={(selectedOption) =>
                  handleChange(
                    label,
                    selectedOption ? selectedOption.value : ""
                  )
                }
                options={getOptions(options)}
                isClearable
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default EditFeatures;
