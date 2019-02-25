import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ParticleButton from "./button";
import urlUtil from '../../src/utils/urlutil';
import dB from '../../src/utils/db';
const urlUtilController = new urlUtil();
const dBController = new dB();

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
    },
    Paper:{
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
        whiteSpace: 'nowrap'
    }
});
export class Home extends React.Component {

    state = {
        checkBox: false,
        showCloseAlltab: false,
        checkBoxLabelValue: "Select this url to hide from history.",
        isAllclosedTabsSet: false,
        closeAllParticlebutton: false,
        restoreAllParticlebutton: false
    };
    handleIncludeUrlChange() {
        console.log("this.state.checkBox", this.state.checkBox);
        urlUtilController.getCurrentOpenedTabHostName()
            .then((res)=>{
                if(this.state.checkBox=== false) {
                    console.log("checkbox not checked" , this.state.checkBox);
                    let putData = {};
                    putData[res] = "getCurrentOpenedTabHostName";
                    dBController.set(putData).then((resss)=>{
                        console.log("" , resss);
                        const checkBoxVal = this.state.checkBox;
                        let checkBoxLabel = (checkBoxVal===false)?"This Domain is in Hidden mode":"Select this domain to hide from history.";
                        this.setState({checkBox: !this.state.checkBox , checkBoxLabelValue: checkBoxLabel});
                    }).catch((ee)=>{
                    });
                }
                else {
                    dBController.remove(res).then((res_str)=>{
                        console.log("remove",res);
                        this.setState({checkBox: false,checkBoxLabelValue: "Select this domain to hide from history."});
                    })
                }
            })
            .catch((e)=>{
                console.log(e);
                this.setState({checkBox: false});
            });
            if(this.state.checkBox === true) {
                this.setState({showCloseAlltab:true});
                chrome.browserAction.setBadgeText({text: '♥'});
            }
            else {
                    /*
                    * check if any other incognito tab is opened
                    */
                    chrome.browserAction.setBadgeText({text: ''});
            }
    }
    constructor(props){
        super(props);
        this.handleCloseAll = this.handleCloseAll.bind(this);
        this.handleRestoreAll = this.handleRestoreAll.bind(this);
        this.handleIncludeUrlChange = this.handleIncludeUrlChange.bind(this);
    }
    componentDidMount() {
        //check if current tab is in hidden mode if yes then get settings
        urlUtilController.getCurrentOpenedTabHostName()
        .then((domain)=>{
            if(domain!== undefined)
                return dBController.get(domain);
        })
        .then((res)=>{
            console.log("getCurrentOpenedTabHostName",res);
            const key = Object.keys(res);
            return (key.length > 0) ? 1 : 0;
        })
        .then((res)=>{
            console.log(res);
            if(res===1)
                this.setState({checkBox: true, checkBoxLabelValue: "This Domain is in Hidden mode"});
            else
                this.setState({checkBox: false, checkBoxLabelValue: "Select this domain to hide from history."});
        }).catch((e)=>{
            console.log(e);
        });
        //check if there any closed_tabs session is in the storage
        dBController.get("restore_tabs_url_list").then((dbres)=>{
            if(dbres.restore_tabs_url_list.length>0)
                this.setState({isAllclosedTabsSet: true});
        }).catch((e)=>{
            console.log(e);
        });
        //check for hidden tabs if opened
        urlUtilController.checkIfIncognitoTabIsOpened()
            .then(result=>{
                console.log("showCloseAlltab ",result);
                if(result>1){
                    this.setState({showCloseAlltab: true});
                }
                else {
                    this.setState({showCloseAlltab: false});
                }
            })
            .catch(e=>{
                console.log("checkIfIncognitoTabIsOpened",e);
            });
    }
    handleCloseAll(){
        this.setState({closeAllParticlebutton: true,restoreAllParticlebutton: false});
        urlUtilController.closeAllCurrentBlockedUrlTabs()
            .then((res)=>{

            })
            .catch((e)=>{

            });
        this.setState({isAllclosedTabsSet: true});
    }
    handleRestoreAll(){
        setTimeout(()=>{
            this.setState({
                isAllclosedTabsSet: false,
                closeAllParticlebutton:false,
                restoreAllParticlebutton: true
            });
        },1000);
        urlUtilController.restoreAllClosedwithCloseAllTabs();
    }
    render() {
        const { classes } = this.props;
        return(
          <div>
              <h2>No need to open the url in incognito. ;)</h2>
              <Paper elevation={1} className={classes.Paper}>
                  <Typography variant="h5" component="h5">
                      <FormGroup row>
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={this.state.checkBox}
                                      onChange={this.handleIncludeUrlChange}
                                      value="checkedA"
                                  />
                              }
                              label={this.state.checkBoxLabelValue}
                          />
                      </FormGroup>
                  </Typography>
              </Paper>
              <Divider variant="middle" />
               {this.state.showCloseAlltab && <Paper elevation={1}  className={classes.Paper}>
                  <Typography  variant="h5" component="h5">
                      <FormGroup row>
                          <FormControlLabel
                              control={
                                  <Button variant="outlined" onClick={()=>this.handleCloseAll()} color="secondary" className={classes.button}>
                                      <ParticleButton hidden={this.state.closeAllParticlebutton} label="Close All" color="#0000ff"/>
                                  </Button>
                              }
                              label="Close all tabs that are in hidden mode."
                          />
                      </FormGroup>
                  </Typography>
              </Paper>}
              <Divider variant="middle" />
              {this.state.isAllclosedTabsSet && <Paper elevation={1}  className={classes.Paper}>
                  <Typography  variant="h5" component="h5">
                      <FormGroup row>
                          <FormControlLabel
                              control={
                                  <Button variant="outlined" onClick={()=>this.handleRestoreAll()} color="secondary" className={classes.button}>
                                      Restore closed tabs
                                  </Button>
                              }
                              label="Restore all tabs that were closed by 'Close all' tab"
                          />
                      </FormGroup>
                  </Typography>
              </Paper>}
          </div>
        );
    }
}
export default withStyles(styles)(Home);