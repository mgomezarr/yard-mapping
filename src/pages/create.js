import React from "react";

export const Create = () => {
  return (
    <>
      <div
        style={{
          width: "50%",
          backgroundColor: "white",
          margin: "auto",
          borderRadius: "5px",
        }}
      >
        <div>
          <p
            style={{
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              backgroundColor: "#2d2d52",
              borderRadius: "5px 5px 0 0",
            }}
          >
            Create new yard space
          </p>
        </div>
        <div>
          <b>Space information</b>
        </div>
        <p>
          Enter the yard name and the dimensions of the cells it will occupy.
        </p>

        <div>
          <label style={{ fontWeight: "bold" }}>Yard name</label>
          <br />
          <input type="text"></input>
          <br />
          <label style={{ fontWeight: "bold" }}>Rows</label>
          <input type="number"></input>
          <label style={{ fontWeight: "bold" }}>Columns</label>
          <input type="number"></input>
          <label style={{ fontWeight: "bold" }}>Defined limits</label>
          <input type="number" disabled={true}></input>
          <label style={{ fontWeight: "bold" }}>Spot limits</label>
          <input type="number"></input>
          <label style={{ fontWeight: "bold" }}>Stack limit?</label>
          <input type="number" />
          <div>
            <label style={{ fontWeight: "bold" }}>Attach images</label>
            <input placeholder="Attach images" type="file"></input>
          </div>
          <div>
            <input type="submit" value={"Save"}></input>
          </div>
        </div>
      </div>
    </>
  );
};
