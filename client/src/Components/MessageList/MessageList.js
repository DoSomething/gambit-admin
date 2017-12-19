import React from 'react';
import PropTypes from 'prop-types';
import { Pager, Table } from 'react-bootstrap';
import MessageListItem from './MessageListItem';

function renderPager(totalResultCount, skipCount, pageCount, pageSize) {
  const startNumber = skipCount + 1;
  const endNumber = (startNumber + pageCount) - 1;

  const location = window.location;
  const url = [location.protocol, '//', location.host, location.pathname].join('');

  let leftPagerItem;
  if (skipCount) {
    const prevSkip = skipCount - pageSize;
    const prevUrl = `${url}?skip=${prevSkip}`;
    leftPagerItem = <Pager.Item previous href={prevUrl}>Previous</Pager.Item>;
  }

  let rightPagerItem;
  if (totalResultCount > pageSize && endNumber < totalResultCount) {
    const nextUrl = `${url}?skip=${skipCount + pageSize}`;
    rightPagerItem = <Pager.Item next href={nextUrl}>Next</Pager.Item>;
  }
  let label = 'No results';
  if (totalResultCount > 0) {
    label = `${startNumber}-${endNumber} of ${totalResultCount.toLocaleString()}`;
  }

  return (
    <Pager>
      {leftPagerItem}
      <small>{label}</small>
      {rightPagerItem}
    </Pager>
  );
}

const MessageList = (props) => {
  if (!props.data) {
    return <div>No results found.</div>;
  }
  const pager = renderPager(props.totalCount, props.skipCount, props.data.length, props.pageSize);
  let data = props.data.map(message => <MessageListItem table={props.table} message={message} />);
  if (props.table) {
    data = <Table><tbody>{data}</tbody></Table>;
  }
  return (
    <div>
      { pager }
      { data }
      { props.totalCount > 10 ? pager : null }
    </div>
  );
};

MessageList.propTypes = {
  totalCount: PropTypes.number.isRequired,
  skipCount: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default MessageList;
