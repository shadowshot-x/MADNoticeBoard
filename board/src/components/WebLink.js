import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {GridList,GridListTile } from '@material-ui/core';


class WebLink extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentNotices:null
         }
    }
    componentDidMount(){
        axios.get("http://localhost:3002/allNotices").then((res)=>{
            console.log(res);
            this.setState({
                currentNotices:res.data
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    render() { 
        return ( 
            <div>
            <Navbar />
            <h2 style={{paddingLeft:"3vw",paddingRight:"3vw"}}>NOTICE BOARD</h2>
            <div style={{paddingLeft:"3vw",paddingRight:"3vw"}}>
                    <h3>ANNOUNCEMENTS</h3>
                    {(this.state.currentNotices)?<div>
                        <GridList cols={2.5}  style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}}>
                            {this.state.currentNotices.map((ele)=>{
                                if(ele.title=="ANNOUNCEMENT"){
                                   return <GridListTile  style={{overflowY:"auto",border:"solid",borderColor:"black",padding:"2vh"}} key={ele.content}>
                                       <p>{ele.content}</p>
                                    </GridListTile>
                                }
                            })}
                        </GridList>
                    </div>:<div>Sorry, no Announcements yet</div>}
                </div>

                <div style={{paddingLeft:"3vw",paddingRight:"3vw"}}>
                    <h3>NEWS</h3>
                    {(this.state.currentNotices)?<div>
                        <GridList cols={2.5} style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}}>
                            {this.state.currentNotices.map((ele)=>{
                                if(ele.title=="NEWS"){
                                   return <GridListTile  style={{border:"solid",borderColor:"black",padding:"2vh"}} key={ele.content}>
                                       <p>{ele.content}</p>
                                    </GridListTile>
                                }
                            })}
                        </GridList>
                    </div>:<div>Sorry, no News yet</div>}
                </div>

                <div style={{paddingLeft:"3vw",paddingRight:"3vw"}}>
                    <h3>MESSAGES</h3>
                        {(this.state.currentNotices)?<div>
                        <GridList cols={2.5} style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}}>
                            {this.state.currentNotices.map((ele)=>{
                                if(ele.title=="MESSAGE"){
                                   return <GridListTile style={{border:"solid",borderColor:"black",padding:"2vh"}} key={ele.content}>
                                       <p>{ele.content}</p>
                                    </GridListTile>
                                }
                            })}
                        </GridList>
                    </div>:<div>Sorry, no Announcements yet</div>}
                </div>
                </div>
         );
    }
}
 
export default WebLink;