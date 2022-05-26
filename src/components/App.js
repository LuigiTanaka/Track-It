import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import Hoje from "./Hoje";
import Historico from "./Historico";

export default function App() {
    //crie as variaveis globais aqui
    const [usuario, setUsuario] = useState({});
    const [progresso, setProgresso] = useState(0);

    //passe as variaveis/setVariaveis globais pelo contextValue
    const contextValue = { usuario, setUsuario, progresso, setProgresso };

    return (
        <UserContext.Provider value={contextValue}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/habitos" element={<Habitos />} />
                    <Route path="/hoje" element={<Hoje />} />
                    <Route path="/historico" element={<Historico />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

/* fazer isso para usar as variaveis globais dentro dos componentes filhos

import { useContext } from "react";

import UserContext from "../contexts/UserContext";

function ComponenteB() {
	const { tasks, setTasks } = useContext(UserContext);

	// ...
}
*/