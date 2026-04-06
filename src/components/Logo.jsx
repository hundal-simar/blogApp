import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div>
      <span style={{fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: '700', color: '#f1f5f9'}}>
        Pen<span style={{fontWeight: '400', color: '#c4753a'}}>craft</span>
      </span>
    </div>
  );
}

export default Logo;