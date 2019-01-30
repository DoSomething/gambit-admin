import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import GraphQLQuery from '../GraphQLQuery';
import TriggerListItem from './TriggerListItem';
import { getConversationTriggersQuery } from '../../graphql';

const TriggerListContainer = props => (
  <GraphQLQuery
    query={getConversationTriggersQuery}
    displayPager={false}
  >
    {(res) => {
      let data = res.conversationTriggers;
      if (props.campaignId) {
        data = lodash.filter(data, (trigger) => {
          const topic = trigger.topic;
          return topic && topic.campaign && topic.campaign.id === props.campaignId;
        });
      }
      data = lodash.orderBy(data, 'trigger');
      return (
        <Table>
          <tbody>
            {data.map(trigger => <TriggerListItem trigger={trigger} key={trigger.trigger} />)}
          </tbody>
        </Table>
      );
    }}
  </GraphQLQuery>
);

TriggerListContainer.propTypes = {
  campaignId: PropTypes.number.isRequired,
};

export default TriggerListContainer;
