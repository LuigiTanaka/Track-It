import { useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";


import UserContext from "../contexts/UserContext";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";


export default function Habitos() {
    const { usuario } = useContext(UserContext);

    console.log("habitos");
    console.log(usuario);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then(res => console.log(res.data));

    }, [])
    
    return (
        <Container>
            <Header />
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
`