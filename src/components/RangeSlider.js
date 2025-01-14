import React, { Component } from "react";
import PropTypes from "prop-types";
import "../assets/css/slider.css";

const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};

class RangeSlider extends Component {
  constructor(props) {
    super(props);
    const { min, max, minValue, maxValue } = this.props;
    const minV = minValue || 1;
    const maxV = maxValue || 100;
    const total = max - min;
    const minPos = (minV - min) / total;
    const maxPos = (maxV - min) / total;
    this.state = {
      which: null,
      minPos,
      maxPos,
    };
  }

  getMousePosition = (e) => {
    const trackRect = this.track.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = (clientX - trackRect.left) / trackRect.width;
    return x;
  };

  onStart = (e, which) => {
    const eventType = e.type === "mousedown" ? "mousemove" : "touchmove";
    const endType = e.type === "mousedown" ? "mouseup" : "touchend";

    window.addEventListener(eventType, this.onMove);
    window.addEventListener(endType, this.onEnd);
    this.setState({ which });
  };

  onMove = (e) => {
    const { which, minPos, maxPos } = this.state;
    let newPos = this.getMousePosition(e);

    if (which === "minPos") {
      if (newPos < 0) {
        newPos = 0;
      } else if (newPos > maxPos) {
        newPos = maxPos;
      }
    } else {
      if (newPos > 1) {
        newPos = 1;
      } else if (newPos < minPos) {
        newPos = minPos;
      }
    }
    if (this.state[which] !== newPos) {
      this.setState({ [which]: newPos }, this.onChange);
    }
  };

  onEnd = () => {
    this.cleanUp();
    this.setState({ which: null });
  };

  componentWillUnmount() {
    this.cleanUp();
  }

  cleanUp = () => {
    window.removeEventListener("mousemove", this.onMove);
    window.removeEventListener("mouseup", this.onEnd);
    window.removeEventListener("touchmove", this.onMove);
    window.removeEventListener("touchend", this.onEnd);
  };

  onChange = () => {
    const { minPos, maxPos } = this.state;
    const { min, max } = this.props;
    const total = max - min;
    const minVal = Math.round(total * minPos + min);
    const maxVal = Math.round(total * maxPos + min);
    this.props.onChange({
      min: minVal,
      max: maxVal,
      target: { min: minVal, max: maxVal },
    });
  };

  render() {
    const { minPos, maxPos } = this.state;
    const minPosition = `${minPos * 100}%`;
    const maxPosition = `${maxPos * 100}%`;
    const tWidth = `${(maxPos - minPos) * 100}%`;

    return (
      <div className="rangeslider">
        <div ref={(r) => (this.track = r)} className="rangeslider-track">
          <div
            className="rangeslider-track-active"
            style={{
              left: minPosition,
              width: tWidth,
            }}
          />
          <div
            className="rangeslider-track-button-min"
            onMouseDown={(e) => this.onStart(e, "minPos")}
            onTouchStart={(e) => this.onStart(e, "minPos")}
            style={{ left: minPosition }}
          />
          <div
            className="rangeslider-track-button-max"
            onMouseDown={(e) => this.onStart(e, "maxPos")}
            onTouchStart={(e) => this.onStart(e, "maxPos")}
            style={{ left: maxPosition }}
          />
        </div>
      </div>
    );
  }
}

RangeSlider.propTypes = propTypes;

export default RangeSlider;
