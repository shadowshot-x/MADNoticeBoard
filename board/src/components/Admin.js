import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {DialogContent,DialogContentText,Dialog,DialogTitle, ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,TextField, Button,Select,MenuItem, GridList,GridListTileBar,GridListTile } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            content:'',
            title:'ANNOUNCEMENT',
            addedDialog:false,
            currentNotices:null
         }
        this.postFunc=this.postFunc.bind(this);
        this.handleContentChange=this.handleContentChange.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
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
    postFunc(){
        axios.post("http://localhost:3002/createNotice",{
            title:this.state.title,
            content:this.state.content
        }).then((res)=>{
            console.log(res);
            this.setState({
            content:'',
            title:'ANNOUNCEMENT',
            addedDialog:true
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    handleSelectChange(event){
        console.log(event.target.value);
        this.setState({
            title:event.target.value
        })
    }
    handleContentChange(event){
        this.setState({
            content:event.target.value
        })
    }
    handleDelete(id,arrind){
        console.log(id);
        axios.delete("http://localhost:3002/deleteNotice/"+id).then((res)=>{
            console.log(res);
        })
        let array=this.state.currentNotices;
        array.splice(arrind,1);
        this.setState({
            currentNotices:array
        })
    }
    render() { 
        return ( 
            <div>
                <Navbar/>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content">
                    Add to the Notice Board
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{width:`100%`}}>
                        <div style={{padding:`5px`}}>
                            <Select value={this.state.title}
                        onChange={this.handleSelectChange}>
                                <MenuItem value="ANNOUNCEMENT">ANNOUNCEMENT</MenuItem>
                                <MenuItem value="NEWS">NEWS</MenuItem>
                                <MenuItem value="MESSAGE">MESSAGE</MenuItem>
                            </Select>
                        </div>
                        <div style={{padding:`5px`}}><TextField value={this.state.content} placeholder="Please enter Content" style={{width:'70%'}} onChange={this.handleContentChange}/></div>
                        <div style={{padding:`5px`}}><Button style={{fontWeight:800,color:"white",backgroundColor:"red"}} onClick={this.postFunc}>SUBMIT</Button></div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <div style={{paddingLeft:"3vw",paddingRight:"3vw"}}>
                    <h3>ANNOUNCEMENTS</h3>
                    {(this.state.currentNotices)?<div>
                        <GridList cols={2.5}  style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}}>
                            {this.state.currentNotices.map((ele)=>{
                                if(ele.title=="ANNOUNCEMENT"){
                                   return <GridListTile  style={{border:"solid",borderColor:"black",padding:"2vh"}} key={ele.content}>
                                       <p>{ele.content}</p>
                                        <GridListTileBar style={{backgroundColor:"red",color:"white",cursor:"pointer"}} title="Delete" onClick={()=>this.handleDelete(ele._id,this.state.currentNotices.indexOf(ele))}>
                                        </GridListTileBar>
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
                                       <GridListTileBar style={{backgroundColor:"red",color:"white",cursor:"pointer"}}  title="Delete" onClick={()=>this.handleDelete(ele._id,this.state.currentNotices.indexOf(ele))}>                                        
                                        </GridListTileBar>
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
                                       <GridListTileBar style={{backgroundColor:"red",color:"white",cursor:"pointer"}}  title="Delete" onClick={()=>this.handleDelete(ele._id,this.state.currentNotices.indexOf(ele))}>
                                        </GridListTileBar>
                                    </GridListTile>
                                }
                            })}
                        </GridList>
                    </div>:<div>Sorry, no Announcements yet</div>}
                </div>

                <Dialog onClose={()=>{
                    this.setState({addedDialog:false})
                    window.location.reload();
                    }} open={this.state.addedDialog}>
                    <DialogTitle>
                        ADDED TO THE NOTICE BOARD
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        We have added the notice to the Board. Feel Free to Check It Out! 
                        </DialogContentText>
                    </DialogContent>
                </Dialog>    
            </div>
         );
    }
}
 
export default Admin;