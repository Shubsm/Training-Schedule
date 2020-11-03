import React,{Component} from "react";
import {useSubscription,useMutation,gql} from '@apollo/client';

import {Link, Router} from "react-router-dom";


import Create from "./Create";

import moment from 'moment'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import Logo from "./shared/Logo"
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";



const SCHEDULES = gql`

subscription MyQuery {
  Schedules(order_by: {created_at: desc}) {
    title
    date
    start_time
    end_time
    id
  }
}

`;


const containerStyle = {
  width: "100%",
  margin:"auto auto",
	background: "#C5EBEB",
  boxShadow: "0 0 3px rgba(0,0,0, 0.1)",

  width: "100%"
};



export default function Schedules(){
  const {loading , error , data} = useSubscription(SCHEDULES);
 if (loading) return <p>Loading....</p>
 if (error) return <p>Error....</p>
 


   return(<div>
     <Logo />
     <Link to="/create"> <span >  <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={ {alignSelf:"stretch", marginBottom:"10px"} }>Create</Button></span></Link>
   
    <div  style={containerStyle}>
    
    {data.Schedules.map(({id,title,date,start_time,end_time})=>(
    <List>
    
       <ListItem button key = {id} alignItems="flex-start">
      <ListItemIcon>
              <EventIcon style={{ color: "#DC7213", fontSize: "2em" }} />
       </ListItemIcon>
       <ListItemText>  <React.Fragment>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "#05A4F9" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em",fontSize:"2em",color: "#05A4F9" }}>
                     Date:
                    </span>
                    <span style={{ fontWeight: "bold", marginRight: ".5em",fontSize:"2em",color: "#05A4F9" }}>
                    {""}{moment(date).format("MMMM Do YYYY")}{""}
                    </span>
                    
                  </Typography>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "#05A4F9" }}
                  >
                    
                    <span style={{ fontWeight: "bold", marginRight: ".5em",fontSize:"2em" }}>
                      Time:
                    </span>
                    <span style={{ fontWeight: "bold", marginRight: ".5em",fontSize:"2em" }}>
                    { moment(start_time, "HH:mm:ss").format("hh:mm A")} - { moment(end_time, "HH:mm:ss").format("hh:mm A")}
                    </span>
                    
                  </Typography>
                 
                
                </React.Fragment></ListItemText>
     
       
    <span style={{ fontWeight: "bold", marginLeft: "1em",fontSize:"1em",color:"#DC7213" }}>{title}
    </span>  
     
       
       </ListItem>
 
   </List>
     ))}
   </div> 
   </div>
   );
 


}

