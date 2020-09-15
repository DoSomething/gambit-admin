import React from 'react';
import { Col, Grid, PageHeader, Row, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import DraftSubmissionListItem from './DraftSubmissionListItem';
import helpers from '../../helpers';

const query = { populate: 'conversationId', sort: '-createdAt' };

const DraftSubmissionListContainer = () => (
  <Grid>
    <PageHeader>
      Draft photo posts
    </PageHeader>
    <HttpRequest path={helpers.getDraftSubmissionsPath()} query={query} description="drafts">
      {res => (
        <Table hover>
          <tbody>
            <Row componentClass="tr" key="header">
              <Col md={2} componentClass="th">Created</Col>
              <Col md={2} componentClass="th">User</Col>
              <Col md={2} componentClass="th">Topic</Col>
              <Col md={6} componentClass="th" />
            </Row>
            {res.data.map(draftSubmission => (
              <DraftSubmissionListItem
                draftSubmission={draftSubmission}
                key={draftSubmission._id}
              />
            ))}
          </tbody>
        </Table>
      )}
    </HttpRequest>
  </Grid>
);


export default DraftSubmissionListContainer;
