import React from 'react';
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DraftSubmissionValues = (props) => {
  const valuesObject = props.draftSubmission.values;
  if (!valuesObject) return null;

  return (
    <ListGroup>
      {Object.entries(valuesObject).map((entry) => {
        const key = entry[0];
        const value = entry[1];
        return (
          <ListGroupItem key={key}>
            {key === 'url' ? <Image src={value} height={200} /> : <div>{key}: {value}</div>}
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
