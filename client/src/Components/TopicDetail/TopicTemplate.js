import React from 'react';
import PropTypes from 'prop-types';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Panel } from 'react-bootstrap';

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
      <Panel id={name} key={name}>
        <Panel.Heading>
          <ScrollableAnchor id={name}>
            <Panel.Title componentClass="h3">
              <a href={`#${name}`}>{name}{this.suffix}</a>
            </Panel.Title>
          </ScrollableAnchor>
        </Panel.Heading>
        <Panel.Body>{this.props.data.rendered}</Panel.Body>
      </Panel>
    );
  }
}

TopicTemplate.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  name: PropTypes.string.isRequired,
};

export default TopicTemplate;
