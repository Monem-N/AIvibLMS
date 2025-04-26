# Code References

This document contains relevant code snippets from the legacy Hypatia LMS system related to reporting and analytics functionality.

## Google Analytics Integration

```javascript
// From src/app/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactGA from 'react-ga';
import { store } from './store';
import App from './core/app';
import Home from './themes/nekomy/pages/home/home';
import Dashboard from './themes/nekomy/pages/dashboard/dashboard';
import Page from './themes/nekomy/pages/page/page';
import Post from './themes/nekomy/pages/post/post';
import Course from './themes/nekomy/pages/course/course';
import Subject from './themes/nekomy/pages/subject/subject';
import Module from './themes/nekomy/pages/module/module';
import Activity from './themes/nekomy/pages/activity/activity';
import NotFound from './themes/nekomy/pages/notFound/notFound';
import Admin from './core/admin/admin';

// Google Analytics initializacion
ReactGA.initialize('UA-00000000-1', {
  debug: false,
  titleCase: false,
  gaOptions: {}
});

function logPageView() {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.href });
    ReactGA.pageview(window.location.href);
  }
}

// Render the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={logPageView}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pages/:slug" component={Page} />
        <Route path="/posts/:slug" component={Post} />
        <Route path="/courses/:slug" component={Course} />
        <Route path="/subjects/:slug" component={Subject} />
        <Route path="/modules/:slug" component={Module} />
        <Route path="/activities/:slug" component={Activity} />
        <Route path="/admin(/**)" component={Admin} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
```

## Dashboard Component

```javascript
// From src/app/themes/nekomy/pages/dashboard/dashboard.jsx
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';
import { Link } from 'react-router';
import $ from 'jquery';
import moment from 'moment';
import { setLoading } from '../../../../core/actions/actions';
import Icon from '../../../../core/common/lib/icon/icon';
import Info from '../../../../../../static/svg/info.svg';
import Announcement from '../../../../../../static/svg/announcement.svg';
import Download from '../../../../../../static/svg/download.svg';
import Upload from '../../../../../../static/svg/upload.svg';
import Teacher from '../../../../../../static/svg/professor.svg';
import Chat from '../../../../../../static/svg/chat.svg';

const defaultProps = {
  colors: [
    '#2ecc71',
    '#e8303f',
    '#122d59',
    '#448cd3',
    '#445f8c',
    '#ffdd00',
    '#f0ad4e',
    '#a83fd0'
  ]
};

const propTypes = {
  colors: PropTypes.array
};

const { isLoaded, isEmpty, dataToJS } = helpers;

@firebase(() => (['subjects', 'activities', 'users']))
@connect(state => ({
  users: dataToJS(state.firebase, 'users'),
  subjects: dataToJS(state.firebase, 'subjects'),
  activities: dataToJS(state.firebase, 'activities')
}))
class Dashboard extends Component {

  componentDidMount() {
    this.props.setLoading(false);
    $('.js-main').removeClass().addClass('main js-main dashboard-page');
  }

  render() {
    let subjects = null;
    const activities = [];

    if (isLoaded(this.props.subjects) && !isEmpty(this.props.subjects) &&
    isLoaded(this.props.activities) && !isEmpty(this.props.activities) &&
    isLoaded(this.props.users) && !isEmpty(this.props.users)) {
      subjects = Object.keys(this.props.users[this.props.user.uid].courses).map((key) => {
        const course = this.props.users[this.props.user.uid].courses[key];

        return Object.keys(course).map((subject, c) => {
          let teachers = '';

          if (this.props.subjects[subject].activities) {
            const newActivities = this.props.subjects[subject].activities.map(activity => (
              <li
                key={activity}
                className="item"
                style={{
                  borderLeftColor: this.props.colors[c]
                }}
              >
                <Link to={`/activities/${this.props.activities[activity].slug}`}>{this.props.activities[activity].title}</Link>
                <div className="meta">
                  Due in
                  <span className="date">{moment(this.props.activities[activity].endDate).format('D MMMM YYYY')}</span>
                </div>
                <div className="actions">
                  <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Announcement} /></Link>
                  <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Download} /></Link>
                  <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Upload} /></Link>
                  <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Chat} /></Link>
                </div>
              </li>
            ));

            activities.push(newActivities);
          }

          if (this.props.subjects[subject].teachers) {
            for (let i = 0; i < this.props.subjects[subject].teachers.length; i += 1) {
              const teacher = this.props.users[this.props.subjects[subject].teachers[i]];
              if (teacher) {
                teachers += `${teacher.info.firstName} ${teacher.info.lastName1}`;
                if (i < this.props.subjects[subject].teachers.length - 1) {
                  teachers += ', ';
                }
              }
            }
          }

          return (
            <li
              key={subject}
              className="item"
              style={{
                borderLeftColor: this.props.colors[c]
              }}
            >
              <Link to={`/subjects/${this.props.subjects[subject].slug}`}>{this.props.subjects[subject].title}</Link>
              <div className="teachers"><Icon glyph={Teacher} />{teachers}</div>
            </li>
          );
        });
      });
    }

    return (
      <section className="dashboard page">
        {(!isLoaded(subjects) && !isLoaded(activities))
          ? <div className="loader-small" />
          : <div className="page-wrapper">
            <div className="announcement">
              <Icon glyph={Info} />
              From August 15th 23:00pm until August 16th 8am, the website will be offline due to maintenance works. Apologies for the trouble. (Hardcoded)
            </div>
            <div className="columns">
              <div className="column">
                <h1 className="dashboard-title">My subjects</h1>
                <ul className="items-list">
                  {!isEmpty(subjects)
                    ? subjects
                    : 'None'}
                </ul>
              </div>
              <div className="column">
                <h1 className="dashboard-title">My current activities</h1>
                <ul className="items-list">
                  {!isEmpty(activities)
                    ? activities
                    : 'None'}
                </ul>
              </div>
              <div className="column">
                <h1 className="dashboard-title">My direct messages (Hardcoded)</h1>
                <ul className="items-list">
                  <li className="item">
                    <div>John Smith</div>
                    <div>#maths #test1</div>
                    <div>I've uploaded the new formulas. Please let me know when you are available to...</div>
                  </li>
                  <li className="item">
                    <div>Martin Lee</div>
                    <div>#french #assignment1</div>
                    <div>Hi Joan. In the 2nd question, you said 'trais bien' but the correct answer is 'très...</div>
                  </li>
                  <li className="item">
                    <div>Morgan Freeman, John Doe</div>
                    <div>#history #assignment2</div>
                    <div>Hi Joan and John, the result of your assignment is already published. Well done!</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>}
      </section>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

const mapDispatchToProps = {
  setLoading
};

const mapStateToProps = ({
  mainReducer: {
    isDesktop,
    user
  }
}) => ({ isDesktop, user });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
```

