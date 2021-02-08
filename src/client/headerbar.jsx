import React from "react";
import { Link, withRouter } from "react-router-dom";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }


  /**
   * When a user logs out we empty containers for userid and avatar in the props property.
   * And route back to homepage.
   */
  doLogout = async () => {
    const url = "/api/logout";

    let response;

    try {
      response = await fetch(url, { method: "post" });
    } catch (err) {
      alert("Failed to connect to server: " + err);
      return;
    }

    if (response.status !== 204) {
      alert("Error when connecting to server: status code " + response.status);
      return;
    }

    this.props.updateLoggedInUserId(null);
    this.props.updateLoggedInUserAvatar(null);
    this.props.history.push("/");
  };

  renderLoggedIn(userId, avatar) {

     let imageContent = <img/>;
    
    let blankAvatar = (<img className="loggedInUserAvatar" src='./images/blank.png'/> );
    
    if (!avatar){
           imageContent = blankAvatar
      }else{
          imageContent = (<img className="loggedInUserAvatar" src={avatar}/>);
      }  

    return (
      
      <div className="header">
      
        <h3 className="notLoggedInMsg">
          Welcome {userId} !!!
        </h3>
        
        <div className="logOutBtn" onClick={this.doLogout}>
           Logout
        </div>
         
        <h3 className="username">{userId}</h3>
        
        {imageContent}
     
      </div>
    );
  }

  renderNotLoggedIn() {

    return (
      <div className="header">
        <div className="notLoggedInMsg">You are not logged in</div>
        
        <div className="btnPart">
          <Link className="btn" to="/login">
            LogIn
          </Link>
          <Link className="btn" to="/signup">
            SignUp
          </Link>
        </div> 
      </div>
    );
  }

  render() {

    const userId = this.props.userId;
    let avatar = this.props.avatar;
    
    let content;
    
    if (!userId) {
      content = this.renderNotLoggedIn();
    } else {
      content = this.renderLoggedIn(userId, avatar);
    }

    return (
      <div className={"headerBar"}>
        <Link className="home btn" to={"/"}>
          Home
        </Link>
        {content}
      </div>
    );
  }
}

export default withRouter(HeaderBar);
