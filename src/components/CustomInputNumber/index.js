import React from "react";
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CustomButton from "./CustomButton";

const CustomInputNumber = (props) => {
  const {
    min = 0,
    max = 30,
    step = 1,
    name = "",
    value = 0,
    disabled = false,
    onChange = () => {},
    onBlur = () => {}
  } = props;
  const [count, setCount] = useState(value);
  const [minusDisabled, setMinusDisabled] = useState(false);
  const [plusDisabled, setPlusDisabled] = useState(false);
  const inputRef = useRef();

  const decrease = () => {
    setCount((prevCount) => {
      const nextCount = prevCount - step;
      return nextCount < min ? prevCount : nextCount;
    });
  };

  const increase = () => {
    setCount((prevCount) => {
      const nextCount = prevCount + step;
      return nextCount > max ? prevCount : nextCount;
    });
  };

  useEffect(() => {
    if (count > min) {
      setMinusDisabled(false);
    } else {
      setMinusDisabled(true);
    }

    if (count < max) {
      setPlusDisabled(false);
    } else {
      setPlusDisabled(true);
    }
  }, [count, min, max]);

  const handleChange = (event) => {
    const value = Number(event.target.value);
    setCount(value);
  };

  useEffect(() => {
    onChange({ target: inputRef.current });
  }, [count, onChange]);

  const handleBlur = (event) => {
    if (count > max) {
      setCount(max);
    }
    if (count < min) {
      setCount(min);
    }
    onBlur(event);
  };

  return (
    <Container>
      <CustomButton
        disabled={disabled || minusDisabled}
        clickCallback={decrease}
      >
        -
      </CustomButton>
      <Input
        type="number"
        value={count}
        name={name}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={inputRef}
      ></Input>
      <CustomButton
        disabled={disabled || plusDisabled}
        clickCallback={increase}
      >
        +
      </CustomButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  font-size: 16px;
  padding: 8px;
`;

const Input = styled.input`
  font-size: 16px;
  height: 48px;
  width: 48px;
  margin: 0 8px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid rgb(191, 191, 191);
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;
CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
  value:PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

export default CustomInputNumber;
