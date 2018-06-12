import React from 'react';
import PropTypes from 'prop-types';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Panel, Row } from 'react-bootstrap';

class TopicTemplate extends React.Component {
  constructor(props) {
    super(props);

    const data = this.props.data;
    this.suffix = '';
    if (data.override) {
      this.suffix = '**';
    }
  }

  render() {
    const name = this.props.name;

    return (
      <Row id={name} key={name}>
        <Panel>
          <ScrollableAnchor id={name}>
            <h4><a href={`#${name}`}># {name}{this.suffix}</a></h4>
          </ScrollableAnchor>
          <p>{this.props.data.rendered}</p>
        </Panel>
      </Row>
    );
  }
}

TopicTemplate.propTypes = {
  data: PropTypes.shape.isRequired,
  name: PropTypes.string.isRequired,
};

export default TopicTemplate;
