import Image from "next/image";
import { Header } from "../_components/Header";
import { HeaderDoctor } from "../_components/HeaderDoctor";
import { Profissionais } from "../_components/profissionais";
import { Footer } from "../_components/footer";

export default function Home() {
  return (
    <div className="flex flex-col">

      <Header />
      <div className="">
        <HeaderDoctor />
        <Profissionais />
        <Footer />
      </div>
    </div>
  );
}
