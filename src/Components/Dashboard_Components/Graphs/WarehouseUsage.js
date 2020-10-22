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
                    usage_graph_data[this.props.warehouse_usage_data[i].data.WAREHOUSE] = {x: [], y: [], name: this.props.warehouse_usage_data[i].data.WAREHOUSE, hoverinfo: 'none', stackgroup: 'one'};
                }
                usage_graph_data[this.props.warehouse_usage_data[i].data.WAREHOUSE].x.push(this.props.warehouse_usage_data[i].data.DATE);
                usage_graph_data[this.props.warehouse_usage_data[i].data.WAREHOUSE].y.push(this.props.warehouse_usage_data[i].data.COMPUTE_CREDITS.toFixed(3));
            };        

            for (var entry in usage_graph_data) {
                usage_traces.push(usage_graph_data[entry])
            }

            const PlotlyComponent = createPlotlyComponent(Plotly);                
                
            let layout = {title: 'Warehouse Credit Usage Data', autosize: true, "titlefont": {"size": 16}, font: {size:8}, legend: {"orientation": "h"}};
            let useResizeHandler = true;
            let style = {width: "100%", height: "100%", marginBottom: "10px"};

            return (
                <PlotlyComponent data={usage_traces} layout={layout} useResizeHandler={useResizeHandler} style={style}/>
            );
        }
    }


export default WarehouseUsage