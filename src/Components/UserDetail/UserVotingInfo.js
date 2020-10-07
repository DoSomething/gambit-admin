import React from 'react';
import PropTypes from 'prop-types';

const UserVotingInfo = ({ user }) => {
  const {
    votingMethod,
    votingPlanAttendingWith,
    votingPlanMethodOfTransport,
    votingPlanStatus,
    votingPlanTimeOfDay, 
  } = user;


  if (votingPlanStatus !== 'voting') {
    return <><strong>Voting plan status:</strong> {votingPlanStatus}</>;
  }

  if (votingMethod !== 'in_person') {
    return <><strong>Voting method:</strong> {votingMethod}</>;
  }

  return (
    <>
      <strong>Voting plan:</strong> (in-person){' '}
      {votingPlanMethodOfTransport} with {votingPlanAttendingWith} in {votingPlanTimeOfDay}
    </>
  );
};

UserVotingInfo.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserVotingInfo;
