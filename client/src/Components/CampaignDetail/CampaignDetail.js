import React from 'react';
import { Col, Grid, PageHeader, Panel, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignTopicList from './CampaignTopicList';
import TriggerList from '../TriggerList/TriggerListContainer';
import TopicLink from '../TopicLink';

const CampaignDetail = (props) => {
  const campaign = props.campaign;
  const triggers = props.conversationTriggers.filter((item) => {
    return item.topic && item.topic.campaign && item.topic.campaign.id === props.campaign.id;
  });
  return (
    <Grid>
      <PageHeader>
        {campaign.internalTitle}
      </PageHeader>
      <Panel>
        <Panel.Body>
          <p>
          {campaign.endDate ? <span>Ends {campaign.endDate}</span> : <span>(No end date)</span>}
          </p>
        </Panel.Body>
      </Panel>
      <h3>Keywords</h3>
      <Table>
        <tbody>
          {triggers.map(item => (
            <Row componentClass="tr">
              <Col componentClass="td" md="2"><strong>{item.trigger}</strong></Col>
              <Col componentClass="td" md="6">{item.reply}</Col>
              <Col componentClass="td" md="4"><TopicLink topic={item.topic} /></Col>
            </Row>
          ))}
        </tbody>
      </Table>
    </Grid>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  conversationTriggers: PropTypes.array,
};

export default CampaignDetail;