## Grades Component

```javascript
// From src/app/themes/nekomy/components/grades/grades.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoading } from '../../../../core/actions/actions';

class Grades extends Component {

  componentDidMount() {}

  render() {
    return (
      <section className={`calendar-panel ${this.props.class}`}>
        <h4 className="panel-heading">Activities Hub</h4>
        <p>Sorry, this feature will be available in the following weeks.</p>
      </section>
    );
  }
}

const mapDispatchToProps = {
  setLoading
};

const mapStateToProps = ({
  mainReducer: {
    isDesktop,
    user
  }
}) => ({ isDesktop, user });

export default connect(mapStateToProps, mapDispatchToProps)(Grades);
```

## Admin Panel (Partial)

```javascript
// From src/app/core/admin/admin.jsx (partial)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';
import $ from 'jquery';
import _ from 'lodash';
import classNames from 'classnames';
import SimpleMDE from 'react-simplemde-editor';
import Select2 from 'react-select2-wrapper';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { history } from '../../store';
import { setLoading, setNotification } from '../actions/actions';
import * as CONSTANTS from '../constants/constants';
import ModalBox from '../common/modalbox/modalbox';
import AdminUsers from './adminUsers';
import Helpers from '../common/helpers';
import Icon from '../common/lib/icon/icon';

// ... imports continue ...

const { isLoaded, isEmpty, dataToJS } = helpers;

@connect(state => ({
  users: dataToJS(state.firebase, 'users'),
  levels: dataToJS(state.firebase, 'levels'),
  groups: dataToJS(state.firebase, 'groups'),
  courses: dataToJS(state.firebase, 'courses'),
  subjects: dataToJS(state.firebase, 'subjects'),
  modules: dataToJS(state.firebase, 'modules'),
  activities: dataToJS(state.firebase, 'activities'),
  posts: dataToJS(state.firebase, 'posts'),
  pages: dataToJS(state.firebase, 'pages'),
  files: dataToJS(state.firebase, 'files'),
  userID: state.mainReducer.user
    ? state.mainReducer.user.uid
    : '',
  userData: dataToJS(state.firebase, `users/${state.mainReducer.user
    ? state.mainReducer.user.uid
    : ''}`)
}))
@firebase(props => ([
  'users',
  'levels',
  'groups',
  'courses',
  'subjects',
  'modules',
  'activities',
  'posts',
  'pages',
  'files',
  `users/${props.userID}`
]))
class Admin extends Component {

  // ... methods continue ...

  render() {
    const users = this.createList('users');
    const levels = this.createList('levels');
    const groups = this.createList('groups');
    const courses = this.createList('courses');
    const subjects = this.createList('subjects');
    const modules = this.createList('modules');
    const activities = this.createList('activities');
    const posts = this.createList('posts');
    const pages = this.createList('pages');
    const files = this.createList('files');

    // ... render method continues ...
  }
}

// ... component export ...
```

