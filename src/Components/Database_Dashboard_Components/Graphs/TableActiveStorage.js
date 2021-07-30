import React, {Component} from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../../../main.css'

class TableActiveStorage extends Component {
  constructor() {
    super();
    this.makeTrace = this.makeTrace.bind(this);
  }
  
  makeTrace(graph_data) {
    return {
      x: [graph_data.data.DATABASE_NAME],
      y: [graph_data.data.ACTIVE_STORAGE_GIGABYTES.toFixed(2)],
      name: graph_data.data.TABLE_NAME,
      type: 'bar',
      mode:'markers',
      hovertemplate: '%{y} GB'
    }
  }
  render() {
     

      // Object.keys(this.props.table_active_storage_data).forEach(entry => table_storage_traces.push(this.makeTrace(this.props.table_active_storage_data[entry])));

      const PlotlyComponent = createPlotlyComponent(Plotly);                

      let table_storage_traces = {
        type: 'bar',
        x: this.props.table_active_storage_data.map(entry => entry.data.DATABASE_NAME+'-'+entry.data.TABLE_NAME),
        y: this.props.table_active_storage_data.map(entry => entry.data.ACTIVE_STORAGE_GIGABYTES),
        text: this.props.table_active_storage_data.map(entry => entry.data.ACTIVE_STORAGE_GIGABYTES.toFixed(3)),
        textposition: "outside",
        marker: {
          color: 'hex(#2CA02C)',
        }
      };


      let layout = {
        "title": 'Active Storage Usage by Table - in Gigabytes',
        "barmode": "stack",
        "autosize": true, 
        "titlefont": { 
          "size": 16, 
          "color": "black" 
        }, 
        "font": { 
          "size": 8, 
          "color": "black" 
        }, 
        "showlegend": false,
        "hovermode": "closest",
        "hoverlabel": { 
          "namelength": -1 
        }, 
        "yaxis": {
          "title": 'Gigabytes', 
          "titlefont": { 
            "size": 12, 
            "color": "black" 
          }, 
          "automargin": true, 
          "showgrid": false, 
          "showline": true
        }, 
        "xaxis": { 
          "automargin": true, 
          "showgrid": false 
        },      
        paper_bgcolor: 'rgb(256, 250, 245)',
        plot_bgcolor: 'rgb(254, 247, 234)'  
      };
      let useResizeHandler = true;
      let style = {"width": "100%", "height": "100%"};

      return (
          <PlotlyComponent data={[table_storage_traces]} layout={layout} useResizeHandler={useResizeHandler} style={style}/>
      );
  }
}


export default TableActiveStorage