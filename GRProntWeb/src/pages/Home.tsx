function Home() {
  const userName = localStorage.getItem("userName");
  
  return (
    <div className="container mt-4">
      <h2>Bem vindo ao GRPront{userName ? `, ${userName}!` : "!"}</h2>
      <p>Use a barra de navegação acima.</p>
    </div>
  );
  }
  
  export default Home;
  