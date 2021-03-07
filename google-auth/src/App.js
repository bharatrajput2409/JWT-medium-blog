import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import User from "./components/user";
import PrivateComp from "./components/privatecomp";
import pagenotfound from "./components/pagenotfound";
import { AuthContextProvider } from './_services/authContext'

import authApi from './_services/authApi'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logedIn: false
    }
  }
  componentDidMount = async () => {
    let loged_in = await authApi.validateToken();  //check the status of user if user refresh or opens site in new tab.
    if (loged_in === true) {
      this.setState({
        logedIn: true
      })
    }else{
      console.log('user not logedIn');
    }
  }
  login = () => {
    this.setState({
      logedIn: true
    })
  }
  logout = () => {
    this.setState({
      logedIn: false
    })
  }

  render() {
    var privateUrl;
    if (this.state.logedIn) {
      privateUrl = [<Route exact path="/user" key="1" component={User} />, <Route exact path="/privateurl" key="2" component={PrivateComp} />];
    } else {
      privateUrl = [];
    }
    return (
      <>
        <Router>
          <Switch>
            <AuthContextProvider value={{ isLogedIn: this.state.logedIn, login: this.login, logout: this.logout }} >
              <Switch>
                <Route exact path="/" component={Home} />
                {privateUrl}
                <Route component={pagenotfound} />
              </Switch>
            </AuthContextProvider>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
