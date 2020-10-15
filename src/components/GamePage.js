import React, { Component, useEffect, useState, useRef } from "react";
//import boxscore from "../data/boxscore.json";
import { Table, Row, Col, Card, Alert, Button, Spin,Typography } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from "axios";

function GamePage(props) {
  const [boxScore, setBoxScore] = useState([]);
  const {Title} = Typography;
  const [boxscore, setBox] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 45,color:'grey' }} spin />;

  const dnp = [
    {
      title: "Inactive Players",
      dataIndex: "PLAYER_NAME",
      width: 150,
    },

    {
      title: "",
      dataIndex: "COMMENT",
      width: 600,
    },
  ];
  const teamColumns = [
    {
      title: "Totals",
      dataIndex: "TEAM_NAME",
      width: 130,
      fixed: "left",
    },
    {
      title: "MIN",
      width:'8%',
      dataIndex: "MIN",
      
    },
    {
      title: "FGM",
      dataIndex: "FGM",
      
    },
    {
      title: "FGA",
      dataIndex: "FGA",
      
      
    },
    {
      title: "FTM",
      dataIndex: "FTM",
      
      
    },
    {
      title: "FTA",
      dataIndex: "FTA",
      
      
    },
    {
      title: "3PT%",
      dataIndex: "FG3_PCT",
      
      
    },
    {
      title: "OREB",
      dataIndex: "OREB",
      
    },
    {
      title: "DREB",
      dataIndex: "DREB",
      
    },
    {
      title: "AST",
      dataIndex: "AST",
      
    },
    {
      title: "STL",
      dataIndex: "STL",
      
    },
    {
      title: "BLK",
      dataIndex: "BLK",
     
    },
    {
      title: "TO",
      dataIndex: "TO",
      
    },
    {
      title: "PTS",
      dataIndex: "PTS",
      
    },
    {
      title: "+/-",
      dataIndex: "PLUS_MINUS",
      
    },
  ];

  
  const columns = [
    {
      title: "Player",
      dataIndex: "PLAYER_NAME",
      fixed: "left",
      width:130,
      render: (text, record) => (
        <div>
          <Link to ={"/player/"+record.PLAYER_ID}>{text}</Link>
          
        </div>
          
        
      ),
    },
    {
      title: "MIN",
      dataIndex: "MIN",
      width:'8%',
      key:'min'
    },
    {
      title: "FGM",
      dataIndex: "FGM",
      key:'fgm',
      
    },
    {
      title: "FGA",
      dataIndex: "FGA",
     
      key:'fga'
      
    },
    {
      title: "FTM",
      dataIndex: "FTM",
     
     key:'ftm'
    },
    {
      title: "FTA",
      dataIndex: "FTA",
      
      key:'fta'
    },
    {
      title: "3PT%",
      dataIndex: "FG3_PCT",
     
      key:'3pt%'
    },
    {
      title: "OREB",
      dataIndex: "OREB",
    
      key:'oreb'
    },
    {
      title: "DREB",
      dataIndex: "DREB",
      
      key:'dreb'
    },
    {
      title: "AST",
      dataIndex: "AST",
      key:'ast'
    },
    {
      title: "STL",
      dataIndex: "STL",
      key:'stl'
    },
    {
      title: "BLK",
      dataIndex: "BLK",
      key:'blk'
    },
    {
      title: "TO",
      dataIndex: "TO",
      key:'to'
    },
    {
      title: "PTS",
      dataIndex: "PTS",
      key:'pts'
    },
    {
      title: "+/-",
      dataIndex: "PLUS_MINUS",
     
      key:'plusminus'
    },
  ];

  /*async function fetchData() {
        const res = await fetch("http://127.0.0.1:5000/"+ props.match.params.gameid);
        res
          
          .then((res) => setBox(res.json()))
          .catch((err) => console.log(err));
        
        
    console.log("SHIIT")
          
    }*/
  const fetchData = async () => {
    setIsLoading(true);
    const result = await fetch(
      "server url" + props.match.params.gameid
    );

    const stuff = await result.json();
    setIsLoading(false);
    return stuff;
  };

  useEffect(() => {
    fetchData().then((data) => stuffEffect(data));
  }, []);

  function stuffEffect(boxscore) {
    const teamArray = [];
    const playerArray = [];

    const teamRows = boxscore.resultSets[1].rowSet;
    const playerRows = boxscore.resultSets[0].rowSet;

    teamRows.forEach((element) => {
      var team = {};

      for (
        let index = 0;
        index < boxscore.resultSets[1].headers.length;
        index++
      ) {
        const header = boxscore.resultSets[1].headers[index];
        team[header] = element[index];
      }
      teamArray.push(team);
    });

    playerRows.forEach((element) => {
      var players = {};

      for (
        let index = 0;
        index < boxscore.resultSets[0].headers.length;
        index++
      ) {
        const header = boxscore.resultSets[0].headers[index];
        players[header] = element[index];
      }
      playerArray.push(players);
    });

    teamArray.forEach((team) => {
      const activePlayers = [];
      const inactivePLayers = [];
      playerArray.forEach((player) => {
        if (player.TEAM_ID === team.TEAM_ID) {
          if (player.COMMENT !== "") {
            inactivePLayers.push(player);
          } else {
            activePlayers.push(player);
          }
        }
      });
      team["ACTIVE_PLAYERS"] = activePlayers;
      team["INACTIVE_PLAYERS"] = inactivePLayers;
    });
    console.log(teamArray);
    setBoxScore(teamArray);
  }
  function destrcutor(team) {
    const { ACTIVE_PLAYERS, INACTIVE_PLAYERS, ...rest } = team;
    return [rest];
  }
  return (
    <div>
      {isLoading ? (
        <div><Spin style={{ paddingTop: "20%" }} indicator={antIcon} size="large" />
        <Title level={5}>Loading Scoreboard Data</Title></div>
        
      ) : (
        <div>
          {boxScore.length === 0 && (
            <Alert
              type="info"
              style={{ width: "50%", left: "25%", top: 150 }}
              showIcon
              message="There is no boxscore data for this game yet."
            />
          )}

          <Row
            style={{
              width: "100%",
              paddingTop: 30,
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            {boxScore.map((team) => (
              <Col xs={28} md={20} lg={18} xl={10} style={{ padding: 10 }}>
                <Row>
                  <Card style={{ width: "100%" }}>
                    <Row>
                      <div style={{ objectFit: "cover" }}>
                        <img
                          style={{
                            width: "auto",
                            height: 40,
                            display: "inline",
                          }}
                          src={require("../images/" + team.TEAM_ID + ".png")}
                        />
                      </div>
                      <h3 style={{ height: 2, lineHeight: 2, paddingLeft: 6 }}>
                        {team.TEAM_NAME} - {team.PTS}
                      </h3>
                    </Row>
                  </Card>
                </Row>

                <Table
                  bordered
                  size="small"
                  pagination={false}
                  dataSource={team.ACTIVE_PLAYERS}
                  columns={columns}
                  scroll={{ x: 820 }}
                />
                <Table
                  bordered
                  size="small"
                  pagination={false}
                  dataSource={destrcutor(team)}
                  columns={teamColumns}
                  scroll={{ x: 820 }}
                />

                {team.INACTIVE_PLAYERS.length !== 0 && (
                  <Table
                    bordered
                    size="small"
                    pagination={false}
                    dataSource={team.INACTIVE_PLAYERS}
                    columns={dnp}
                  />
                )}
              </Col>
            ))}
          </Row>
          <Button>
            <Link to={"/"}>Back to Games</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default GamePage;
