import React, { Component, useEffect, useState } from "react";
import GameCard from "./GameCard";
//import games from "../data/games.json";
import axios from "axios";
import {
  Row,
  Col,
  DatePicker,
  PageHeader,
  Typography,
  Alert,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import moment from "moment";
const { Title } = Typography;
function Games() {
  const [day, setDay] = useState({});
  const [todaysGames, setTodaysGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [date, setDate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 45, color: "grey" }} spin />
  );

  function onChange(date, dateString) {
    setDate(dateString);
  }

  function theDate() {
    return new Date().toLocaleDateString(
      {},
      { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
    );
  }

  const splitEvery = (array, length) =>
    array.reduce((result, item, index) => {
      if (index % length === 0) result.push([]);
      result[Math.floor(index / length)].push(item);
      return result;
    }, []);

  async function fetchData() {
    setIsLoading(true);
    let res = {};
    if (date === undefined) {
      const thisDay = new Date();

      res = await fetch(
        "server url" +
          thisDay.getFullYear() +
          "-" +
          (thisDay.getMonth() + 1) +
          "-" +
          thisDay.getDate()
      );
    } else {
      res = await fetch("server url" + date);
    }

    const stuff = await res.json();
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
    //fetchData();
  }, [date]);

  function stuffEffect(games) {
    const gameArray = [];
    const teamArray = [];
    const gameRows = games.resultSets[0].rowSet;
    const teamRows = games.resultSets[1].rowSet;

    gameRows.forEach((element) => {
      var game = {};
      for (let index = 0; index < games.resultSets[0].headers.length; index++) {
        const header = games.resultSets[0].headers[index];
        game[header] = element[index];
      }
      gameArray.push(game);
    });

    teamRows.forEach((element) => {
      var team = {};
      for (let index = 0; index < games.resultSets[1].headers.length; index++) {
        const header = games.resultSets[1].headers[index];
        team[header] = element[index];
      }
      teamArray.push(team);
    });

    gameArray.forEach((game) => {
      teamArray.forEach((team) => {
        if (team.TEAM_ID === game.HOME_TEAM_ID) {
          game["HOME_TEAM_LINE"] = team;
        }
        if (team.TEAM_ID === game.VISITOR_TEAM_ID) {
          game["AWAY_TEAM_LINE"] = team;
        }
      });
    });

    setTodaysGames(gameArray);

    console.log(gameArray);
    console.log(teamArray);
  }
  /*
    game.foreach(team=>{
        if(team.TEAM_ID===HOME_TEAM_ID){
            return team;
        }
    })

  */
  return (
    <div>
      <div style={{ padding: 24 }}>
        <PageHeader
          style={{
            border: "1.5px solid rgb(232 232 232)",
            backgroundColor: "#fff",
          }}
        >
          <Title>To view the games for a day select a date</Title>
          <div style={{ paddingBottom: 10 }}>
            <DatePicker onChange={onChange} />
          </div>
        </PageHeader>
      </div>
      {isLoading ? (
        <div>
          <Spin
            style={{ paddingTop: "20%" }}
            indicator={antIcon}
            size="large"
          />
          <Title level={5}>Loading Games</Title>
        </div>
      ) : (
        <div>
          {todaysGames.length === 0 && (
            <Alert
              type="info"
              style={{ width: "50%", left: "25%" }}
              showIcon
              message="There are no games on this day select another day."
            />
          )}

          {splitEvery(todaysGames, 3).map((gameRow) => (
            <Row style={{ padding: 10, justifyContent: "center" }}>
              {gameRow.map((game) => (
                <Col
                  style={{
                    paddingRight: 10,
                    paddingBottom:10,
                    overflow: "visible",
                    height: "auto",
                    display: "flex",
                  }}
                >
                  <GameCard
                    date={date}
                    id={game.GAME_ID}
                    status={game.GAME_STATUS_TEXT}
                    hometeam={game.HOME_TEAM_LINE}
                    awayteam={game.AWAY_TEAM_LINE}
                  />
                </Col>
              ))}
            </Row>
          ))}
        </div>
      )}
    </div>
  );
}

export default Games;
