import React from "react";
import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";
import styled from "styled-components";

const CustomButton = ({ disabled, clickCallback = () => {}, children }) => {
  const intervalRef = useRef(null);
  const isLongPress = useRef(false);

  const startLongPress = (callback) => {
    intervalRef.current = setInterval(() => {
      isLongPress.current = true;
      callback();
    }, 300);
  };

  const stopLongPress = () => {
    isLongPress.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (disabled) {
      stopLongPress();
    }
  }, [disabled]);

  const handleMouseDown = () => {
    // console.log("handleMouseDown");
    startLongPress(clickCallback);
  };

  const handleMouseUp = () => {
    // console.log("handleMouseUp");
    stopLongPress();
  };

  const handleClick = () => {
    // console.log("longPress", isLongPress.current);
    if (isLongPress.current) return;
    // console.log("handleClick");
    clickCallback();
  };

  const handleMouseLeave = () => {
    // console.log("handleMouseLeave");
    stopLongPress();
  };

  useEffect(() => {
    return () => stopLongPress();
  }, []);

  return (
    <Button
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

const Button = styled.button`
  font-size: 16px;
  height: 48px;
  width: 48px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgb(30, 159, 210);
  color: rgb(30, 159, 210);
  cursor: pointer;
  &:hover {
    background-color: rgb(240, 253, 255);
  }
  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }
`;

CustomButton.propTypes = {
  disabled: PropTypes.bool,
  clickCallback: PropTypes.func,
  children: PropTypes.node,
}

export default CustomButton;
