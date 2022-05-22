import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/search" component={ Search } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Content;
