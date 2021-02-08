import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import Login from "./login";
import SignUp from "./signup";
import {QuizGame} from "./quizgame";
import HeaderBar from "./headerbar";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        avatar: null,
        userId: null
        };

        //this.updateLoggedInUserAvatar = this.updateLoggedInUserAvatar.bind(this);
    }

    updateLoggedInUserId = (userId) => {
        
        this.setState({userId: userId});
    };

    updateLoggedInUserAvatar = (avatar) => {
        this.setState({avatar: avatar});
        console.log('Updated user avatar:')
        let av = this.state.avatar;
        console.log(av)

    };

      
    notFound() {

        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested is not available.
                </p>
            </div>
        );

    };

    render() {

        return (
            <BrowserRouter>
                <div>
                <HeaderBar userId={this.state.userId}
                           avatar={this.state.avatar}
                           updateLoggedInUserId={this.updateLoggedInUserId}
                           updateLoggedInUserAvatar={this.updateLoggedInUserAvatar}/>
                <Switch>
                    <Route exact path="/quizgame/offline" component={QuizGame}/>
              {/*           <Route exact path="/quizgame/online"
                               render={props => <QuizGame {...props}
                                                       userId={this.state.userId}
                                                       updateLoggedInUserId={this.updateLoggedInUserId}/>}/>  */}

                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       userId={this.state.userId}
                                                       avatar={this.state.avatar}
                                                       updateLoggedInUserId={this.updateLoggedInUserId}
                                                       updateLoggedInUserAvatar={this.updateLoggedInUserAvatar}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        userId={this.state.userId}
                                                        avatar={this.state.avatar}
                                                        updateLoggedInUserId={this.updateLoggedInUserId}
                                                        updateLoggedInUserAvatar={this.updateLoggedInUserAvatar}/>}/>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      userId={this.state.userId}
                                                      avatar={this.state.avatar}
                                                      updateLoggedInUserId={this.updateLoggedInUserId}
                                                      updateLoggedInUserAvatar={this.updateLoggedInUserAvatar}/>}/>
                        <Route component={this.notFound}/>
                </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById("root"));
