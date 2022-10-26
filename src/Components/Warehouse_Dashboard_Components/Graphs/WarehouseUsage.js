import React, {Component} from 'react';
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
import '../../../main.css'

class WarehouseUsage extends Component {
    render() {
        const styles = {
            fontFamily: "sans-serif",
            textAlign: "center"
        };

          const databases = new Map();
          const my_data = [];
          let data_container = this.props.warehouse_usage_data;
          
          for(let entry in data_container) {
              let db = data_container[entry]["data"]["WAREHOUSE"];
              if(!databases.get(db)) {
                  databases.set(db,my_data.length);
                  my_data.push({"id": db, "data": []});
              }   
              my_data[databases.get(db)]["data"].push({
                  "x": data_container[entry]["data"]["DATE"],
                  "y": data_container[entry]["data"]["COMPUTE_CREDITS"],
                  "z": data_container[entry]["data"]["WAREHOUSE"]
              });
            }
        
            
        // make sure parent container have a defined height when using
        // responsive component, otherwise height will be 0 and
        // no chart will be rendered.
        // website examples showcase many properties,
        // you'll often use just a few of them.
        const MyResponsiveLine = () => (
            <div id='warehouse-usage-container'>
                <div id='warehouse-usage' style={styles}>
                    <h2>Daily Compute Credit Usage by Warehouse - Last 30 Days</h2>
                    <div style={{height: 450}}>
                        <ResponsiveLine data={my_data}
                        margin={{ top: 50, right: 110, bottom: 100, left: 60 }}
                        xScale={{
                            type: 'time',
                            format: '%Y-%m-%d',
                            useUTC: false,
                            precision: 'day',
                        }}
                        xFormat="time:%Y-%m-%d"
                        yScale={{ type: 'linear', min: 0, max: 'auto' }}
                        yFormat=">-.2f"
                        blendMode="multiply"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            format: '%b %d',
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -15,
                            legend: 'Warehouse Name',
                            legendOffset: 60,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Credits',
                            legendOffset: -50,
                            legendPosition: 'middle'
                        }}
                        enablePointLabel={true}
                        pointSize={16}
                        pointBorderWidth={1}
                        pointBorderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.3]],
                        }}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 130,
                                translateY: 0,
                                itemWidth: 100,
                                itemHeight: 12,
                                itemsSpacing: 5,
                                itemDirection: 'left-to-right',
                                symbolSize: 12,
                                symbolShape: 'circle',
                                toggleSerie: true,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        useMesh={true}
                        enableSlices="x"
                        sliceTooltip={({ slice }) => {
                            return (
                                <div
                                    style={{
                                        background: 'white',
                                        padding: '9px 12px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    {slice.points.map(point => (
                                        <div
                                            key={point.id}
                                            style={{
                                                color: point.serieColor,
                                                padding: '3px 0',
                                            }}
                                        >
                                            <strong>Warehouse: {point.data.z}<br/>Usage: {point.data.yFormatted} Credits<br/>Date: {point.data.xFormatted}</strong>
                                        </div>
                                    ))}
                                </div>
                            )
                        }}/>
                </div>
            </div>
        </div>
                    
        )

        return (<MyResponsiveLine/>);

  }
}



export default WarehouseUsage