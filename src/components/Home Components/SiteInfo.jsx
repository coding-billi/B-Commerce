import React from "react";
import infoGroup from "/Coding/billi-reaction-vite-v8/src/assets/info/infoGroup.png";

function SiteInfo() {
  return (
    <>
      <div className="p-5" style={{ backgroundColor: "#ccc5b9" }}>
        <div className="row">
          <div className="col-md-">
            <img src={infoGroup} className="img-fluid" alt="Info Group" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SiteInfo;
