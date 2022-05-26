import { useContext, useState } from "react";
import styled from "styled-components";

import UserContext from "../../contexts/UserContext";

import trackIt from "../../assets/images/TrackIt.png"

export default function Header() {
    const { usuario } = useContext(UserContext);
    const fotoPerfil = usuario.image

    return (
        <Topo>
            <NomeLogo src={trackIt} alt="trackit" />
            <FotoPerfil src={fotoPerfil} alt="foto perfil" />
        </Topo>
    )
}

const Topo = styled.div`
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
`

const NomeLogo = styled.img`
    width: 100px;
    height: 30px;
`

const FotoPerfil = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`