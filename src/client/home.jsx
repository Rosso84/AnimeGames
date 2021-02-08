import React from "react";
import HeaderBar from "./headerbar";
import {Link} from 'react-router-dom';
import { use } from "passport/lib";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      steamPersonaName: null,
      steamAvatar: null,
      errorMsg: null
    };
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchSteamUser = this.fetchSteamUser.bind(this);
  }


  componentDidMount() {
    this.fetchSteamUser();
  } 


  fetchSteamUser = async() => {

    let queryUsers = "?user";

    const url = "http://localhost:8080/api/steamUsers" + queryUsers;
    
    let response;
    let payload;

    try {
        response = await fetch(url);
        payload = await response.json(); 

    
      } catch (err) {
      //alert("Failed to connect to server while fetching steam user object: "+ err);
      console.log("Failed to connect to server while fetching steam user object: "+ err);
        return;
    } 

    if (response.status === 200) {

        this.setState(
            prev => {
                if(prev.steamPersonaName === null){
                    return {
                      steamPersonaName: payload.personaname,
                      steamAvatar: payload.avatar
                    };
                } else {
                    return;
                }
            }
        );
        
    } else {
        //alert("Error when connecting to server: status code "+ response.status);
        console.log("Error when connecting to server: status code "+ response.status);
    }
    let username = this.state.steamPersonaName;
    let avatar = this.state.steamAvatar;
    
    console.log('avatar from fetch (homepage): ' + avatar);

    this.props.updateLoggedInUserId(username);
    this.props.updateLoggedInUserAvatar(avatar);
    this.props.history.push("/");
}


  renderLoggedIn() {

    return (
      <div>
        <div className="logged_in_menu">
          
          <h3 className="choose_game_txt">Play Offline quiz challenge!</h3> 
       
          <img className="quiz_img" src='./images/quiz_img.png'/>
        
          <Link to={"/quizgame/offline"}>
            <button className="btn_pLay_quiz">Play</button>
          </Link>
        </div>
      </div>
    );
  }

  renderNotLoggedIn() {
   
     return (
      <div>
        <h4>
          Join for a game! You need to log in first, but if you do not
          have an account, you can sign up to create a new one or sign in with a Steam account.
        </h4>

        <div className="game_div">
            <img className="not_logged_in_Homepage_img" src='./images/kakashi.png' width="450px" height="450px"/> 
            <p className="not_logged_in_Homepage_image_tekst">
              Play a quizgame similar to Kahoot and see how much you know about anime movies and manga! 
            </p>
        </div>
      </div>
    );
  }

  render() {
    const userId = this.props.userId;
    let pageContent;

    if (!userId) {
      pageContent = this.renderNotLoggedIn();
    } else {
      pageContent = this.renderLoggedIn();
    }

    let error = <div />;
    if (this.state.errorMsg) {
      error = (
        <div className="errorMsg">
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }

    return (
      <div>
        <div>
          <p className="games_header_text">Anime Games</p>
        </div>
          {pageContent}
          {error}
        </div>
    );
  }
}
