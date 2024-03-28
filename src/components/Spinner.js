import React, { Component } from "react";
import { Rings } from "react-loader-spinner";
import "../assets/css/spinner.css";

export class Spinner extends Component {
  render() {
    return (
      <div className="spinnerbackground">
        <Rings
          height="80"
          width="80"
          radius="9"
          color="#c2114b"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
}

export default Spinner;
