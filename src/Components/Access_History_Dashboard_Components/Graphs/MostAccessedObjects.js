// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar

import React, {Component} from 'react';
import '../../../main.css'
import { ResponsiveBar } from '@nivo/bar'

class MostAccessedObjects extends Component {
  
  render() {

    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
    };
  

    const my_data = [];
    let data_container = this.props.top10_most_accessed_objects_data;

    for(let entry in data_container) {
        my_data.push({
            "Queried": data_container[entry]["data"]["DISTINCT_QUERIES_FIRED"],
            "Database": data_container[entry]["data"]["OBJECT_NAME"].split('.')[0],
            "Schema": data_container[entry]["data"]["OBJECT_NAME"].split('.')[1],
            "Object": data_container[entry]["data"]["OBJECT_NAME"].split('.')[2]});
    }

    const MyResponsiveBar = () => (
        <div id='most-accessed-objects-container'>
            <div id='most-accessed-objects' style={styles}>
                <h2>Most Accessed Objects</h2>
                <div style={{height: 400}}>
                    <ResponsiveBar data={my_data} keys={["Queried"]} indexBy="Object"
                      margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
                      padding={0.3}
                      valueScale={{ type: 'linear' }}
                      indexScale={{ type: 'band', round: true }}
                      colors={{ scheme: 'nivo' }}
                      labelSkipHeight={12}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -15,
                            legend: 'Object Name',
                            legendPosition: 'middle',
                            legendOffset: 60
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Distinct Queries Fired',
                            legendPosition: 'middle',
                            legendOffset: -50
                        }}
                        valueFormat={value =>
                            <tspan y="-5">{Number(value).toLocaleString('us-US', {
                                maximumFractionDigits: 0
                            })}</tspan>
                        }
                        tooltip={({id, indexValue, value}) => (
                            <div
                                style={{
                                    padding: 12,
                                    fontSize: 12,
                                    color: '#999999',
                                    background: '#222222',
                                }}
                            >
                                <strong>
                                    Object: {indexValue}<br></br>
                                    {id}: {Number(value).toLocaleString('us-US', {maximumFractionDigits: 0})} times
                                </strong>
                            </div>
                        )}/>
                </div>
            </div> 
        </div>
    )
          return (<MyResponsiveBar/>);
  }
}

export default MostAccessedObjects