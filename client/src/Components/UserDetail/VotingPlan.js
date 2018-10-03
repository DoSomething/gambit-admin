import React from 'react';
import PropTypes from 'prop-types';

const VotingPlan = (props) => {
  const user = props.user;
  const timeOfDay = user.voting_plan_time_of_day;
  if (!timeOfDay) {
    return <span>user.voting_plan_status</span>;
  }
  return (
    <span>
      {user.voting_plan_method_of_transport} with {user.voting_plan_attending_with} in {timeOfDay}
    </span>
  );
};

VotingPlan.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default VotingPlan;
