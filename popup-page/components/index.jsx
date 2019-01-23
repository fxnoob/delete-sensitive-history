import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Home from "./home";
import Header from './header';
const styles = {
    root: {
        flexGrow: 1,
        width: 500 ,
        height: 300
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };
    constructor(props){
        super(props);
        this.isLogin = this.isLogin.bind(this);

    }
    isLogin(authStat) {
        this.setState({auth: authStat});
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                 <Header data={1} isLogin={this.isLogin}/>
                 <Home isLogin={this.state.auth}/>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);