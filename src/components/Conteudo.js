// Funcionalidades
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Paginas
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

class Conteudo extends React.Component {
  render() {
    return (

      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/album" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="*" component={ NotFound } />
      </Switch>

    );
  }
}

export default Conteudo;