## Activity Tracking

```javascript
// From src/app/themes/nekomy/pages/activity/activity.jsx (partial)
@connect(state => ({
  activity: dataToJS(state.firebase, 'activities'),
  files: dataToJS(state.firebase, 'files'),
  users: dataToJS(state.firebase, 'users'),
  userID: state.mainReducer.user
    ? state.mainReducer.user.uid
    : '',
  userData: dataToJS(state.firebase, `users/${state.mainReducer.user
    ? state.mainReducer.user.uid
    : ''}`)
}))
@firebase(props => ([
  `activities#orderByChild=slug&equalTo=${window.location.href.substr(window.location.href.lastIndexOf('/') + 1)}`,
  'files',
  'users',
  `users/${props.userID}`
]))
class Activity extends Component {

  componentDidMount() {
    this.props.setLoading(false);
    $('.js-main').removeClass().addClass('main js-main activity-page');
  }

  render() {
    let activity = null;
    let featuredImage = null;
    let authors = '';

    if (isLoaded(this.props.activity) && isLoaded(this.props.files) && isLoaded(this.props.users) && !isEmpty(this.props.activity) && !isEmpty(this.props.files) && !isEmpty(this.props.users)) {
      Object.keys(this.props.activity).map((key) => {
        activity = this.props.activity[key];
        if (activity.featuredImage) {
          Object.keys(this.props.files).map((fileKey) => {
            if (fileKey === activity.featuredImage) {
              featuredImage = this.props.files[fileKey];
            }
            return false;
          });
        }
        if (activity.authors) {
          for (let i = 0; i < activity.authors.length; i += 1) {
            const author = this.props.users[activity.authors[i]];
            if (author) {
              authors += `${author.info.firstName} ${author.info.lastName1}`;
              if (i < activity.authors.length - 1) {
                authors += ', ';
              }
            }
          }
        }
        return false;
      });
    }

    // ... render method continues ...
  }
}
```

## Dashboard Styling

```css
/* From src/app/themes/nekomy/pages/dashboard/dashboard.scss */
.dashboard {
 .announcement {
  font-size: 14px;
  padding: 10px;
  display: inline-block;
  border: 1px solid $light-grey;
  margin: 20px 20px 0 20px;
  width: calc(100% - 40px);
  border-radius: 5px;
  
  .icon {
   margin-right: 10px;
  }
 }
 
 .columns {
  padding: 0;
 }
 
 .dashboard-title {
  font-size: 18px;
 }
 
 .items-list {
  list-style-type: none;
  padding: 0;
  
  .item {
   padding: 10px 0;
   border-bottom: 1px solid $light-grey;
   border-left: 4px solid;
      padding-left: 10px;
      margin-bottom: 5px;
  }
 }
 
 .meta {
  text-align: left;
  padding: 0;
 }
 
 .actions, .teachers {
  .icon {
   margin-right: 10px;
  }
 }
}
```

## Grades Styling

```css
/* From src/app/themes/nekomy/components/grades/grades.scss */
.grades-panel {
 display: none;
 padding: 20px;
 
 &.open {
  display: block;
 }
}
```
