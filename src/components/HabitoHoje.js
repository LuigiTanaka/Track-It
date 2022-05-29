import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

import certinho from "../assets/images/certinho.png";
import { useEffect } from "react/cjs/react.production.min";

export default function HabitoHoje({ id, nome, feito, sequenciaAtual, maiorSequencia, setListaDeHabitosHoje }) {
    const { usuario } = useContext(UserContext);

    let igualSeqAtual = false;

    if(sequenciaAtual !== 0 && sequenciaAtual === maiorSequencia) {
        igualSeqAtual = true;
    }

    function marcarDesmarcar() {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        };

        if (feito) {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, config);
            promise.then(() => recarregarHabitosHoje());
        } else {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, config);
            promise.then(() => recarregarHabitosHoje());
            
        }
    }

    function recarregarHabitosHoje() {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        };

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then(res => {
            if (res.data.length !== 0) {
                const newListaDeHabitosHoje = res.data;
                setListaDeHabitosHoje(newListaDeHabitosHoje);
            }
        });
    }

    return (
        <Container>
            <div>
                <h2>{nome}</h2>
                <h3>Sequência atual: <SeqAtual feito={feito}>{sequenciaAtual} dias</SeqAtual></h3>
                <h3>Seu recorde: <Recorde igualSeqAtual={igualSeqAtual}>{maiorSequencia} dias</Recorde></h3>
            </div>
            <Concluido feito={feito} onClick={() => marcarDesmarcar()}>
                <img src={certinho} alt="certinho" />
            </Concluido>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 94px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 13px 13px 12px 15px;
    margin-top: 10px;

    h2 {
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 8px;
    }

    h3 {
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }

    &:first-child {
        margin-top: 28px;
    }
`

const Concluido = styled.div`
    width: 70px;
    height: 70px;
    background-color: ${props => props.feito ? "#8FC549" : "#EBEBEB"};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    img {
        width: 35px;
        height: 28px;
    }
`

const SeqAtual = styled.span`
    color: ${props => props.feito ? "#8FC549" : "#666666"};
`

const Recorde = styled.span`
    color: ${props => props.igualSeqAtual ? "#8FC549" : "#666666"};
`