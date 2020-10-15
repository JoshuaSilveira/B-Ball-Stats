import React, { Component } from "react";
import { Card, Image, Row, Avatar ,Col,Button} from "antd";
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import props from "prop-types";
const { Meta } = Card;

function GameCard(props) {
  return (
    <div>
      <Card hoverable style={{ width: 320,height:'100%' }} size="small">
        <Row
          style={{
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent:"space-between"
          }}
        >
        <Col>
          <div style={{width: 100,display:'flex',justifyContent:'center'}}>
            <img
              style={{ width: "auto", height: 50, display: "block" }}
              src={require("../images/" + props.hometeam.TEAM_ID + ".png")}
            />
          </div>
          <div style={{display:"block"}}>
             <h4 style={{ height: 3, lineHeight: 3 }}>
              {props.hometeam.TEAM_NAME}
              <span style={{ display: "block", lineHeight: 0 }}>
                {" "}
                {props.hometeam.PTS}
              </span>
            </h4>
          </div>
        </Col>
         
        <Col>
          <div style={{width: 100,display:'flex',justifyContent:'center'}}>
            <img
              style={{ width: "auto", height: 50, display: "block" }}
              src={require("../images/" + props.awayteam.TEAM_ID + ".png")}
            />
          </div>
          <h4 style={{ height: 3, lineHeight: 3 }}>
            {props.awayteam.TEAM_NAME}
            <span style={{ display: "block", lineHeight: 0 }}>
              {" "}
              {props.awayteam.PTS}{" "}
            </span>
          </h4>
          
          </Col> 
        </Row>
        <h5>{props.status}</h5>
        
        <div style={{
            paddingBottom: 30,
            paddingTop: 10,
            
          }}>
          <div style={{fontSize:'1.2em'}}>
          <p>
            {props.hometeam.PTS_QTR1} <span style={{fontSize:'.8em'}}> - Q1 - </span>{props.awayteam.PTS_QTR1}
          </p>
          <p>
            {props.hometeam.PTS_QTR2} <span style={{fontSize:'.8em'}}> - Q2 - </span>{props.awayteam.PTS_QTR2}
          </p>
          <p>
            {props.hometeam.PTS_QTR3} <span style={{fontSize:'.8em'}}> - Q3 - </span> {props.awayteam.PTS_QTR3}
          </p>
          <p>
            {props.hometeam.PTS_QTR4} <span style={{fontSize:'.8em'}}> - Q4 - </span> {props.awayteam.PTS_QTR4}
          </p>
          {(props.hometeam.PTS_OT1 > 0 && props.awayteam.PTS_OT1 > 0) && <p>{props.hometeam.PTS_OT1} <span style={{fontSize:'.8em'}}> - OT1 - </span> {props.awayteam.PTS_OT1}</p>}
          {(props.hometeam.PTS_OT2 > 0 && props.awayteam.PTS_OT2 > 0) && <p>{props.hometeam.PTS_OT2} <span style={{fontSize:'.8em'}}> - OT2 - </span> {props.awayteam.PTS_OT2}</p>}
          {(props.hometeam.PTS_OT3 > 0 && props.awayteam.PTS_OT3 > 0) && <p>{props.hometeam.PTS_OT3} <span style={{fontSize:'.8em'}}> - OT3 - </span> {props.awayteam.PTS_OT3}</p>}
        </div>
        </div>
        
          <Link style={{bottom:0,position:'absolute',paddingBottom:10,right:'25%',left:'25%'}} to={props.id}><Button type="primary">Scoreboard</Button></Link>
        
        
      </Card>
    </div>
  );
}

export default GameCard;
