import React from "react";
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Room from "./Room";

const initAllocationList = (roomNum) => {
  return new Array(roomNum).fill({ adult: 1, child: 0 });
};

const RoomAllocation = ({ guest, room, onChange }) => {
  const [allocationList, setAllocationList] = useState(
    initAllocationList(room)
  );

  useEffect(() => {
    setAllocationList(initAllocationList(room));
  }, [room]);

  const [unAllocatedNumber, setUnAllocatedNumber] = useState(0);

  const handleChange = useCallback((index, value) => {
    setAllocationList((prevList) => {
      const newList = [...prevList];
      newList[index] = value;
      return newList;
    });
  }, []);

  useEffect(() => {
    onChange(allocationList);
    const sum = allocationList.reduce(
      (acc, cur) => acc + cur.adult + cur.child,
      0
    );
    setUnAllocatedNumber(guest - sum);
  }, [allocationList, guest, setUnAllocatedNumber, onChange]);

  return (
    <Container>
      <Title>
        住客人數: {guest} 人 / {room} 房
      </Title>
      <Callout>尚未分配人數 {unAllocatedNumber} 人</Callout>
      {allocationList.map((allocation, index) => (
        <React.Fragment key={index}>
          <Room
            index={index}
            size={4}
            adultMin={1}
            childMin={0}
            allocation={allocation}
            unAllocatedNumber={unAllocatedNumber}
            disabled={guest === room}
            onChange={handleChange}
          />
          {index !== allocationList.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </Container>
  );
};

const Container = styled.div`
  font-size: 16px;
  width: 360px;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid grey;
`;

const Title = styled.p`
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const Callout = styled.div`
  font-size: 14px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #daf0f8;
  background: #f1fdff;
`;

const Divider = styled.div`
  border-top: 2px solid #f3f3f3;
`;

RoomAllocation.propTypes = {
  guest: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default RoomAllocation;
