import React, {Component} from 'react';
import PageNavbar from './Components/PageNavbar.js';
import GraphTab from './Components/GraphTab.js';
import * as Papa from 'papaparse';
import './main.css'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
    this.state = {
        file_name: null,
        file: null,
        localData: null,
        showModal: false,
        warehouse_health_data: null,
        warehouse_usage_data: null,
        database_datasize_data: null,
        table_active_storage_data: null,
        csvHeader: null,
        clipboardButtonText: "Copy to clipboard"

    }
}
// Used to fetch local data
componentDidMount() {
  this.getLocalCsvData();
}

fetchLocalCsv() {
  return fetch('/data/default_data.csv', {
    headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  }).then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
          return decoder.decode(result.value);
      });
  });
}

async getLocalCsvData() {
  let localCsvData = await this.fetchLocalCsv();

  Papa.parse(localCsvData, {complete: this.updateData});
}

// handles copy to clipboard text change on button click
  handleCopyToClipboard() {
    this.setState({
      clipboardButtonText: "Copied!"
    })
  }
        
// used to get uploaded data
  handleModalOpen() {
      this.setState({
          showModal: true
      });
  }

  handleModalClose() {
      this.setState({
          showModal: false,
          file_name: "Download your query results as a CSV and upload here",
          clipboardButtonText: "Copy to clipboard"
      })
  }

  handleInputChange(e){
    this.setState({
        file_name : e.target.files[0].name,
        file: e.target.files[0]
    });
    console.log(this.state.file_name);
  }


  handleSubmit(e){
    this.setState({
      csvHeader: null
    })
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false){
      e.stopPropagation();
      e.preventDefault();
    };

    const {file} = this.state;
    Papa.parse(file, {complete: this.updateData});
  }

  // used for both local and uploaded data
  updateData(result){
    let data = result.data;
    this.setState({
      csvHeader: data[0]
    });
    if (this.state.csvHeader[0] === "HEALTHCHECK_V1") {
      // removes header that doesn't contain data
      const updated_data = data.slice(1);
      let clean_data = [];
      try {
        clean_data = updated_data.map(x => JSON.parse(x[0]));
        console.log(updated_data);
      } catch(error) { 
        console.log("Error ", error);
        console.log("Result ", result);
        console.log("Data ", updated_data);
        alert("Please reload the page. The default graphs did not load.");
      };
      this.setState({
        warehouse_health_data: clean_data.filter(x => x.type==="warehouse_health"),
        warehouse_usage_data: clean_data.filter(x => x.type==="warehouse_usage"),
        database_datasize_data: clean_data.filter(x => x.type==="database_usage"),
        table_active_storage_data: clean_data.filter(x => x.type==="table_active_storage"),
      });
      this.handleModalClose();
    } else {
      this.setState({
        file_name: "Please upload the .csv file with your query results"
      });
    }
    
  }


  render() {
    return (
      <div className="container">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
          <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css"
            integrity="sha384-cg6SkqEOCV1NbJoCu11+bm0NvBRc8IYLRGXkmNrqUBfTjmMYwNKPWBTIKyw9mHNJ" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        
        <PageNavbar 
        file_name={this.state.file_name} 
        handleSubmit={this.handleSubmit} 
        handleInputChange={this.handleInputChange} 
        handleModalClose={this.handleModalClose} 
        handleModalOpen={this.handleModalOpen}
        showModal={this.state.showModal}
        clipboardButtonText={this.state.clipboardButtonText}
        handleCopyToClipboard={this.handleCopyToClipboard}/>
        <GraphTab 
        database_datasize_data={this.state.database_datasize_data} 
        warehouse_health_data={this.state.warehouse_health_data} 
        warehouse_usage_data={this.state.warehouse_usage_data}
        table_active_storage_data={this.state.table_active_storage_data}/>

        <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/4376150.js"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossOrigin="anonymous"></script>
      </div>
      )
  }
    
}


export default App;
