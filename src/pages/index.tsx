import Navigation from "next/navigation";
import { useEffect } from "react";

export default function RedirectToHome() {
  useEffect(() => {
    Navigation.redirect("/ChatGptGeneral");
  }, []);
  return <></>;
}
