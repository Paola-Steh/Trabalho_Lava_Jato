import { CalendarDays } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { listarServicos } from "../../services/servicoService.js";

import lavagemGeral from "../../assets/carro3.png";
import protecaoPintura from "../../assets/carro1.png";
import limpezaMotor from "../../assets/carro4.png";
import higienizacaoBanco from "../../assets/carro2.png";
import oxizatinizacao from "../../assets/carro5.png";
import vitrificacao from "../../assets/carro6.png";
import descontaminacao from "../../assets/carro2.png";

const imagensServicos = {
  "Lavagem geral": lavagemGeral,
  "Proteção de pintura": protecaoPintura,
  "Limpeza no motor": limpezaMotor,
  "Higienização de banco e tecido": higienizacaoBanco,
  Oxizatinização: oxizatinizacao,
  Vitrificação: vitrificacao,
  Descontaminação: descontaminacao,
};

export default function Services() {
  const [servicos, setServicos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarServicos()
      .then(setServicos)
      .catch((error) => setErro(error.message));
  }, []);

  return (
    <>
      <section className="page-hero px-4 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
          Nossos Serviços <span className="text-gold">& Preços</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Escolha entre os serviços profissionais de cuidado automotivo da GoldWash.
        </p>
      </section>

      <section className="px-5 py-12">
        {erro && <p className="message-error">{erro}</p>}

        {servicos.map((servico) => (
          <article
            className="mx-auto mb-10 grid max-w-7xl gap-8 rounded-2xl bg-white p-5 shadow-xl lg:grid-cols-[320px_1fr]"
            key={servico.id}
          >
            <img
              src={imagensServicos[servico.nome]}
              alt={servico.nome}
              className="h-64 w-full rounded-xl object-cover shadow-md lg:h-full"
            />

            <div>
              <h2 className="text-2xl font-extrabold uppercase md:text-3xl">
                {servico.nome}
              </h2>

              <p className="mt-4 leading-7 text-slate-500">
                {servico.descricao}
              </p>

              <div className="mt-5 bg-navy px-5 py-3 text-xs font-bold uppercase tracking-wide text-white">
                ● Valor de acordo com o tamanho do veículo
              </div>

              <div className="mb-6 grid overflow-hidden rounded-b-xl border border-t-0 border-slate-200 grid-cols-1 sm:grid-cols-3">
                <div className="flex flex-col items-center border-slate-200 p-5 md:border-r">
                  🚙 <strong>Pequeno</strong>
                  <b className="text-2xl text-blue-700">
                    R$ {servico.precos.pequeno}
                  </b>
                  <small>Hatch</small>
                </div>

                <div className="flex flex-col items-center border-slate-200 p-5 md:border-r">
                  🚗 <strong>Médio</strong>
                  <b className="text-2xl text-blue-700">
                    R$ {servico.precos.medio}
                  </b>
                  <small>Sedan</small>
                </div>

                <div className="flex flex-col items-center p-5">
                  🚘 <strong>Grande</strong>
                  <b className="text-2xl text-blue-700">
                    R$ {servico.precos.grande}
                  </b>
                  <small>SUV / Pickup</small>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link className="btn-primary flex-1" to="/agendamento">
                  <CalendarDays size={18} /> Agendar Serviço
                </Link>

                <span className="rounded-full bg-blue-50 px-4 py-2 font-semibold text-blue-700">
                  ~{servico.duracao}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}