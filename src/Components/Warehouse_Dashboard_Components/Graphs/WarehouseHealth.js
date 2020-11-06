import React, {Component} from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../../../main.css'

class WarehouseHealth extends Component {

    render() {
        var i;
        let health_x_arr = [];
        let health_y_med_execution = [];
        let health_y_overload = [];
        let health_y_provision = [];

        for (i = 0; i < this.props.warehouse_health_data.length; i++) {
            health_x_arr.push(this.props.warehouse_health_data[i].data.WAREHOUSE);
            health_y_med_execution.push(this.props.warehouse_health_data[i].data.MEDIAN_EXECUTION_TIME_MINUTES.toFixed(3));
            health_y_overload.push(this.props.warehouse_health_data[i].data.MEDIAN_QUEUED_OVERLOAD_TIME_MINUTES.toFixed(3));
            health_y_provision.push(this.props.warehouse_health_data[i].data.MEDIAN_QUEUED_PROVISIONING_TIME_MINUTES.toFixed(3));             
    };

        const PlotlyComponent = createPlotlyComponent(Plotly);                
            
            var trace_execution = {
            x: health_x_arr,
            y: health_y_med_execution,
            type: 'bar',
            textposition: 'auto',
            hovertemplate: '%{y} minutes<extra></extra>',
            name: 'Median Execution Time',
            marker: {
                color: 'hex(#1F77B4)',
            }
            };
            
            var trace_overload = {
            x: health_x_arr,
            y: health_y_overload,
            type: 'bar',
            textposition: 'auto',
            hovertemplate: '%{y} minutes<extra></extra>',
            name: "Median Queued Overload Time",
            marker: {
                color: 'hex(#FF7F0E)',
            }
            };

            var trace_provision = {
            x: health_x_arr,
            y: health_y_provision,
            type: 'bar',
            textposition: 'auto',
            hovertemplate: '%{y} minutes<extra></extra>',
            name: 'Median Queued Provisioning Time',
            marker: {
                color: 'hex(#2CA02C)',
            }
            };
        
        let data = [trace_execution, trace_provision, trace_overload];
        let layout = {
            "title": 'Warehouse Health - Last 30 Days', 
            "autosize": true, 
            "titlefont": {
                "size": 16, 
                "color":"black"
            }, 
            "font": {
                "size": 8, 
                "color":"black"
            }, 
            "legend": {
                "x": 1, 
                "y": 0.5
            }, 
            "yaxis": {
                "title": 'Median Minutes', 
                "titlefont": {
                    "size": 12, 
                    "color": 'black'
                }, 
                "automargin": true, 
                "showgrid": false, 
                "showline": true
            }, 
            "hovermode": "closest", 
            "xaxis": {
                "automargin": true
            }
        }
        let useResizeHandler = true;
        let style = {width: "100%", height: "100%", marginBottom: "10px"};

        
        
        return (
            <PlotlyComponent data={data} layout={layout} useResizeHandler={useResizeHandler} style={style}/>
        );
    }
}


export default WarehouseHealth