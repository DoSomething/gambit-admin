import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Glyphicon } from 'react-bootstrap';

const helpers = require('../helpers');

const ContentfulLink = (props) => {
  const refreshButton = (
    <Button
      href="?cache=false"
      bsStyle={props.bsStyle}
      bsSize={props.bsSize}
    >
      <Glyphicon glyph="refresh" />
    </Button>
  );
  return (
    // This is how you front-end right?
    <ButtonToolbar className="pull-right" style={{ marginTop: '-4px' }}>
      <Button
        href={helpers.getContentfulUrlForEntryId(props.entryId)}
        target="_blank"
        rel="noopener noreferrer"
        bsStyle={props.bsStyle}
        bsSize={props.bsSize}
      >
        <Glyphicon glyph="pencil" />
      </Button>
      { props.displayRefresh ? refreshButton : null }
    </ButtonToolbar>
  );
};

ContentfulLink.propTypes = {
  entryId: PropTypes.string.isRequired,
  bsStyle: PropTypes.string,
  bsSize: PropTypes.string,
  displayRefresh: PropTypes.bool,
};

ContentfulLink.defaultProps = {
  bsStyle: 'default',
  bsSize: 'small',
  displayRefresh: true,
};

export default ContentfulLink;
