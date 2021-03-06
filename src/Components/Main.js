import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import BroadcastDetail from './BroadcastDetail/BroadcastDetailContainer';
import BroadcastList from './BroadcastList/BroadcastListContainer';
import BroadcastReplyList from './BroadcastDetail/BroadcastReplyList';
import CampaignDetail from './CampaignDetail/CampaignDetailContainer';
import ActiveCampaignList from './CampaignList/ActiveCampaignList';
import ClosedCampaignList from './CampaignList/ClosedCampaignList';
import ConversationRequest from './ConversationRequest';
import DraftSubmissionDetail from './DraftSubmissionDetail/DraftSubmissionDetailContainer';
import DraftSubmissionList from './DraftSubmissionList/DraftSubmissionListContainer';
import PostList from './PostList/PostListContainer';
import SignupList from './SignupList/SignupListContainer';
import TopicDetail from './TopicDetail/TopicDetailContainer';
import UserDetail from './UserDetail/UserDetailContainer';
import UserList from './UserList/UserListContainer';

const Main = () => (
  <main>
    <Switch>
      <Route path="/broadcasts/:broadcastId/:macro" component={BroadcastReplyList} />
      <Route path="/broadcasts/:broadcastId" component={BroadcastDetail} />
      <Route path="/broadcasts" component={BroadcastList} />
      <Route path="/campaigns/:campaignId" component={CampaignDetail} />
      <Route path="/campaigns" component={ActiveCampaignList} />
      <Route path="/campaigns-ended" component={ClosedCampaignList} />
      <Route path="/draftSubmissions/:draftSubmissionId" component={DraftSubmissionDetail} />
      <Route path="/draftSubmissions" component={DraftSubmissionList} />
      <Route path="/posts" component={PostList} />
      <Route path="/requests/:requestId" component={ConversationRequest} />
      <Route path="/requests" component={Home} />
      <Route path="/signups" component={SignupList} />
      <Route path="/topics/:topicId" component={TopicDetail} />
      <Route path="/topics" component={ActiveCampaignList} />
      <Route path="/triggers" component={AdminDashboard} />
      <Route path="/users/:userId" component={UserDetail} />
      <Route path="/users" component={UserList} />
      <Route path="/" component={Home} />
    </Switch>
  </main>
);

export default Main;
