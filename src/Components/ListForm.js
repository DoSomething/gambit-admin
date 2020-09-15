import React from 'react';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import queryString from 'query-string';

/**
 * @param {String} filterName
 * @param {String} filterValue
 */
function handleFilterChange(filterName, selectedFilterValue) {
  const { protocol, host, pathname } = window.location;
  const clientQuery = queryString.parse(window.location.search);
  const currentFilterValue = clientQuery[filterName];

  if (currentFilterValue === selectedFilterValue) {
    return;
  }
  if (selectedFilterValue === 'all') {
    delete clientQuery[filterName];
  } else {
    clientQuery[filterName] = selectedFilterValue;
  }
  // We reset page parameter when switching filters, as pagination would be awkward UX to persist.
  delete clientQuery.page;

  window.location = `${protocol}//${host}${pathname}?${queryString.stringify(clientQuery)}`;
}

class ListForm extends React.Component {
  handleSourceChange = event => handleFilterChange('source', event.target.value);
  handleTypeChange = event => handleFilterChange('type', event.target.value);
  render() {
    const clientQuery = queryString.parse(window.location.search);
    const typeFilterFormControl = window.location.pathname === '/posts'
      ? (
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
      )
      : null;
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
