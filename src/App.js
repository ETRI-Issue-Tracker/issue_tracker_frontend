import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from './states/userState';
import Home from './pages/home';
import Error from './pages/error';
import Layout from './layouts/layout';
import Join from './pages/join';
import Login from './pages/login';
import Community from './pages/community';
import NewPost from './pages/newPost';
import PostView from './pages/postView';
import Manage from './pages/manage';

export default function App() {
  const userInfo = useRecoilValue(userInfoState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="community" element={<Community />} />
          <Route path="post/:postId" element={<PostView />} />
          <Route path="post" element={<NewPost />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="manage" element={<Manage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
