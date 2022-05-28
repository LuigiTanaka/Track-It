import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"

import UserContext from "../contexts/UserContext";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";


export default function Hoje() {

    const { progresso, setProgresso } = useContext(UserContext);

    const now = dayjs().locale("pt-br");
    const diaMes = now.format("DD/MM");
    const diaSemana = criaDiaSemana(now.format("dddd"))

    function criaDiaSemana(dia) {
        let parar = false;
        let diaSemFeira = ''
        for (let i = 0; i < dia.length && parar === false; i++) {
            if(dia[i] !== '-') {
                i === 0 ? diaSemFeira += dia[i].toUpperCase() : diaSemFeira += dia[i]
            } else {
                parar = true;
            }
        }
        return(diaSemFeira);
    }

    function criarStatus() {
        if (progresso === 0) {
            return (
                <h3>Nenhum hábito concluído ainda</h3>
            )
        } else {
            return (
                <h4>{progresso}% dos hábitos concluídos</h4>
            )
        }
    }

    function renderizarHabitos() {
        
    }

    const status = criarStatus();
    const habitos = renderizarHabitos();

    return(
        <Container>
            <Header />
            <Dia>{diaSemana}, {diaMes}</Dia>
            <Status>{status}</Status>
            <Habitos>{habitos}</Habitos>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F2F2F2;
    padding: 100px 17px 180px 17px;
`

const Dia = styled.div`
    font-weight: 400;
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
`

const Status = styled.div`
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    h3 {
        color: #BABABA;
    }

    h4 {
        color: #8FC549;
    }
`

const Habitos = styled.div`

`