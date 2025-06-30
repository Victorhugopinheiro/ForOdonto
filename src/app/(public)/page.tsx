import Image from "next/image";
import { Header } from "../_components/Header";
import { HeaderDoctor } from "../_components/HeaderDoctor";
import { Profissionais } from "../_components/profissionais";
import { Footer } from "../_components/footer";
import { getClinics } from "./_data_access/get-clinics";


export const revalidate = 120

export default async function Home() {

  const users = await getClinics()

  return (
    <div className="flex flex-col">

      <Header />
      <div className="">
        <HeaderDoctor />
        <Profissionais clinics={users}/>
        <Footer />
      </div>
    </div>
  );
}
