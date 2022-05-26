import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";


export default function Hoje() {
    
    const { progresso, setProgresso } = useContext(UserContext);


    return(
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