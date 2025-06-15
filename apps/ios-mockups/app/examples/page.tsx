"use client";

import { variants } from "@/__registry__";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(`/examples/${Object.keys(variants)[0]}`);
}
