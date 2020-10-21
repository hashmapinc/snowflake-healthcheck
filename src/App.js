import React, {Component} from 'react';
import PageNavbar from './Components/PageNavbar.js';
import Dashboard from './Components/Dashboard.js';
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
    this.state = {
        file_name: null,
        file: null,
        healthcheck_data: null,
        showModal: false,
    }
}

        

  handleModalOpen() {
      this.setState({
          showModal: true
      });
  }

  handleModalClose() {
      this.setState({
          showModal: false
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
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false){
      e.stopPropagation();
    }
    const {file} = this.state;
    Papa.parse(file, {complete: this.updateData, header: false})
  }

  updateData(result){
    let data = result.data;
    const updated_data = data.slice(1);
    const clean_data = updated_data.map(x => JSON.parse(x[0]));
    const warehouse_health_data = clean_data.filter(x => x.type==="warehouse_health");
    const warehouse_usage_data = clean_data.filter(x => x.type==="warehouse_usage");
    console.log(data);
    this.setState({
      healthcheck_data: clean_data
    });
    debugger;
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
        showModal={this.state.showModal}/>
        <Dashboard healthcheck_data={this.state.healthcheck_data}/>

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
