import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import Conteudo from './components/Conteudo';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>

        <Link to="/">Login</Link>
        <Link to="/search">Search</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/profile/edit">ProfileEdit</Link>

        <Conteudo />
      </BrowserRouter>

    );
  }
}

export default App;
