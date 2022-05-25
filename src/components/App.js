import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext";

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