import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>ecoRefil</h1>
            <p>Comece a reciclar!</p>
            <button onClick={() => navigate('/login')}>Acessar</button>
        </div>
    );
}

export default Home;
