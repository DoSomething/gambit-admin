import React from 'react';
import PropTypes from 'prop-types';
import { Pager } from 'react-bootstrap';

class ListPager extends React.Component {
  constructor(props) {
    super(props);
    const skipCount = this.props.skipCount;
    const pageSize = this.props.pageSize;
    const totalResultCount = this.props.totalResultCount;
    this.startNumber = skipCount + 1;
    this.endNumber = (this.startNumber + this.props.pageCount) - 1;
    const location = window.location;
    const url = [location.protocol, '//', location.host, location.pathname].join('');
    if (skipCount) {
      const prevSkip = skipCount - pageSize;
      this.prevUrl = `${url}?skip=${prevSkip}`;
    }
    if (totalResultCount > pageSize && this.endNumber < totalResultCount) {
      this.nextUrl = `${url}?skip=${skipCount + pageSize}`;
    }
  }
  render() {
    let leftPagerItem;
    if (this.prevUrl) {
      leftPagerItem = <Pager.Item previous href={this.prevUrl}>Previous</Pager.Item>;
    }

    let rightPagerItem;
    if (this.nextUrl) {
      rightPagerItem = <Pager.Item next href={this.nextUrl}>Next</Pager.Item>;
    }

    let label = 'No results';
    const totalResultCount = this.props.totalResultCount;
    if (totalResultCount > 0) {
      const total = totalResultCount.toLocaleString();
      label = `${this.startNumber}-${this.endNumber} of ${total} ${this.props.description}`;
    }

    return (
      <Pager>
        {leftPagerItem}
        <small>{label}</small>
        {rightPagerItem}
      </Pager>
    );
  }
}

ListPager.propTypes = {
  description: PropTypes.string.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  skipCount: PropTypes.number.isRequired,
  totalResultCount: PropTypes.number.isRequired,
};

export default ListPager;

