import React from "react";
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import CustomInputNumber from "../../CustomInputNumber";

const Room = (props) => {
  const {
    allocation: initAllocation,
    index,
    size,
    childMin,
    adultMin,
    unAllocatedNumber,
    disabled,
    onChange
  } = props;

  const [allocation, setAllocation] = useState(initAllocation);

  useEffect(() => {
    setAllocation(initAllocation);
  }, [initAllocation]);

  const [adultMax, setAdultMax] = useState(size);
  const [childMax, setChildMax] = useState(size - adultMin);

  useEffect(() => {
    if (unAllocatedNumber === 0) {
      setAdultMax(allocation.adult);
      setChildMax(allocation.child);
    } else {
      const availableNumber = size - (allocation.adult + allocation.child);
      setAdultMax(Math.min(size, allocation.adult + availableNumber));
      setChildMax(
        Math.min(size - adultMin, allocation.child + availableNumber)
      );
    }
  }, [size, adultMin, allocation, unAllocatedNumber]);

  // Because onChange method is added as dependency for useEffect in the <CustomInputNumber /> component,
  // we need to use useCallback
  const handleAdultChange = useCallback((e) => {
    const newVal = Number(e.target.value);
    setAllocation((prevAllocation) => ({ ...prevAllocation, adult: newVal }));
  }, []);

  const handleChildChange = useCallback((e) => {
    const newVal = Number(e.target.value);
    setAllocation((prevAllocation) => ({ ...prevAllocation, child: newVal }));
  }, []);

  useEffect(() => {
    onChange(index, allocation);
  }, [index, allocation, onChange]);

  return (
    <Container>
      <Title>房間: {allocation.adult + allocation.child} 人</Title>
      <Row>
        <div>
          <Subtitle>大人</Subtitle>
          <Subtitle style={{ color: "#6b6b6b" }}>年齡 20+</Subtitle>
        </div>
        <CustomInputNumber
          value={allocation.adult}
          step={1}
          min={adultMin}
          max={adultMax}
          disabled={disabled}
          onChange={handleAdultChange}
        />
      </Row>
      <Row>
        <Subtitle>小孩</Subtitle>
        <CustomInputNumber
          value={allocation.child}
          step={1}
          min={childMin}
          max={childMax}
          disabled={disabled}
          onChange={handleChildChange}
        />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

Room.propTypes = {
  allocation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  childMin: PropTypes.number,
  adultMin: PropTypes.number,
  unAllocatedNumber: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Room;
