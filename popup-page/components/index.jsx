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
    constructor(props){
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                 <Header/>
                 <Home/>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);