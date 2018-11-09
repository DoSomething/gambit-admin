import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import HttpRequest from '../HttpRequest';
import TriggerListItem from './TriggerListItem';
import helpers from '../../helpers';

const TriggerListContainer = props => (
  <HttpRequest path={helpers.getDefaultTopicTriggersPath()}>
    {(res) => {
      let data = res;
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
  </HttpRequest>
);

TriggerListContainer.propTypes = {
  campaignId: PropTypes.number.isRequired,
};

export default TriggerListContainer;
