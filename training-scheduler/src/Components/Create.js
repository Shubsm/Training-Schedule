import React,{Component,useState} from "react";
import {useSubscription,useMutation,gql} from '@apollo/client';

import { Mutation } from 'react-apollo'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { render } from "@testing-library/react";
import {client} from "../index"
import {Link, Router} from "react-router-dom";


const ADD_SCHEDULE = gql`
    mutation MyMutation($date:date!,$etime:time!  ,$stime:time!,$title:String!) {
      MyMutation(date: $date, etime: $etime, stime: $stime, title: $title) {
        affected_rows
      }
    }
    
    `;

    
    
    const containerStyle = {
      zIndex: 10,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#B4FFE9",
      padding: "0em 1em 1em",
      color: "#111111",
      borderRadius: "1em",
      boxShadow: "#000000 3px 3px 4px 1px",
      border: "1px #000000 solid"
    };
     
    

  
   const Create = (props) => {
   
   const[createschedule] = useMutation(ADD_SCHEDULE);
   const[date,setdate] =useState("");
   const[stime,setstime] =useState("");
   const[etime,setetime] =useState("");
   const[title,settitle] =useState("");
   

   const inputStyle = {
    minWidth: "10em",
     
  };
  const formTitleStyle = {
    fontWeight: "bold",
    padding: "1em 1em 1em",
    fontSize:20
    
  };
   return (
     <div style={containerStyle}>
    <form 
    onSubmit = {(e)=>{
        e.preventDefault();
        createschedule({variables:{title:title, date:date ,stime:stime,etime:etime}});
        props.history.push('/')
      }}>
         <center><h3 style={formTitleStyle}>Create the Schedule!</h3></center>
    <div class="form-group">
      <TextField id="title"  value={title}  style={inputStyle} 
            onChange={e => settitle(e.target.value)}  label="Title" />
   </div>
   <div class="form-group">
      <TextField
        id="date"
        defaultValue="2017-05-24"
        label="Date"
        type="date"
       
        value={date}
        onChange={e => setdate(e.target.value)}
       
        InputLabelProps={{
          shrink: true,
        }}
      />
    
    </div>
    <div class="form-group">
      <TextField
        id="stime"
      
        label="Start-Time"
       
        type="time"
        defaultValue="07:30"
        value={stime}
            onChange={e => setstime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
     </div>
     <div class="form-group">
      <TextField
        id="etime"
       
        label="End-Time"
        type="time"
       
        value={etime}
        onChange={e => setetime(e.target.value)}
        defaultValue="07:30"
       
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300,
        }}
      />
      </div> <div class="form-group" >
  <button type="submit" class="btn btn-primary">Create</button>
  </div>
</form>
    
</div>
    );
    
    }


export default Create

