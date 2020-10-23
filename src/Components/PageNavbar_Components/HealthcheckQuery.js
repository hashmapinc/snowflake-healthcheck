import React from 'react';
import {Button, Row} from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// eslint-disable-next-line import/no-webpack-loader-syntax
import dataQuery from "!!raw-loader!../../sql/healthcheck_query.sql";
import '../../main.css'

class HealthcheckQuery extends React.Component {

  render() {
    let {clipboardButtonText} = this.props;
    let clipboard_button_label = null;
    
    clipboard_button_label = <span>{clipboardButtonText}</span>
    return (
        <div>
          <Row className="mt-2 mb-4 ml-4 mr-4">
            <textarea readOnly className="form-control queryStyle" rows="10" id="data-query" value={dataQuery}></textarea>
          </Row>
          <Row className="m-4">
            <div className="mx-auto">
              <CopyToClipboard text={dataQuery}>
                <Button size="lg" variant="secondary" id="copy_button" onClick={this.props.handleCopyToClipboard}>{clipboard_button_label}</Button>
              </CopyToClipboard>
            </div>
          </Row>
        </div>
            

        
        
    );
  }
}

export default HealthcheckQuery;