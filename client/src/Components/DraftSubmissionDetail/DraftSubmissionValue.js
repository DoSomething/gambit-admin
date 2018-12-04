import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DraftSubmissionValue = (props) => {
  console.log(props);
  if (props.valueKey === 'url') {
    return <Image src={props.value} height={200} />
  }
  return <strong>{props.value}</strong>;
};

DraftSubmissionValue.propTypes = {
  valueKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

export default DraftSubmissionValue;
