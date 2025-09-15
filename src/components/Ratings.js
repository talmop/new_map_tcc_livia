function Ratings({ point }) { 
    return ( 
        <div> 
            <h2>Avaliações</h2> 
            <input type="text" placeholder="Deixe sua avaliação..." /> 
            <select> 
                <option value="5">⭐⭐⭐⭐⭐</option> 
                <option value="4">⭐⭐⭐⭐</option> 
                <option value="3">⭐⭐⭐</option> 
                <option value="2">⭐⭐</option> 
                <option value="1">⭐</option> 
                </select> 
                <button onClick={() => { /* função para postar avaliação */ }}>POSTAR</button> 
                </div> 
                ); 
                } 
                export default Ratings;