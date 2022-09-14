
import './App.css';
import Mostrartodos from './components/mostrarTodos'
import starwars from './assets/images/starwars.png'


function App() {
  return (
    <div className="App">
      <img src={starwars} alt="portada" width="300vw" heigth="300vw"></img>
      <h2>Ficha de los personajes</h2>
      <Mostrartodos/>

    </div>
  );
}

export default App;
