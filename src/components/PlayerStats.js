import React, { Component, useEffect, useState, useLayoutEffect } from "react";

import {
    Spin,
    

    Table,
  } from "antd";
  import { Layout, Typography } from "antd";
  import { LoadingOutlined } from '@ant-design/icons';
  function PlayerStats(props) {
    const [stats,setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {Title} = Typography;
    const antIcon = <LoadingOutlined style={{ fontSize: 45,color:'grey' }} spin />;
    async function fetchData() {
        
        setIsLoading(true);

        const result = await fetch(
          "server url here" + props.id + "/" + props.type
        );
    
        const stuff = await result.json();
        setIsLoading(false);
    
        return stuff;
    }

    const columns = [
       
        {
            title: "Season",
            dataIndex: "SEASON_ID",
            width:'14%',
            fixed:"left"
        },
        {
          title: "Team",
          dataIndex: "TEAM_ABBREVIATION",

          
        },
        {
          title: "PTS",
          dataIndex: "PTS",
        },
        {
            title: "REB",
            dataIndex: "REB",
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
        
      ];

    useEffect(() => {
        fetchData()
          .then((data) => stuffEffect(data))
          .catch((err) => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
      }, []);
    
      function stuffEffect(playerinfo) {
        const player = {}
        
        const seasons = [];

        const rows = playerinfo.resultSets[0].rowSet;

        rows.forEach((element) => {
            var info = {};
            for (
              let index = 0;
              index < playerinfo.resultSets[0].headers.length;
              index++
            ) {
              const header = playerinfo.resultSets[0].headers[index];
              info[header] = element[index];
            }
            seasons.push(info);
            player["info"] = info;
        });

        console.log(seasons)
        setStats(seasons)


      }
    return(
      <div>
      {isLoading ? (
        <div><Spin style={{ paddingTop: "20%" }} indicator={antIcon} size="large" />
        <Title level={5}>Loading Stats</Title></div>
      ) : (
               <Table bordered
                  size="small"
                  pagination={false} dataSource={stats}
                  columns={columns} scroll={{x:500}}/> 
                
      )}
        </div>
        
    )
  }


  export default PlayerStats;