import Router from "next/router";
import { useEffect } from "react";

export default function RedirectToHome() {
  useEffect(() => {
    Router.replace("/ChatGptGeneral");
  }, []);
  return <></>;
}
