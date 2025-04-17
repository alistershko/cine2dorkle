import React from "react";

const DummyFilmBox = React.forwardRef(({ title, style }, ref) => (
  <div
    ref={ref}
    style={{
      width: "150px",
      height: "200px",
      background: "gray",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      position: "absolute",
      zIndex: 1001,
      ...style // ✅ apply custom positioning
    }}
  >
    {title}
  </div>
));

export default DummyFilmBox;
