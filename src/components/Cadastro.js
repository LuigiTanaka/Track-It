import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";

import logo from "../assets/images/logo.png";
import { ThreeDots } from 'react-loader-spinner';

export default function Cadastro() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');

    const [carregando, setCarregando] = useState(false);

    function fazerCadastro(event) {
        event.preventDefault();

        setCarregando(true);

        const body = {
            email: email,
            name: nome,
            image: foto,
            password: senha
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);

        promise
            .then(res => {
                console.log(res.data);
                navigate("/");
            }).catch((err) => {
                console.log(err);
                alert("Dados inválidos, preencha os campos novamente");
                limparCampos();
                setCarregando(false);
            })

    }

    function irLogin() {
        navigate("/");
    }

    function limparCampos() {
        setEmail('');
        setSenha('');
        setNome('');
        setFoto('');
    }

    function criarFormulario() {
        if (!carregando) {
            return (
                <>
                    <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <Input type="password" placeholder="senha" onChange={(e) => setSenha(e.target.value)} value={senha} required />
                    <Input type="name" placeholder="nome" onChange={(e) => setNome(e.target.value)} value={nome} required />
                    <Input type="url" placeholder="foto" onChange={(e) => setFoto(e.target.value)} value={foto} required />
                    <Button type="submit">Entrar</Button>
                </>
            )
        } else {
            return (
                <>
                    <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required disabled={true} />
                    <Input type="password" placeholder="senha" onChange={(e) => setSenha(e.target.value)} value={senha} required disabled={true} />
                    <Input type="name" placeholder="nome" onChange={(e) => setNome(e.target.value)} value={nome} required disabled={true} />
                    <Input type="url" placeholder="foto" onChange={(e) => setFoto(e.target.value)} value={foto} required disabled={true} />
                    <Button type="submit" disabled={true}><ThreeDots height={70} width={70} color="#FFFFFF" /></Button>
                </>
            )
        }
    }

    const formulario = criarFormulario();

    return (
        <Container>
            <img src={logo} alt="logo" />
            <form onSubmit={fazerCadastro}>{formulario}</form>
            <h6 onClick={irLogin}>Já tem uma conta? Faça login!</h6>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 68px;

    img {
        width: 180px;
        height: 180px;
        margin-bottom: 34px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    h6 {
        margin-top: 26px;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`

const Input = styled.input`
    width: 300px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 11px;
    font-size: 20px;
    margin-bottom: 6px;

    &::placeholder {
        font-weight: 400;
        line-height: 25px;
        color: #DBDBDB;
    }

    &:disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
    }
`

const Button = styled.button`
    width: 300px;
    height: 45px;
    border-radius: 5px;
    border: none;
    font-weight: 400;
    font-size: 21px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    background-color: #52B6FF;
    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
        opacity: 0.7;
    }
`