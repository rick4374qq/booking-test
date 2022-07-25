import React from "react";
import "./styles.css";
import CustomInputNumber from "./components/CustomInputNumber";
import RoomAllocation from "./components/RoomAllocation";

const App = () => {
  const handleChange = (e) => {
    console.log("CustomInputNumber handleChange", e);
    console.log("name", e.target.name);
    console.log("value", e.target.value);
  };
  const handleBlur = (e) => {
    console.log("CustomInputNumber handleBlur", e);
    console.log("name", e.target.name);
    console.log("value", e.target.value);
  };
  const handleChangeRoom = (result) => {
    console.log(result);
  };
  return (
    <div>
      CustomInputNumber
      <CustomInputNumber
        min={0}
        max={30}
        step={1}
        name={"CustomInputNumber"}
        value={2}
        disabled={false}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      RoomAllocation
      <RoomAllocation guest={10} room={3} onChange={handleChangeRoom} />
    </div>
  );
};

export default App;
