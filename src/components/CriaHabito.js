import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { ThreeDots } from 'react-loader-spinner';
import UserContext from "../contexts/UserContext";

export default function CriaHabito({ listaDeHabitos, setListaDeHabitos, setCriarHabito, criarHabito }) {
    const { usuario } = useContext(UserContext);

    const [dias, setDias] = useState([]);
    const [nome, setNome] = useState("");
    const [carregando, setCarregando] = useState(false);

    function salvarHabito(event) {
        event.preventDefault();

        setCarregando(true);

        const body = {
            name: nome,
            days: dias
        }

        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);

        promise
            .then(res => {
                setCarregando(false);
                setCriarHabito(false);
                listaDeHabitos.push(res.data);
                const newListaDeHabitos = [...listaDeHabitos];
                setListaDeHabitos(newListaDeHabitos);
                setDias([]);
                setNome("");
                setCarregando(false);
            }).catch((err) => {
                alert(err.message);
                setDias([]);
                setNome("");
                setCarregando(false);
            })
    }

    const selecoesDia = criaSelecaoBotoes();

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

    function selecionaDia(index) {
        let diasAux;
        if (dias.includes(index)) {
            diasAux = dias.filter((dia) => dia !== index);
            setDias(diasAux);
        } else {
            dias.push(index);
            diasAux = [...dias];
            setDias(diasAux);
        }
    }

    function criaBotoesDias() {
        if (!carregando) {
            return (
                selecoesDia.map((selecionado, index) => {
                    if (index === 0) {
                        return (<BotaoDia key={index} type="button" selecionado={selecionado} onClick={() => selecionaDia(index)}>D</BotaoDia>)
                    } else if (index === 1 || index === 5 || index === 6) {
                        return (<BotaoDia key={index} type="button" selecionado={selecionado} onClick={() => selecionaDia(index)}>S</BotaoDia>)
                    } else if (index === 2) {
                        return (<BotaoDia key={index} type="button" selecionado={selecionado} onClick={() => selecionaDia(index)}>T</BotaoDia>)
                    } else {
                        return (<BotaoDia key={index} type="button" selecionado={selecionado} onClick={() => selecionaDia(index)}>Q</BotaoDia>)
                    }
                })
            )
        } else {
            return (
                selecoesDia.map((selecionado, index) => {
                    if (index === 0) {
                        return (<BotaoDia key={index} type="button" selecionado={selecionado} onClick={() => selecionaDia(index)} disabled={true}>D</BotaoDia>)
                    } else if (index === 1 || index === 5 || index === 6) {
                        return (<BotaoDia key={index} type="button" selecionado={selecionado} onClick={() => selecionaDia(index)} disabled={true}>S</BotaoDia>)
                    } else if (index === 2) {
                        return (<BotaoDia key={index} type="button" selecionado={selecionado} onClick={() => selecionaDia(index)} disabled={true}>T</BotaoDia>)
                    } else {
                        return (<BotaoDia key={index} type="button" selecionado={selecionado} onClick={() => selecionaDia(index)} disabled={true}>Q</BotaoDia>)
                    }
                })
            )
        }
    }

    function criaFormularioHabito() {
        if (!carregando) {
            return (
                <>
                    <Input type="text" placeholder="nome do hábito" onChange={(e) => setNome(e.target.value)} value={nome} required />
                    <Dias>{botoesDias}</Dias>
                    <Botoes>
                        <Cancelar onClick={() => setCriarHabito(false)}>Cancelar</Cancelar>
                        <Salvar type="submit">Salvar</Salvar>
                    </Botoes>
                </>
            )
        } else {
            return (
                <>
                    <Input type="text" placeholder="nome do hábito" onChange={(e) => setNome(e.target.value)} value={nome} disabled={true} required />
                    <Dias>{botoesDias}</Dias>
                    <Botoes>
                        <Cancelar onClick={() => setCriarHabito(false)} disabled={true}>Cancelar</Cancelar>
                        <Salvar type="submit" disabled={true}><ThreeDots height={40} width={40} color="#FFFFFF" /></Salvar>
                    </Botoes>
                </>
            )
        }
    }

    const botoesDias = criaBotoesDias();
    const formularioHabito = criaFormularioHabito();

    return (
        <Container visivel={criarHabito}>
            <form onSubmit={salvarHabito}>
                {formularioHabito}
            </form>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-top: 10px;
    padding: 18px 18px 15px 19px;
    position: relative;
    display: ${props => props.visivel ? "inherit" : "none"};

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

const Input = styled.input`
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 11px;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #666666;


    &::placeholder {
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
    }

    &:disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
    }
`

const Dias = styled.div`
    display: flex;
    margin-top: 8px;
`

const BotaoDia = styled.button`
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

const Botoes = styled.div`
    width: 100%;
    height: 35px;
    margin-top: 30px;
    display: flex;
    justify-content: end;
    align-items: center;
`

const Cancelar = styled.div`
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
    margin-right: 23px;
`

const Salvar = styled.button`
    width: 84px;
    height: 35px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    background-color: #52B6FF;
    border-radius: 5px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
`