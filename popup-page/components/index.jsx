import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Db from "../../src/utils/db";
import * as JsonData from "../../src/data/websites";

import Home from "./home";
import Header from './header';
const dbController = new Db();
const responseGoogle = (response) => {
    console.log(response);
}
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
function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
function LoginIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"/>
        </SvgIcon>
    );
}
class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };
    componentWillMount() {

    }

    constructor(props){
        super(props);
        this.isLogin = this.isLogin.bind(this);

    }
    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    login() {

    }
    isLogin(authStat) {
        this.setState({auth: authStat});
    }
    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

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