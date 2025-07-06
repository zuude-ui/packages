"use client";

import { useState } from "react";
import styles from "./page.module.css";

import { Cropper, useCropper } from "@zuude-ui/cropper";

export default function Home() {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [ref, { cropIt }] = useCropper({
    onSuccess: (image) => console.log(image),
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Cropper
        ref={ref}
        crop={crop}
        onCropChange={setCrop}
        src={
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b2NlYW58ZW58MHx8MHx8fDA%3D"
        }
        showBehindImage={{ position: "fixed" }}
        style={{
          aspectRatio: "1/1",
          maxWidth: "400px",
        }}
        showGrid
      />
      <button onClick={() => cropIt()}>Log crop</button>
    </div>
  );
}
