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
    const x = (e.clientX - trackRect.left) / trackRect.width;
    return x;
  };

  onMouseDown = (e, which) => {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
    this.setState({ which });
  };

  onMouseMove = (e) => {
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

  onMouseUp = (e) => {
    this.cleanUp();
    this.setState({ which: null });
  };

  componentWillUnmount() {
    this.cleanUp();
  }

  cleanUp = () => {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
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
        {/* <div className="rangeslider-label">1</div> */}
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
            onMouseDown={(e) => this.onMouseDown(e, "minPos")}
            style={{ left: minPosition }}
          />
          <div
            className="rangeslider-track-button-max"
            onMouseDown={(e) => this.onMouseDown(e, "maxPos")}
            style={{ left: maxPosition }}
          />
        </div>
        {/* <div className="rangeslider-label">100</div> */}
      </div>
    );
  }
}

RangeSlider.propTypes = propTypes;

export default RangeSlider;
/*
        <div className="rangeslider-track-button-max" />

        const RangeSliderX = ({
  min,
  max,
  minVal,
  maxVal,
  onMinChange,
  onMaxChange
}) => {
  const track = useRef(null);
  const [start, setStart] = useState();
  const [trackRect, setTrackRect] = useState();
  useEffect(() => {
    
    setTrackRect(track.current.getBoundingClientRect());
  }, []);

  const trackx = useCallback(node => {
    if (node !== null) {
      setTrackRect(node.getBoundingClientRect());
    }
  }, []);

  const getMousePosition = e => {
    //const rect = track.current.getBoundingClientRect();
    

    const x = e.clientX - trackRect.left;
    
    return +x;
  };

  const onMouseDown = e => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    const xPos = getMousePosition(e);
    
    setStart(xPos);
    
  };
  const onMouseMove = e => {
    
    const newX = getMousePosition(e) - start;
    
  };
  const onMouseUp = e => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    
  };

  return (
    <div ref={track} className="rangeslider">
      <div className="rangeslider-track">
        <div className="rangeslider-track-active" />
        <div
          className="rangeslider-track-button-min"
          onMouseDown={onMouseDown}
        />
      </div>
    </div>
  );
};
*/
