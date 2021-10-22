import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Link, Route, Switch, useLocation
} from "react-router-dom";
import Home from './Pages/Home';
import PostForm from './Pages/PostForm';
import Posts from './Pages/Posts';
import UserForm from './Pages/UserForm';
import Users from './Pages/Users';
import store from './redux/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div id="app">
          <div id="routes">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/users">
                <Users />
              </Route>
              <Route exact path="/posts">
                <Posts />
              </Route>
              <Route exact path="/createPost">
                <PostForm />
              </Route>
              <Route exact path="/createUser">
                <UserForm />
              </Route>
            </Switch>
          </div>
          <nav >
            <ul id="navUl">
              <li>
                <Link className="brand" to="/">Inicio</Link>
              </li>
              <li>
                <Link className="link" to="/users">Usuarios</Link>
              </li>
              <li>
                <Link className="link" to="/posts">Publicaciones</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>
    </Provider>
  )
}

