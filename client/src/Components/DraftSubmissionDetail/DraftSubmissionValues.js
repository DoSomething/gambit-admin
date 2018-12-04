import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DraftSubmissionValues = (props) => {
  const valuesObject = props.draftSubmission.values;
  if (!valuesObject) return null;

  const keys = Object.keys(valuesObject);
  return (
    <ListGroup>
      {keys.map(key => <ListGroupItem>{key}: <strong>{valuesObject[key]}</strong></ListGroupItem>)}
    </ListGroup>
  );
};

DraftSubmissionValues.propTypes = {
  draftSubmission: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DraftSubmissionValues;
