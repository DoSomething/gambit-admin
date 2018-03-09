import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import MessageListItem from './MessageListItem';
import ListPager from '../ListPager';

const MessageList = (props) => {
  if (!props.data) {
    return <div>No results found.</div>;
  }
  const pager = (
    <ListPager
      totalResultCount={props.totalCount}
      skipCount={props.skipCount}
      pageCount={props.data.length}
      pageSize={props.pageSize}
      description="messages"
    />
  );
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
  table: PropTypes.bool.isRequired,
};

export default MessageList;
