import React from 'react';
import {Button} from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// eslint-disable-next-line import/no-webpack-loader-syntax
import dataQuery from "!!raw-loader!../../sql/healthcheck_query.sql";
import '../../main.css'

class CopyQuery extends React.Component {

  render() {
    return (
        <div>
            <textarea readOnly className="form-control queryStyle" rows="10" id="data-query" value={dataQuery}></textarea>
            <div className="col text-center">
                <CopyToClipboard text={dataQuery}>
                    <Button size="md" id="copy_button">Copy to clipboard</Button>
                </CopyToClipboard>
            </div>
        </div>
            

        
        
    );
  }
}

export default CopyQuery;