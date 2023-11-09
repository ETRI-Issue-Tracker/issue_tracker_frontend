import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_ISSUE_TRACKER_SERVER_URL,
});
