import styled from "styled-components";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";


export default function Historico() {
    
    return(
        <Container>
            <Header />
            <h2>Histórico</h2>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F2F2F2;
    padding: 92px 17px 180px 17px;

    h2 {
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }

    p {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
        margin-top: 18px;
    }
`