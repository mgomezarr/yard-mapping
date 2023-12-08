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
          {/* Form section */}
          {/* First input */}
          <div style={{ margin: "15px 0" }}>
            <label style={{ fontWeight: "bold" }}>Yard name</label>
            <br />
            <input style={{ width: "50%" }} type="text"></input>
            <br />
          </div>
          {/* End first input */}
          {/* Second row */}
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold" }}>Rows</label>
              <input style={{ width: "50%" }} type="number" min={0}></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold" }}>Columns</label>
              <input style={{ width: "50%" }} type="number" min={0}></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold" }}>Defined limits</label>
              <input style={{ width: "50%" }} type="number" disabled={true} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold" }}>Spot limits</label>
              <input style={{ width: "50%" }} type="number"></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: "bold" }}>Stack limit?</label>
              <input style={{ width: "50%" }} type="number" />
            </div>
          </div>
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
