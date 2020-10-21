import React, {Component} from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../../../main.css'

class WarehouseUsageUploaded extends Component {
        render() {
            const warehouse_usage_data = this.props.healthcheck_data.filter(x => x.type==="warehouse_usage");
            let usage_traces = []
            let usage_graph_data = {};
            let i;
            for (i = 0; i < warehouse_usage_data.length; i++) {

                if (warehouse_usage_data[i].data.WAREHOUSE in usage_graph_data === false) {
                    usage_graph_data[warehouse_usage_data[i].data.WAREHOUSE] = {x: [], y: [], name: warehouse_usage_data[i].data.WAREHOUSE, hoverinfo: 'none', stackgroup: 'one'};
                }
                usage_graph_data[warehouse_usage_data[i].data.WAREHOUSE].x.push(warehouse_usage_data[i].data.DATE);
                usage_graph_data[warehouse_usage_data[i].data.WAREHOUSE].y.push(warehouse_usage_data[i].data.COMPUTE_CREDITS.toFixed(3));
            };        

            for (var entry in usage_graph_data) {
                usage_traces.push(usage_graph_data[entry])
            }
            debugger;

            const PlotlyComponent = createPlotlyComponent(Plotly);                
                
            let layout = {title: 'Warehouse Usage Data', autosize: true, "titlefont": {"size": 16}, font: {size:8}, legend: {"orientation": "h"}};
            let useResizeHandler = true;
            let style = {width: "100%", height: "100%", marginBottom: "10px"};

            return (
                <PlotlyComponent data={usage_traces} layout={layout} useResizeHandler={useResizeHandler} style={style}/>
            );
        }
    }


export default WarehouseUsageUploaded