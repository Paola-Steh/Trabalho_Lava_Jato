import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarDays, Clock, ShieldCheck } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useAgendamentos } from "../../contexts/AgendamentoContext.jsx";
import { listarServicos } from "../../services/servicoService.js";

