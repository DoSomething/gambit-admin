import React from 'react';
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

function renderValue(key, value) {
  if (key === 'url') {
    return <Image src={value} height={200} />;
  }
  return (
    <div>{key}: <strong>{value}</strong></div>
  );
}

const DraftSubmissionValues = (props) => {
  const draftId = props.draftSubmission._id;
  const valuesObject = props.draftSubmission.values;

  if (!valuesObject) return null;

  const keys = Object.keys(valuesObject);
  return (
    <ListGroup>
      {keys.map((key) => {
        return (
          <ListGroupItem key={`${draftId}/${key}`}>
            {renderValue(key, valuesObject[key])}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

DraftSubmissionValues.propTypes = {
  draftSubmission: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DraftSubmissionValues;
