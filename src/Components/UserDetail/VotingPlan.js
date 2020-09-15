import React from 'react';
import PropTypes from 'prop-types';

const VotingPlan = (props) => {
  const user = props.user;
  const status = user.votingPlanStatus;
  const timeOfDay = user.votingPlanTimeOfDay;
  if (status !== 'voting' || !timeOfDay) {
    return <span>{status}</span>;
  }
  return (
    <span>
      {user.votingPlanMethodOfTransport} with {user.votingPlanAttendingWith} in {timeOfDay}
    </span>
  );
};

VotingPlan.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default VotingPlan;
