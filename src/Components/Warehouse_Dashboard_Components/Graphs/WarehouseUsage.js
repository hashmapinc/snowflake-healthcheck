import React, {Component} from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../../../main.css'

class WarehouseUsage extends Component {
        render() {
            let usage_traces = []
            let usage_graph_data = {};
            let i;
            for (i = 0; i < this.props.warehouse_usage_data.length; i++) {

                if (this.props.warehouse_usage_data[i].data.WAREHOUSE in usage_graph_data === false) {
                    usage_graph_data[this.props.warehouse_usage_data[i].data.WAREHOUSE] = {
                        x: [], 
                        y: [], 
                        name: this.props.warehouse_usage_data[i].data.WAREHOUSE, 
                        stackgroup: 'one',
                        hoverinfo:"y+name"
                    };
                }
                usage_graph_data[this.props.warehouse_usage_data[i].data.WAREHOUSE].x.push(this.props.warehouse_usage_data[i].data.DATE);
                usage_graph_data[this.props.warehouse_usage_data[i].data.WAREHOUSE].y.push(this.props.warehouse_usage_data[i].data.COMPUTE_CREDITS.toFixed(3));
            };        

            for (var entry in usage_graph_data) {
                usage_traces.push(usage_graph_data[entry])
            }

            const PlotlyComponent = createPlotlyComponent(Plotly);                
                
            let layout = {
                "title": 'Daily Compute Credit Usage by Warehouse - Last 30 Days', 
                "autosize": true, 
                "titlefont": {
                    "size": 16, 
                    "color":"black"
                }, 
                "font": {
                    "size":8, 
                    "color":"black"
                }, 
                "legend": {
                    "orientation": "h",
                    "y": -.1
                }, 
                "yaxis": {
                    "title": 'Compute Credits', 
                    "titlefont": {
                        "size": 12, 
                        "color": "black"
                    }, 
                    "automargin": true, 
                    "showgrid": false, 
                    "showline": true
                }, 
                "hovermode": "closest", 
                "hoverlabel": {
                    "namelength": -1
                },
                "xaxis": {
                    "automargin": true, 
                    "showgrid": false
                }};
            let useResizeHandler = true;
            let style = {width: "100%", height: "100%", marginBottom: "10px"};

            return (
                <PlotlyComponent data={usage_traces} layout={layout} useResizeHandler={useResizeHandler} style={style}/>
            );
        }
    }


export default WarehouseUsage