import FadeLoader from "react-spinners/FadeLoader";

import React, { useState } from "react";

function Freeloader() {
  return (
    <div>
      <FadeLoader
        color={"#FF0000"}
        loading={true}
        size={300}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      ;
    </div>
  );
}

export default Freeloader;
