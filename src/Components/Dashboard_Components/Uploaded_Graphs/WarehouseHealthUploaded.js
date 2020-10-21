import React, {Component} from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../../../main.css'

class WarehouseHealthUploaded extends Component {
        render() {
            const warehouse_health_data = this.props.healthcheck_data.filter(x => x.type==="warehouse_health");
            var i;
            let health_x_arr = [];
            let health_y_med_execution = [];
            let health_y_overload = [];
            let health_y_provision = [];

            for (i = 0; i < warehouse_health_data.length; i++) {
                health_x_arr.push(warehouse_health_data[i].data.WAREHOUSE);
                health_y_med_execution.push(warehouse_health_data[i].data.MEDIAN_EXECUTION_TIME_MINUTES.toFixed(3));
                health_y_overload.push(warehouse_health_data[i].data.MEDIAN_QUEUED_OVERLOAD_TIME_MINUTES.toFixed(3));
                health_y_provision.push(warehouse_health_data[i].data.MEDIAN_QUEUED_PROVISIONING_TIME_MINUTES.toFixed(3));             
        };

            const PlotlyComponent = createPlotlyComponent(Plotly);                
                
                var trace_execution = {
                x: health_x_arr,
                y: health_y_med_execution,
                type: 'bar',
                text: health_y_med_execution.map(String),
                textposition: 'auto',
                hoverinfo: "none",
                name: 'Median Execution Time',
                marker: {
                    color: 'rgb(92, 98, 156)',
                    line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                    }
                }
                };
                
                var trace_overload = {
                x: health_x_arr,
                y: health_y_overload,
                type: 'bar',
                text: health_y_overload.map(String),
                textposition: 'auto',
                hoverinfo: "none",
                name: "Median Queued Overload Time",
                marker: {
                    color: 'rgb(181, 113, 94)',
                    line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                    }
                }
                };

                var trace_provision = {
                x: health_x_arr,
                y: health_y_provision,
                type: 'bar',
                text: health_y_provision.map(String),
                textposition: 'auto',
                hoverinfo: "none",
                name: 'Median Queued Provisioning Time',
                marker: {
                    color: 'rgb(158,202,225)',
                    line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                    }
                }
                };
            
            let data = [trace_execution, trace_provision, trace_overload];
            let layout = {title: 'Warehouse Health Data', autosize: true, "titlefont": {"size": 16}, font: {size: 8}, legend: {x: 1, y: 0.5}};
            let useResizeHandler = true;
            let style = {width: "100%", height: "100%", marginBottom: "10px"};

            
            
            return (
                <PlotlyComponent data={data} layout={layout} useResizeHandler={useResizeHandler} style={style}/>
            );
        }
    }


export default WarehouseHealthUploaded