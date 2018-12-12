import React from 'react';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import queryString from 'query-string';

class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleSourceChange = this.handleSourceChange.bind(this);
  }
  handleSourceChange(event) { // eslint-disable-line class-methods-use-this
    const location = window.location;
    const url = [location.protocol, '//', location.host, location.pathname].join('');
    const clientQuery = queryString.parse(location.search);
    const currentSource = clientQuery.source;
    const selectedValue = event.target.value;

    if (currentSource === selectedValue) {
      return;
    }
    if (selectedValue === 'all') {
      delete clientQuery.source;
    } else {
      clientQuery.source = selectedValue;
    }
    delete clientQuery.skip;

    window.location = `${url}?${queryString.stringify(clientQuery)}`;
  }
  render() {
    const clientQuery = queryString.parse(window.location.search);
    return (
      <Form inline>
        <FormGroup controlId="listFilterForm">
          <FormControl componentClass="select" placeholder="select" onChange={this.handleSourceChange} >
            <option value="all" selected={!!clientQuery.source}>all</option>
            <option value="sms" selected={clientQuery.source === 'sms'}>sms</option>
          </FormControl>
        </FormGroup>
      </Form>
    );
  }
}

export default ListForm;

