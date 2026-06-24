import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarDays, Clock, ShieldCheck } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useAgendamentos } from "../../contexts/AgendamentoContext.jsx";
import { listarServicos } from "../../services/servicoService.js";

const horarios = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:30", "13:00", "13:30", "14:30", "15:00", "15:30", "16:30", "17:00", "17:30", "18:30"];

export default function Schedule() {
    const { usuario, logout } = useAuth();
    const { agendamentos, editando, setEditando, salvarAgendamento, removerAgendamento, carregando } = useAgendamentos();
    const [servicos, setServicos] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [erroApi, setErroApi] = useState("");

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            nome: usuario?.nome || "",
            email: usuario?.email || "",
            telefone: usuario?.telefone || "",
            servicoId: "",
            placa: "",
            carro: "",
            tamanho: "",
            data: "",
            horario: ""
        }
    });

    const servicoSelecionado = servicos.find((servico) => servico.id === watch("servicoId"));
    const tamanho = watch("tamanho");

    useEffect(() => {
        listarServicos().then(setServicos).catch((error) => setErroApi(error.message));
    }, []);

    useEffect(() => {
        if (editando) {
            reset(editando);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [editando, reset]);

    async function enviar(dados) {
        setMensagem("");
        setErroApi("");

        const servico = servicos.find((item) => item.id === dados.servicoId);
        const valor = servico?.precos?.[dados.tamanho] || 0;

        try {
            await salvarAgendamento({
                ...dados,
                servicoNome: servico.nome,
                valor,
                status: "Confirmado"
            });

            setMensagem("Agendamento concluído! Um e-mail de confirmação será enviado.");
            reset({
                nome: usuario?.nome || "",
                email: usuario?.email || "",
                telefone: usuario?.telefone || "",
                servicoId: "",
                placa: "",
                carro: "",
                tamanho: "",
                data: "",
                horario: ""
            });
        } catch (error) {
            if (error.message.includes("401")) {
                logout();
            }
            setErroApi(error.message);
        }
    }

    function editar(item) {
        setEditando(item);
    }

    return (
        <>
            <section className="page-hero">
                <h1 className="text-4xl font-extrabold md:text-5xl">Agende seu <span className="text-gold">Serviço</span></h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">Agende seu tratamento automotivo premium em minutos.</p>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-8">
                <div className="rounded-xl border border-blue-300 bg-blue-50 px-5 py-4 font-semibold text-blue-700">
                    ℹ️ Após o agendamento, um e-mail de confirmação será enviado. Verifique sua caixa de entrada.
                </div>
                {mensagem && <div className="message-success">{mensagem}</div>}
                {erroApi && <div className="message-error">{erroApi}</div>}

                <form className="mt-8 overflow-hidden rounded-2xl bg-white p-7 shadow-xl" onSubmit={handleSubmit(enviar)}>
                    <div className="-mx-7 -mt-7 mb-7 flex items-center gap-3 bg-navy px-7 py-5 text-xl font-bold text-white">
                        <CalendarDays size={20} /> {editando ? "Editar Agendamento" : "Novo Agendamento"}
                    </div>

                    <h3 className="mb-5 border-l-4 border-gold pl-3 text-lg font-extrabold">Dados do Cliente</h3>
                    <div className="grid gap-5 md:grid-cols-3">
                        <label className="label-text">Nome completo
                            <input className="input-field normal-case tracking-normal" {...register("nome", { required: "Informe o nome completo." })} placeholder="Carlos Mendes" />
                            {errors.nome && <small className="message-error">{errors.nome.message}</small>}
                        </label>
                        <label className="label-text">E-mail
                            <input className="input-field normal-case tracking-normal" type="email" {...register("email", { required: "Informe o e-mail." })} placeholder="carlos@email.com" />
                            {errors.email && <small className="message-error">{errors.email.message}</small>}
                        </label>
                        <label className="label-text">Telefone
                            <input className="input-field normal-case tracking-normal" {...register("telefone", { required: "Informe o telefone." })} placeholder="(11) 99999-9999" />
                            {errors.telefone && <small className="message-error">{errors.telefone.message}</small>}
                        </label>
                    </div>

                    <h3 className="mb-5 mt-8 border-l-4 border-gold pl-3 text-lg font-extrabold">Dados do Veículo</h3>
                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="label-text">Serviço desejado
                            <select className="input-field normal-case tracking-normal" {...register("servicoId", { required: "Selecione um serviço." })}>
                                <option value="">Selecione o Serviço</option>
                                {servicos.map((servico) => <option key={servico.id} value={servico.id}>{servico.nome}</option>)}
                            </select>
                            {errors.servicoId && <small className="message-error">{errors.servicoId.message}</small>}
                        </label>
                        <label className="label-text">Placa
                            <input className="input-field normal-case tracking-normal" {...register("placa", { required: "Informe a placa." })} placeholder="ABC-1234" />
                            {errors.placa && <small className="message-error">{errors.placa.message}</small>}
                        </label>
                    </div>

                    <label className="label-text mt-5 block">Informações adicionais do carro
                        <input className="input-field normal-case tracking-normal" {...register("carro", { required: "Informe cor e modelo." })} placeholder="Cor, modelo ..." />
                        {errors.carro && <small className="message-error">{errors.carro.message}</small>}
                    </label>

                    <div className="my-6 grid gap-4 md:grid-cols-3">
                        {[
                            ["pequeno", "Hatch"],
                            ["medio", "Sedan"],
                            ["grande", "SUV / Pickup"]
                        ].map(([opcao, descricao]) => (
                            <button
                                type="button"
                                key={opcao}
                                className={`rounded-xl border p-5 text-center transition ${tamanho === opcao ? "border-yellow-600 bg-gold text-navy" : "border-slate-200 bg-slate-50 hover:border-gold"}`}
                                onClick={() => setValue("tamanho", opcao, { shouldValidate: true })}
                            >
                                🚘 <strong className="block uppercase">{opcao}</strong>
                                <small>{descricao}</small>
                            </button>
                        ))}
                        <input type="hidden" {...register("tamanho", { required: "Escolha o tamanho do veículo." })} />
                    </div>
                    {errors.tamanho && <small className="message-error">{errors.tamanho.message}</small>}

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr_260px]">
                        <label className="label-text">Escolha a data
                            <input className="input-field normal-case tracking-normal" type="date" {...register("data", { required: "Escolha a data." })} />
                            {errors.data && <small className="message-error">{errors.data.message}</small>}
                        </label>

                        <div>
                            <label className="label-text">Escolha o horário</label>
                            <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-navy p-3 sm:grid-cols-4">
                                {horarios.map((hora) => (
                                    <button
                                        type="button"
                                        key={hora}
                                        className={`rounded-lg px-3 py-3 font-semibold transition ${watch("horario") === hora ? "bg-gold text-navy" : "bg-slate-900 text-white hover:bg-slate-700"}`}
                                        onClick={() => setValue("horario", hora, { shouldValidate: true })}
                                    >
                                        {hora}
                                    </button>
                                ))}
                            </div>
                            <input type="hidden" {...register("horario", { required: "Escolha um horário." })} />
                            {errors.horario && <small className="message-error">{errors.horario.message}</small>}
                        </div>

                        <aside className="rounded-xl bg-navy p-6 text-white">
                            <h4 className="mb-4 text-sm font-extrabold uppercase text-gold">Resumo do Agendamento</h4>
                            <p className="mb-3 flex gap-2"><CalendarDays size={16} /> Serviço: {servicoSelecionado?.nome || "Não selecionado"}</p>
                            <p className="mb-3 flex gap-2"><Clock size={16} /> Horário: {watch("horario") || "--:--"}</p>
                            <p className="flex gap-2"><ShieldCheck size={16} /> Valor: R$ {servicoSelecionado && tamanho ? servicoSelecionado.precos[tamanho] : 0}</p>
                        </aside>
                    </div>

                    <button className="btn-primary mt-8 w-full md:w-auto" type="submit">{editando ? "Salvar alterações" : "Agendar Serviço"}</button>
                </form>

                <section className="py-10">
                    <h2 className="text-3xl font-extrabold md:text-5xl">Painel de <span className="text-gold">Agendamentos</span></h2>
                    <p className="mt-2 text-slate-500">Gerencie e acompanhe todos os serviços agendados.</p>

                    <div className="mt-7 overflow-hidden rounded-xl bg-white shadow-lg">
                        <div className="hidden grid-cols-6 gap-3 bg-panelDark px-5 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 md:grid">
                            <span>Cliente</span><span>Serviço</span><span>Data</span><span>Horário</span><span>Valor</span><span>Ações</span>
                        </div>

                        {carregando && <p className="p-6">Carregando...</p>}
                        {agendamentos.map((item) => (
                            <div className="grid gap-3 border-b border-slate-100 px-5 py-5 md:grid-cols-6 md:items-center" key={item.id}>
                                <span>{item.nome}</span>
                                <span>{item.servicoNome}</span>
                                <span>{item.data}</span>
                                <span>{item.horario}</span>
                                <span>R$ {item.valor}</span>
                                <span className="flex flex-wrap gap-2">
                                    <button className="rounded-full border border-navy px-4 py-1 font-semibold hover:bg-navy hover:text-white" onClick={() => editar(item)}>Editar</button>
                                    <button className="rounded-full border border-red-700 px-4 py-1 font-semibold text-red-700 hover:bg-red-700 hover:text-white" onClick={() => removerAgendamento(item.id)}>Excluir</button>
                                </span>
                            </div>
                        ))}

                        {!carregando && agendamentos.length === 0 && <p className="p-6 text-slate-500">Nenhum agendamento cadastrado.</p>}
                    </div>
                </section>
            </section>
        </>
    );
}