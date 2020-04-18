import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import TelaPrincipal from './componentes/telaPrincipal'
import 'materialize-css/dist/css/materialize.min.css'
import history from './suporte/history'
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import NavBar from './componentes/navBar'
import PersonagensComponent from './componentes/personagens'
import NavesComponent from './componentes/naves'
import PlanetasComponent from './componentes/planetas'
import EspeciesComponent from './componentes/especies'
import { Parse } from 'parse'

class App extends Component {

  componentDidMount() {
    Parse.serverURL = 'https://parseapi.back4app.com'
    Parse.initialize(
      'ccDEiOgvJ17d9X2viSYs76Nku7YyVNson2o4NlD0', 
      'WeP6gqAzZz7ee9LHmc3psic2ZwdOVg3xoqiUuTWx'
    )
  }

  render() {
    return (
      <div>
        <NavBar />
        <br /><br />
        <div className="container">
          <div className="row">
            <Router history={history} >
              <Switch>
                <Route path='/racas' render={(props) => <EspeciesComponent {...props} parse={Parse} />} />
                <Route path='/planetas' render={(props) => <PlanetasComponent {...props} parse={Parse} />} />
                <Route path='/naves' render={(props) => <NavesComponent {...props} parse={Parse} />} />
                <Route path='/personagens' render={(props) => <PersonagensComponent {...props} parse={Parse} />} />
                <Route path='/' exact render={() => <TelaPrincipal />} />
                <Redirect from="/*" to="/" />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    )
  }


}

export default App;
