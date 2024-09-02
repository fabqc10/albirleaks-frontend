import Banner from "@/app/components/banner";
import Header from "@/app/components/header";
import { JobsContext } from "@/app/contexts/jobs.context";
import { useContext } from "react";
import Banner2 from "./components/banner2";


export default function Home() {
  return (
    <div>
      <Banner2 />
    </div>
  );
}
