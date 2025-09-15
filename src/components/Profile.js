function Profile({ user }) {
    return (
        <div>
            <h1>ecoRefil</h1>
            <p>Você já reciclou {user.refills} garrafas!</p>
            <button onClick={() => { /* função para registrar refill */ }}>Fiz um Refil!</button>
        </div>
    );
}

export default Profile;
