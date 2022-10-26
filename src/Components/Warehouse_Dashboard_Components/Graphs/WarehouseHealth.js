import React, {Component} from 'react';
import { ResponsiveBar } from '@nivo/bar';
import '../../../main.css';

class WarehouseHealth extends Component {

    render() {
        
        const styles = {
            fontFamily: "sans-serif",
            textAlign: "center"
        };
    

        let my_data = [];

        let data_container = this.props.warehouse_health_data;

        for(let entry in data_container) {
            my_data.push({"Median Execution Time": data_container[entry]["data"]["MEDIAN_EXECUTION_TIME_MINUTES"].toFixed(3),
            "Median Queued Provisioning Time": data_container[entry]["data"]["MEDIAN_QUEUED_PROVISIONING_TIME_MINUTES"].toFixed(3),
            "Median Queued Overload Time": data_container[entry]["data"]["MEDIAN_QUEUED_OVERLOAD_TIME_MINUTES"].toFixed(3),
            "Warehouse": data_container[entry]["data"]["WAREHOUSE"]});
        }

        const MyResponsiveBar = () => (
            <div id='myman'>
                <div style={styles}>
                    <h2>Warehouse - Last 30 Days</h2>
                    <div style={{height: 400}}>
                        <ResponsiveBar data={my_data} keys={["Median Execution Time",
                            "Median Queued Provisioning Time",
                            "Median Queued Overload Time"]}
                            indexBy="Warehouse"
                            groupMode='grouped'
                            margin={{ top: 50, right: 202, bottom: 100, left: 60 }}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: -15,
                                legend: 'Warehouse',
                                legendPosition: 'middle',
                                legendOffset: 90
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Median Minutes',
                                legendPosition: 'middle',
                                legendOffset: -50
                            }}
                            //initialHiddenIds={keys.slice(2, 4)}
                            legends={[
                                {
                                    dataFrom: 'keys',
                                    anchor: 'bottom-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 120,
                                    translateY: 0,
                                    itemsSpacing: 2,
                                    itemWidth: 110,
                                    itemHeight: 20,
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 0.85,
                                    symbolSize: 15,
                                    toggleSerie: true,
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemOpacity: 1
                                            }
                                        }
                                    ],
                                }
                            ]}
                            valueFormat={value =>
                                <tspan y="-5">{Number(value).toLocaleString('us-US', {
                                    minimumFractionDigits: 1,
                                    maximumSignificantDigits: 4
                                })}</tspan>
                            }
                            tooltip={({id,indexValue, value}) => (
                                <div
                                    style={{
                                        padding: 12,
                                        fontSize: 12,
                                        color: '#999999',
                                        background: '#222222',
                                    }}
                                >
                                    <strong>
                                        Warehouse: {indexValue}<br></br>
                                        {id}: {`${Number(value).toLocaleString('us-US', {
                                  minimumFractionDigits: 1,
                                  maximumSignificantDigits: 4
                                    })} minutes`}
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


export default WarehouseHealth