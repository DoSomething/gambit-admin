import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const helpers = require('../helpers');

const ContentfulLink = (props) => {
  const url = helpers.getContentfulUrlForEntryId(props.entryId);
  return (
    <Button
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      bsStyle={props.bsStyle}
      bsSize={props.bsSize}
    >
      Edit
    </Button>
  );
};

ContentfulLink.propTypes = {
  entryId: PropTypes.string.isRequired,
  bsStyle: PropTypes.string,
  bsSize: PropTypes.string,
};

ContentfulLink.defaultProps = {
  bsStyle: 'default',
  bsSize: 'small',
};

export default ContentfulLink;
