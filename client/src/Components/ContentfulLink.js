import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const helpers = require('../helpers');

class ContentfulLink extends React.Component {
  constructor(props) {
    super(props);
    this.url = helpers.getContentfulUrlForEntryId(this.props.entryId);
  }

  render() {
    return (
      <Button href={this.url} target="_blank">Edit in Contentful</Button>
    );
  }
}

ContentfulLink.propTypes = {
  entryId: PropTypes.string.isRequired,
};

export default ContentfulLink;
