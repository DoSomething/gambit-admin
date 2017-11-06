import React from 'react';
import ScrollableAnchor from 'react-scrollable-anchor'
import { Panel, Row } from 'react-bootstrap';

export default class CampaignTemplate extends React.Component {
  render() {
    const name = this.props.name;
    const data = this.props.data;
    let suffix = '';
    if (data.override) {
      suffix = '**';
    }
    return (
      <Row id={name} key={name}>
        <Panel>
          <ScrollableAnchor id={name}>
            <h4><a href={`#${name}`}># {name}{suffix}</a></h4>
          </ScrollableAnchor>
          <p>{data.rendered}</p>
        </Panel>
      </Row>
    );
  }
}
