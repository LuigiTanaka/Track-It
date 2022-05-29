import { Link } from 'react-router-dom';
import { useContext } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UserContext from "../../contexts/UserContext";

export default function Footer() {

    const { progresso, setProgresso } = useContext(UserContext);

    return (
        <Menu>
            <Link to={"/habitos"}>
                <h3>Hábitos</h3>
            </Link>
            <Link to={"/hoje"}>
                <BotaoCircular>
                    <CircularProgressbar
                        value={progresso}
                        text={"Hoje"}
                        background={true}
                        backgroundPadding={6}
                        styles={buildStyles({
                            textSize: '18px',
                            pathTransitionDuration: 0.75,
                            textColor: '#FFFFFF',
                            pathColor: '#FFFFFF',
                            trailColor: '#52B6FF',
                            backgroundColor: '#52B6FF',
                        })} />
                </BotaoCircular>
            </Link>
            <Link to={"/historico"}>
                <h3>Histórico</h3>
            </Link>
        </Menu>
    )
}

const Menu = styled.div`
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    z-index: 1;
    position: fixed;
    bottom: 0;
    right: 0;

    a {
        text-decoration: none;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #52B6FF;
    }
`

const BotaoCircular = styled.div`
    width: 90px;
    height: 90px;
    position: absolute;
    top: -30px;
    left: 37.5%;
    right: 62.5%;
`