import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

import logo from "../assets/images/logo.png";

export default function Login() {
    const { usuario, setUsuario } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function fazerLogin(event) {
        event.preventDefault();

    }

    function irCadastro() {
        navigate("/cadastro");
    }

    return (
        <Container>
            <img src={logo} alt="logo" />
            <form onSubmit={fazerLogin}>
                <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <Input type="password" placeholder="senha" onChange={(e) => setSenha(e.target.value)} value={senha} required />
                <Button type="submit">Entrar</Button>
            </form>
            <h6 onClick={irCadastro}>Não tem uma conta? Cadastre-se!</h6>
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
`