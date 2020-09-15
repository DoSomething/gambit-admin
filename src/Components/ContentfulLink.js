import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Glyphicon } from 'react-bootstrap';

const helpers = require('../helpers');

const ContentfulLink = (props) => (
  <ButtonToolbar className="pull-right" style={{ marginTop: '-4px' }} >
    <Button
      href={helpers.getContentfulUrlForEntryId(props.entryId)}
      target="_blank"
      rel="noopener noreferrer"
      bsStyle={props.bsStyle}
      bsSize={props.bsSize}
    >
      <Glyphicon glyph="pencil" />
    </Button>
  </ButtonToolbar>
);


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
