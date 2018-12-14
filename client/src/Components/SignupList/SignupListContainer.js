import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import GraphQLRequest from '../GraphQLRequest';
import ListForm from '../ListForm';
import SignupListItem from './SignupListItem';
import helpers from '../../helpers';

const SignupListContainer = ({ userId, displayFilters }) => {
  const query = `{
    signups(count: 50) {
      id,
      userId,
      campaign {
        id,
        internalTitle,
      }
      campaignId,
    }
  }`;

  return (
    <Grid>
      <GraphQLRequest query={query}>
        {res => (
          <Table hover>
            <tbody>
              {res.signups.map(signup => (
                <tr key={signup.id}>
                  <td>{signup.id}</td>
                  <td>{signup.userId}</td>
                  <td>{signup.campaign.internalTitle}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </GraphQLRequest>
    </Grid>
  );
};

SignupListContainer.propTypes = {
  userId: PropTypes.string,
  displayFilters: PropTypes.bool,
};

SignupListContainer.defaultProps = {
  userId: null,
  displayFilters: true,
};

export default SignupListContainer;
