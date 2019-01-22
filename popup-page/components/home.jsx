import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
              <h2>Hi, dear user.</h2>
              <Paper elevation={1}>
                  <Typography variant="h5" component="h5">
                      <select>
                          <option>this url</option>
                      </select>
                  </Typography>
                  <Typography component="p">
                      Paper can be used to build surface or other elements for your application.
                  </Typography>
              </Paper>
          </div>):(
              <div>
                  <h2>Not logged in </h2>
                  <Paper elevation={1}>
                      <Typography variant="h5" component="h3">
                          This is a sheet of paper.
                      </Typography>
                      <Typography component="p">
                          Paper can be used to build surface or other elements for your application.
                      </Typography>
                  </Paper>
              </div>
          )
        );
    }
}