import React from 'react';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import queryString from 'query-string';

/**
 * @param {String} filterName
 * @param {String} filterValue
 */
function handleFilterChange(filterName, selectedFilterValue) {
  const location = window.location;
  const url = [location.protocol, '//', location.host, location.pathname].join('');
  const clientQuery = queryString.parse(location.search);
  const currentFilterValue = clientQuery[filterName];

  if (currentFilterValue === selectedFilterValue) {
    return;
  }
  if (selectedFilterValue === 'all') {
    delete clientQuery[filterName];
  } else {
    clientQuery[filterName] = selectedFilterValue;
  }
  delete clientQuery.skip;

  window.location = `${url}?${queryString.stringify(clientQuery)}`;
}

class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
  handleSourceChange(event) { // eslint-disable-line class-methods-use-this
    handleFilterChange('source', event.target.value);
  }
  handleTypeChange(event) { // eslint-disable-line class-methods-use-this
    handleFilterChange('type', event.target.value);
  }
  render() {
    const clientQuery = queryString.parse(window.location.search);
    let typeFilterFormControl = null;
    if (window.location.pathname === '/posts') {
      typeFilterFormControl = (
        <FormControl
          componentClass="select"
          placeholder="select"
          onChange={this.handleTypeChange}
          defaultValue={clientQuery.type || 'all'}
        >
          <option value="all">all</option>
          <option value="photo">photo</option>
          <option value="text">text</option>
        </FormControl>
      );
    }
    return (
      <Form inline>
        <FormGroup controlId="listFilterForm">
          <FormControl
            componentClass="select"
            placeholder="select"
            onChange={this.handleSourceChange}
            defaultValue={clientQuery.source || 'all'}
          >
            <option value="all">all</option>
            <option value="phoenix-next">phoenix-next</option>
            <option value="sms">sms</option>
          </FormControl> {typeFilterFormControl}
        </FormGroup>
      </Form>
    );
  }
}

export default ListForm;

