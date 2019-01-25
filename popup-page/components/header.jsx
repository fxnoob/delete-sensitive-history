import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
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
class MenuAppBar extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <HomeIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);