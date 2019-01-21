import React from 'react';

export default class Home extends React.Component {

    state = {
        auth: false,
        anchorEl: null,
        isLogin: false
    };
    constructor(props){
        super(props);
        this.state.isLogin = this.props.isLogin;
    }
    render() {
        return(
          this.props.isLogin ?(
          <div>
              <h2>Logged in </h2>
          </div>):(
              <div>
                  <h2>Not logged in </h2>
              </div>
          )
        );
    }
}