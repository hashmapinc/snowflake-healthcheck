import React, { Component } from 'react';
import '../../../main.css'
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/scatterplot
import { ResponsiveScatterPlot } from '@nivo/scatterplot'

class PowerUsers extends Component {

  render() {
    const styles = {
      fontFamily: "sans-serif",
      textAlign: "center"
    };


    let my_data = [{"id": "Power Users", "color": "hsl(3, 70%, 50%)", "data": []}];
    let data_container = this.props.power_users_data;

    for(let entry in data_container) {
      my_data[0]["data"].push({
        "x": data_container[entry]["data"]["USER_NAME"],
        "y": data_container[entry]["data"]["DISTINCT_QUERIES_FIRED"]});
    }

    const theme = {
      tooltip: {
        container: {
          background: 'rgba(51, 51, 51, 0.9)',
          color: '#fff',
          fontSize: '12px',
          borderRadius: '0',
          boxShadow: 'none',
          padding: '10px 14px',
        },
      },
    };


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
  const MyResponsiveScatterPlot = () => (
    <div id='power-users-container'>
      <div id='power-users' style={styles}>
          <h2>Power Users from the Last 30 Days</h2>
          <div style={{height: 400}}>
            <ResponsiveScatterPlot data={my_data}
              theme={theme}
              margin={{ top: 50, right: 110, bottom: 100, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: true,
                  reverse: false
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -15,
                  legend: 'User Name',
                  legendOffset: 80,
                  legendPosition: 'middle'
              }}
              axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Distinct Queries Fired',
                  legendOffset: -50,
                  legendPosition: 'middle'
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              
              />
                </div>
              </div>
            </div>
  )

        return (<MyResponsiveScatterPlot/>);

  }
}


export default PowerUsers