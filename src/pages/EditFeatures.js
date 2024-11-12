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
    console.log(featuresStructure, "featuresStructure");
    console.log(featureValues, "featureValues");
  }, [featuresStructure, featureValues]);
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

  const handleKeyDown = (event) => {
    const key = event.key;
    const isNumberKey = /^[0-9]$/.test(key);
    const isAllowedKey =
      isNumberKey ||
      key === "Backspace" ||
      key === "Delete" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "Tab";

    if (!isAllowedKey) {
      event.preventDefault();
    }
  };

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
                min="0"
                onKeyDown={handleKeyDown}
                className="form-control"
                id={label}
                name={label}
                type="number"
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
                <option value="">Select</option>
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
                // onChange={(selectedOption) =>
                //   handleChange(
                //     label,
                //     selectedOption ? selectedOption.value : ""
                //   )
                // }
                onKeyDown={handleKeyDown}
                onChange={(selectedOption) => {
                  const value = selectedOption.value;
                  // Check if the value is a valid number and is non-negative
                  if (
                    /^\d*\.?\d*$/.test(value) &&
                    (value >= 0 || value === "")
                  ) {
                    handleChange(
                      label,
                      selectedOption ? selectedOption.value : ""
                    );
                  }
                }}
                options={getOptions(options)}
                isClearable
                placeholder="US or EU size"
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
