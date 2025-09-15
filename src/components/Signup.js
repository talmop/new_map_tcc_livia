import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate(); // para redirecionar
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!username || !email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    // Salva no localStorage
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Cadastro realizado com sucesso!");
    navigate("/login"); // redireciona para login
  };

  return (
    <div>
      <h1>ecoRefil</h1>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>CADASTRAR</button>
    </div>
  );
}

export default Signup;

