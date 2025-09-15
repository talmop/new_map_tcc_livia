import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Nenhum usuário cadastrado!");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      alert("Login realizado com sucesso!");
      navigate("/map"); // redireciona para a página do mapa
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  return (
    <div>
      <h1>ecoRefil</h1>
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
      <button onClick={handleLogin}>ENTRAR</button>
      <a href="/signup">Não tem uma conta? Cadastre-se agora!</a>
    </div>
  );
}

export default Login;

