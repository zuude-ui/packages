import Image from "next/image";
import styles from "./page.module.css";
import { Iphone } from "@zuude-ui/ios-mockups";

export default function Home() {
  return (
    <div>
      <Iphone
        style={{
          "--screen-color": "white",
          "--dynamic-island-color": "black",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </Iphone>
    </div>
  );
}
