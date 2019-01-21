import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SvgIcon from '@material-ui/core/SvgIcon';
import oAuth from '../../src/utils/oauth';

const oAuthController = new oAuth();

const responseGoogle = (response) => {
    console.log(response);
}
const styles = {
    root: {
        flexGrow: 1,
        height: 41
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
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
        auth: false,
        anchorEl: null,
    };
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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
        const that = this;
        oAuthController.getUserContactsGroups().then((res)=> {
            console.log(res);
            that.props.isLogin(true);
            that.setState({auth: true});
        }).catch((e)=>{
            console.log(e);
            that.props.isLogin(false);
            that.setState({auth: false});
        })
    }
    logout() {
        this.props.isLogin(false);
        this.setState({auth: false})
    }
    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <HomeIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                    </Typography>
                    {auth ?(
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ):(<div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.login}
                            color="inherit"
                        >
                            Login with Google
                        </IconButton>
                    </div>)
                    }
                </Toolbar>
            </AppBar>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);