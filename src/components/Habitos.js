import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BallTriangle } from 'react-loader-spinner';

import UserContext from "../contexts/UserContext";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Habito from "./Habito";
import CriaHabito from "./CriaHabito";


export default function Habitos() {
    const { usuario } = useContext(UserContext);

    const [listaDeHabitos, setListaDeHabitos] = useState([])
    const [criarHabito, setCriarHabito] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then(res => {
            if (res.data.length !== 0) {
                const newListaDeHabitos = res.data
                setListaDeHabitos(newListaDeHabitos);
            } else {
                habitosVazio = renderizarHabitosVazio();
            }

            setLoading(false);
        });

    }, []);

    function renderizarHabitosVazio() {
        return (
            <h4>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h4>
        )
    }

    function renderizarHabitos() {

        if (loading) {
            return (
                <Carregando>
                    <BallTriangle height={80} width={80} color="#126BA5" />
                </Carregando>
            );
        } else {
            return (
                listaDeHabitos.map((hab, index) => <Habito key={index} nome={hab.name} dias={hab.days} id={hab.id} setListaDeHabitos={setListaDeHabitos} />)
            );
        }
    }


    function criarNovoHabito() {
        return (
            <CriaHabito listaDeHabitos={listaDeHabitos} setListaDeHabitos={setListaDeHabitos} setCriarHabito={setCriarHabito} criarHabito={criarHabito} />
        );
    }

    let habitosVazio;
    const habitos = renderizarHabitos();
    const novoHabito = criarNovoHabito();

    return (
        <Container>
            <Header />
            <TopoMeusHabitos>
                <h3>Meus hábitos</h3>
                <Botao onClick={() => setCriarHabito(true)}>+</Botao>
            </TopoMeusHabitos>
            {novoHabito}
            <MeusHabitos>
                {habitosVazio}
                {habitos}
            </MeusHabitos>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    background-color: #F2F2F2;
    padding: 92px 17px 130px 17px;
`

const TopoMeusHabitos = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
`

const Botao = styled.div`
    width: 40px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 27px;
    color: #FFFFFF;
    background-color: #52B6FF;
    border-radius: 5px;
`

const MeusHabitos = styled.div`
    display: flex;
    flex-direction: column;

    h4 {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
        margin-top: 30px;
    }
`

const Carregando = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 150px;
`

