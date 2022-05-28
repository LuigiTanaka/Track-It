import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

import lixeira from "../assets/images/lixeira.png";

export default function Habito({ nome, dias, id }) {
    const { usuario } = useContext(UserContext);

    const selecoesDia = criaSelecaoBotoes();

    console.log(nome);
    console.log(dias);

    function criaSelecaoBotoes() {
        let selecoesDiaAux = [];
        for (let i = 0; i < 7; i++) {
            if (dias.includes(i)) {
                selecoesDiaAux.push(true);
            } else {
                selecoesDiaAux.push(false);
            }
        }
        return selecoesDiaAux;
    }

    function criaBotoesDias() {
        return (
            selecoesDia.map((selecionado, index) => {
                if (index === 0) {
                    return (<BotaoDia selecionado={selecionado}>D</BotaoDia>)
                } else if (index === 1 || index === 5 || index === 6) {
                    return (<BotaoDia selecionado={selecionado}>S</BotaoDia>)
                } else if (index === 2) {
                    return (<BotaoDia selecionado={selecionado}>T</BotaoDia>)
                } else {
                    return (<BotaoDia selecionado={selecionado}>Q</BotaoDia>)
                }
            })
        )
    }

    function apagarHabito() {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        
        promise.then(() => console.log({id}));
    }

    const botoesDias = criaBotoesDias();

    return (
        <Container>
            <h2>{nome}</h2>
            <Dias>{botoesDias}</Dias>
            <Lixeira src={lixeira} alt="lixeira" onClick={apagarHabito}></Lixeira>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 90px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-top: 10px;
    padding: 13px 25px 15px 15px;
    position: relative;

    &:first-child {
        margin-top: 20px;
    }

    h2 {
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
    }
`

const Dias = styled.div`
    display: flex;
    margin-top: 8px;
`

const BotaoDia = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    margin-right: 4px;
    border: 1px solid ${props => props.selecionado ? "#CFCFCF" : "#D5D5D5"};;
    background-color: ${props => props.selecionado ? "#CFCFCF" : "#FFFFFF"};
    color: ${props => !props.selecionado ? "#CFCFCF" : "#FFFFFF"};
`

const Lixeira = styled.img`
    width: 13px;
    height: 15px;
    position: absolute;
    top: 11px;
    right: 10px;
`