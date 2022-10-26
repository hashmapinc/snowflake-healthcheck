import React, {Component} from 'react';
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
import '../../../main.css'

class TableActiveStorage extends Component {

  render() {


      const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
      };


      const my_data = []
      let data_container = this.props.table_active_storage_data;
      let ctr = 0;

      for(let entry in data_container) {
        if(ctr > -1) {
          let info = data_container[entry]["data"];
          my_data.push({"Database": info["DATABASE_NAME"]+"_"+info["TABLE_NAME"],
          "Gigabytes": info["ACTIVE_STORAGE_GIGABYTES"]});
        }
        ctr++;
      }
     

      const MyResponsiveBar = () => (
        <div id='table-active-storage-container'>
            <div id='table-active-storage' style={styles}>
                <h2>Active Storage Usage by Table - In Gigabytes</h2>
                <div style={{height: 450}}>
                    <ResponsiveBar data={my_data} keys={["Gigabytes"]} indexBy="Database"
                      margin={{ top: 50, right: 130, bottom: 100, left: 120 }}
                      padding={0.3}
                      valueScale={{ type: 'linear' }}
                      indexScale={{ type: 'band', round: true }}
                      colors={{ scheme: 'nivo' }}
                      labelFormat={{}}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -15,
                            legend: 'Object Name',
                            legendPosition: 'middle',
                            legendOffset: 90
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Gigabytes',
                            legendPosition: 'middle',
                            legendOffset: -50
                        }}
                        valueFormat={value =>
                          <tspan y="-5">{Number(value).toLocaleString('us-US', {
                              minimumFractionDigits: 1,
                              maximumSignificantDigits: 4
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
                                    Table: {indexValue}<br></br>
                                    {id}: {`${Number(value).toLocaleString('us-US', {
                                      minimumFractionDigits: 1,
                                      maximumSignificantDigits: 4
                                    })}`}
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


export default TableActiveStorage