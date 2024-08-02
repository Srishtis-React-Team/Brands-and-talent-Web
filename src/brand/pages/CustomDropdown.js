import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const CustomDropdown = ({
  categoryList,
  selectCategory,
  category,
  categoryError,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    selectCategory({ target: { value: option.name } });
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className="custom-dropdown-select"
        onClick={() => setIsOpen(!isOpen)}
      >
        {category || "Select Category"}
      </div>
      {isOpen && (
        <div className="custom-dropdown-options">
          {categoryList.map((option, index) => (
            <div
              key={index}
              className="custom-dropdown-option"
              onClick={() => handleOptionClick(option)}
              data-tooltip-id={`tooltip-${index}`}
              data-tooltip-content={option.description}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
      {categoryError && (
        <div className="invalid-fields">Please select Category</div>
      )}
      {categoryList.map((option, index) => (
        <ReactTooltip key={index} id={`tooltip-${index}`} place="top" />
      ))}
    </div>
  );
};

export default CustomDropdown;
