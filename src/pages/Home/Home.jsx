import { useState } from "react";
import { Link } from "react-router";
import { Check } from "lucide-react";
import carroGold from "../../assets/carro-goldwash.png";
import servicoPrincipal from "../../assets/servico-principal.png";
import trabalho1 from "../../assets/carro1.png";
import trabalho2 from "../../assets/carro2.png";
import trabalho3 from "../../assets/carro3.png";
import trabalho4 from "../../assets/carro4.png";
import trabalho5 from "../../assets/carro5.png";
import trabalho6 from "../../assets/carro6.png";
const beneficios = [
  "Lavagem geral",
  "Proteção de pintura",
  "Limpeza no motor",
  "Higienização de banco e tecido",
  "Oxizatinização",
  "Vitrificação",
  "Descontaminação",
  "E muito mais!",
];
const imagensTrabalho = [
  trabalho1,
  trabalho2,
  trabalho3,
  trabalho4,
  trabalho5,
  trabalho6,
];
export default function Home() {
  const [inicioCarrossel, setInicioCarrossel] = useState(0);
  function voltarImagem() {
    setInicioCarrossel((valor) =>
      valor === 0 ? imagensTrabalho.length - 1 : valor - 1,
    );
  }
  function avancarImagem() {
    setInicioCarrossel((valor) =>
      valor === imagensTrabalho.length - 1 ? 0 : valor + 1,
    );
  }
  const imagensVisiveis =
    window.innerWidth < 768
      ? [imagensTrabalho[inicioCarrossel]]
      : [
          imagensTrabalho[inicioCarrossel],
          imagensTrabalho[(inicioCarrossel + 1) % imagensTrabalho.length],
          imagensTrabalho[(inicioCarrossel + 2) % imagensTrabalho.length],
          imagensTrabalho[(inicioCarrossel + 3) % imagensTrabalho.length],
        ];
  return (
    <>
      {" "}
      <section className="grid grid-cols-1 items-center gap-8 bg-purpleDark px-4 py-10 text-white sm:px-6 md:grid-cols-2 md:px-12 md:py-20">
        {" "}
        <div className="text-center md:text-left">
          {" "}
          <h1 className="text-4xl font-extrabold sm:text-6xl md:text-8xl">
            {" "}
            <span className="text-gold">Gold</span>Wash{" "}
          </h1>{" "}
          <h2 className="mt-3 text-2xl font-bold text-gold md:text-3xl">
            {" "}
            ★ Lavagem Premium ★{" "}
          </h2>{" "}
          <p className="mt-8 max-w-2xl leading-8 text-slate-300">
            {" "}
            Na Gold Wash, cada detalhe importa. Somos especialistas em estética
            e limpeza automotiva, entregando cuidado, proteção e valorização do
            seu veículo.{" "}
          </p>{" "}
          <Link to="/agendamento" className="btn-primary mt-8">
            {" "}
            Agendar serviço{" "}
          </Link>{" "}
        </div>{" "}
        <div className="flex justify-center">
          {" "}
          <img
            src={carroGold}
            alt="Carro GoldWash"
            className="w-full max-w-xs object-contain sm:max-w-md md:max-w-xl"
          />{" "}
        </div>{" "}
      </section>{" "}
      <section className="bg-white px-6 py-12 text-center">
        {" "}
        <h2 className="text-3xl font-extrabold md:text-5xl">
          {" "}
          Aqui seu carro é tratado como{" "}
          <span className="text-gold">único!</span>{" "}
        </h2>{" "}
        <p className="mt-3 text-slate-500">
          {" "}
          Oferecemos serviços que unem tecnologia, eficiência e estética.{" "}
        </p>{" "}
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-center gap-6 text-left md:grid-cols-3">
          {" "}
          <div className="space-y-4">
            {" "}
            {beneficios.slice(0, 4).map((item) => (
              <div
                className="flex items-center gap-2 rounded-xl bg-slate-50 p-5 text-lg shadow-sm"
                key={item}
              >
                {" "}
                <Check size={20} className="text-green-700" /> {item}{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <img
            src={servicoPrincipal}
            alt="Serviço GoldWash"
            className="h-56 w-full rounded-2xl object-cover shadow-lg sm:h-72 md:h-80"
          />{" "}
          <div className="space-y-4">
            {" "}
            {beneficios.slice(4).map((item) => (
              <div
                className="flex items-center gap-2 rounded-xl bg-slate-50 p-5 text-lg shadow-sm"
                key={item}
              >
                {" "}
                <Check size={20} className="text-green-700" /> {item}{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="bg-panelDark px-5 py-12 text-white md:px-14">
        {" "}
        <h2 className="mb-8 text-3xl font-extrabold md:text-5xl">
          {" "}
          Veja nosso trabalho <span className="text-gold">registrado</span>{" "}
        </h2>{" "}
        <div className="flex items-center gap-2 sm:gap-4">
          {" "}
          <button
            onClick={voltarImagem}
            className="rounded-full bg-gold px-2 py-1 text-2xl font-bold text-black sm:px-3 sm:text-3xl"
          >
            {" "}
            {"<"}{" "}
          </button>{" "}
          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {" "}
            {imagensVisiveis.map((imagem, index) => (
              <img
                key={index}
                src={imagem}
                alt="Trabalho GoldWash"
                className="h-48 w-full rounded-2xl object-cover shadow-lg sm:h-56"
              />
            ))}{" "}
          </div>{" "}
          <button
            onClick={avancarImagem}
            className="rounded-full bg-gold px-3 py-1 text-3xl font-bold text-black"
          >
            {" "}
            {">"}{" "}
          </button>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}
