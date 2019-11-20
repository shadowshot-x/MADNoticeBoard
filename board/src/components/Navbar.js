import React, { Component } from 'react';
import {AppBar,Toolbar,IconButton,Typography,Button} from '@material-ui/core';
import logo from '../logo/mad_logo.png'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <AppBar style={{backgroundColor:"black",paddingRight:"3vw",paddingLeft:"3vw"}} position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow:1}}>
                    <img src={logo} />
                    </Typography>
                    <Button style={{float:"right",backgroundColor:"red",color:"white",fontWeight:800}}>DONATE</Button>
                </Toolbar>
            </AppBar>
         );
    }
}
 
export default Navbar;