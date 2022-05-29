import { useContext, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import UserContext from "../contexts/UserContext";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HabitoHoje from "./HabitoHoje";


export default function Hoje() {

    const { usuario, progresso, setProgresso } = useContext(UserContext);

    const [listaDeHabitosHoje, setListaDeHabitosHoje] = useState([]);

    const now = dayjs().locale("pt-br");
    const diaMes = now.format("DD/MM");
    const diaSemana = criaDiaSemana(now.format("dddd"))

    const numHabitosConcluidos = listaDeHabitosHoje.filter((habHoje) => habHoje.done).length;
    const numHabitosHoje = listaDeHabitosHoje.length;
    const porcentagem = Math.round((numHabitosConcluidos/numHabitosHoje)*100);
    setProgresso(porcentagem);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then(res => {
            if (res.data.length !== 0) {
                const newListaDeHabitosHoje = res.data
                setListaDeHabitosHoje(newListaDeHabitosHoje);
            }
        });
    }, [])

    function criaDiaSemana(dia) {
        let parar = false;
        let diaSemFeira = ''
        for (let i = 0; i < dia.length && parar === false; i++) {
            if (dia[i] !== '-') {
                i === 0 ? diaSemFeira += dia[i].toUpperCase() : diaSemFeira += dia[i]
            } else {
                parar = true;
            }
        }
        return (diaSemFeira);
    }

    function criarStatus() {
        if (progresso === 0  || isNaN(progresso)) {
            return (
                <h3>Nenhum hábito concluído ainda</h3>
            )
        } else {
            return (
                <h4>{progresso}% dos hábitos concluídos</h4>
            )
        }
    }

    function renderizarHabitosHoje() {
        if (listaDeHabitosHoje.length === 0) {
            return (null);
        } else {
            return (
                listaDeHabitosHoje.map((habHoje, index) => <HabitoHoje key={index} id={habHoje.id} nome={habHoje.name} feito={habHoje.done} sequenciaAtual={habHoje.currentSequence} maiorSequencia={habHoje.highestSequence} setListaDeHabitosHoje={setListaDeHabitosHoje} />)
            );
        }
    }

    const status = criarStatus();
    const habitosHoje = renderizarHabitosHoje();

    return (
        <Container>
            <Header />
            <Dia>{diaSemana}, {diaMes}</Dia>
            <Status>{status}</Status>
            <HabitosHoje>{habitosHoje}</HabitosHoje>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    background-color: #F2F2F2;
    padding: 100px 17px 130px 17px;
`

const Dia = styled.div`
    font-weight: 400;
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
`

const Status = styled.div`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;

    h3 {
        color: #BABABA;
    }

    h4 {
        color: #8FC549;
    }
`

const HabitosHoje = styled.div`

`