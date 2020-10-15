import React, { Component, useEffect, useState, useLayoutEffect } from "react";
import {
  Card,
  Image,
  Row,
  Avatar,
  Col,
  Button,
  Space,
  Divider,
  Descriptions,
  Tabs,
} from "antd";
import PlayerStats from "./PlayerStats";
import { Layout, Typography } from "antd";
const { TabPane } = Tabs;

function PlayerPage(props) {
  const [player, setPlayer] = useState({ info: { TEAM_ID: "" } });
  const [data, setData] = useState([]);
  const [teamID, setTeam] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { Header, Footer, Sider, Content } = Layout;
  const { Title, Paragraph } = Typography;

  async function fetchData() {
    setIsLoading(true);

    const result = await fetch(
      "server url here" + props.match.params.playerid
    );

    const stuff = await result.json();
    setIsLoading(false);

    return stuff;
  }

  useEffect(() => {
    fetchData()
      .then((data) => stuffEffect(data))
      .catch((err) => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
  }, []);

  function stuffEffect(playerinfo) {
    const thisPlayer = {};
    const infoArray = [];
    const headlineArray = [];
    const thisData = [];

    const infoRows = playerinfo.resultSets[0].rowSet;
    const headlineRows = playerinfo.resultSets[1].rowSet;

    infoRows.forEach((element) => {
      var info = {};
      for (
        let index = 0;
        index < playerinfo.resultSets[0].headers.length;
        index++
      ) {
        const header = playerinfo.resultSets[0].headers[index];
        info[header] = element[index];
      }
      infoArray.push(info);
      thisPlayer["info"] = info;
    });

    headlineRows.forEach((element) => {
      var headline = {};
      for (
        let index = 0;
        index < playerinfo.resultSets[1].headers.length;
        index++
      ) {
        const header = playerinfo.resultSets[1].headers[index];
        headline[header] = element[index];
      }
      headlineArray.push(headline);
      thisPlayer["headline"] = headline;
    });
    setTeam(thisPlayer.info.TEAM_ID);
    thisData.push(thisPlayer);
    setPlayer(thisPlayer);
    setData(thisData);
  };
  function imageWidth(){
    if(window.innerWidth > 446){
      return 190;
    }else if(window.innerWidth < 445 && window.innerWidth > 407 ){
      return 140
    }
    else return 90;
    
  }
  return (
    <div style={{ justifyContent: "center" }}>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          {data.map((player) => (
            <div>
              {console.log(window.innerWidth)}
                <Row style={{ justifyContent: "center" }}>
                
                  <Card style={{width:'100%'}}>
                    <Row  gutter={{ xs: 1, sm: 25, md: 50, lg: 60, xl: 100 }} style={{justifyContent:"center"}}>
                      {console.log(player)}
                      
                      <Col style={{paddingBottom:10}}>
                        <Avatar
                        
                          size={imageWidth()}
                          src={
                            "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" +
                            props.match.params.playerid +
                            ".png"
                          }
                        />
                      </Col>
                      <Col className="gutter-row"/>
                      <Col className="gutter-row" style={{justifyContent: "center"}}>
                        <div
                          style={{
                            display: "inline-block",
                            paddingLeft:10,
                            textAlign: "left",
                            
                          }}
                        >
                          <Title level={4} style={{ marginBottom: "3px" }}>
                            {player.info.DISPLAY_FIRST_LAST}
                          </Title>
                          <div
                            style={{ display: "flex", justifyContent: "left" }}
                          >
                            <img
                              style={{
                                width: "auto",
                                height: 20,
                                display: "inline",
                              }}
                              src={require("../images/" +
                                player.info.TEAM_ID +
                                ".png")}
                            />

                            <Paragraph
                              style={{
                                display: "inline",
                                paddingLeft: "5px",
                                fontSize: ".8em",
                                
                              }}
                            >
                              {player.info.TEAM_CITY} {player.info.TEAM_NAME} •{" "}
                              {player.info.POSITION} • #{player.info.JERSEY}
                            </Paragraph>
                          </div>
                          <Divider style={{ margin: "4px" }} />
                          <div style={{ fontSize: ".8em" }}>
                            <Row gutter={{ xs: 8, sm: 10, md: 10, lg: 10 }}>
                              <Col>
                                <Paragraph
                                  style={{
                                    display: "block",
                                    marginBottom: "1px",
                                  }}
                                >
                                  Status: {player.info.ROSTERSTATUS}
                                </Paragraph>
                                {player.info.DRAFT_YEAR === "Undrafted" ? (
                                  <Paragraph
                                    style={{
                                      display: "block",
                                      marginBottom: "1px",
                                    }}
                                  >
                                    Draft: {player.info.DRAFT_YEAR}
                                  </Paragraph>
                                ) : (
                                  <Paragraph
                                    style={{
                                      display: "block",
                                      marginBottom: "1px",
                                    }}
                                  >
                                    Draft: {player.info.DRAFT_YEAR} Rd:{" "}
                                    {player.info.DRAFT_ROUND} Pk:{" "}
                                    {player.info.DRAFT_NUMBER}
                                  </Paragraph>
                                )}

                                <Paragraph
                                  style={{
                                    display: "block",
                                    marginBottom: "1px",
                                  }}
                                >
                                  Years : {player.info.FROM_YEAR} -{" "}
                                  {player.info.TO_YEAR}
                                </Paragraph>
                               
                              </Col>
                              <Col>
                              <Paragraph
                                  style={{
                                    display: "block",
                                    marginBottom: "1px",
                                  }}
                                >
                                  Height: {player.info.HEIGHT}
                                </Paragraph>
                                <Paragraph
                                  style={{
                                    display: "block",
                                    marginBottom: "1px",
                                  }}
                                >
                                  Weight: {player.info.WEIGHT}
                                </Paragraph>
                              </Col>

                            </Row>
                            <Paragraph
                              style={{ display: "block", marginBottom: "1px" }}
                            >
                              School: {player.info.LAST_AFFILIATION}
                            </Paragraph>

                            <Divider style={{ display: "block", margin: 5 }} />
                          </div>
                          <div style={{ fontSize: ".9em" }}>
                            <Paragraph
                              style={{ margin: 0, fontWeight: "bold" }}
                            >
                              {player.headline.TimeFrame} Season Stats:{" "}
                            </Paragraph>
                            <Paragraph style={{ display: "inline", margin: 0 }}>
                              Points: {player.headline.PTS}
                            </Paragraph>
                            <Paragraph style={{ display: "inline", margin: 0 }}>
                              {" "}
                            </Paragraph>

                            <Paragraph style={{ display: "inline", margin: 0 }}>
                              Assists: {player.headline.AST}
                            </Paragraph>
                            <Paragraph style={{ display: "inline", margin: 0 }}>
                              {" "}
                            </Paragraph>
                            <Paragraph style={{ display: "inline", margin: 0 }}>
                              Rebounds: {player.headline.REB}
                            </Paragraph>
                          </div>
                        </div>
                      </Col>
                      <Col className="gutter-row"></Col>
                      <Col className="gutter-row"></Col>
                    </Row>
                    <Divider/>
                    <Row style={{ justifyContent: "center",paddingLeft:'-5vw',paddingRight:'-5vw'}}>
                    
                    <Card   style={{width:'100%'}}>
                    <Row> <Title level={5} style={{}}>Career Stats</Title></Row>
                   
                    
                      <Tabs type="card" defaultActiveKey="1">
                        <TabPane tab="Totals" key="1">
                          <PlayerStats
                            type={"Totals"}
                            id={player.headline.PLAYER_ID}
                          />
                        </TabPane>
                        <TabPane tab="Per Game" key="2">
                          <PlayerStats
                            type={"PerGame"}
                            id={player.headline.PLAYER_ID}
                          />
                        </TabPane>
                        <TabPane tab="Per 36" key="3">
                          <PlayerStats type={"Per36"} />
                        </TabPane>
                      </Tabs>
                    </Card>
                  
                </Row>
                  </Card>
                 
                </Row>
                
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayerPage;
