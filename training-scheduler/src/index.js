import React,{Component} from 'react';
import {render} from 'react-dom';
import './index.css';



import {ApolloClient, HttpLink , InMemoryCache,split} from '@apollo/client';
import {getMainDefinition} from "@apollo/client/utilities"
import {WebSocketLink} from "@apollo/link-ws"
import {BrowserRouter as Router,Route , Switch,Link,Redirect} from "react-router-dom";
import Schedules from "./Components/Schedules";
import Create from "./Components/Create";
import { ApolloProvider } from '@apollo/client'



const httpLink = new HttpLink({
  uri: 'https://training-schedule.hasura.app/v1/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://training-schedule.hasura.app/v1/graphql',
  options:{
    reconnect:true
  }
});

const splitLink = split(
({query}) => {
  const definition  = getMainDefinition(query);
  return (
definition.kind === "OperationDefinition" && definition.operation === "subscription"
  );
},
wsLink,
httpLink

);

 export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link : splitLink

});


const App = () => (
  <ApolloProvider client={client}>
    
    <Router>
    <Switch>
  <Route exact path="/" component = {Schedules}/>
  <Route  exact path="/create" component = {Create}/>
  </Switch>
  </Router>
  
</ApolloProvider>
);











render(<App /> ,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals




