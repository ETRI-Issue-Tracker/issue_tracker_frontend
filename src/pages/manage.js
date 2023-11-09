import styled from 'styled-components';
import { color } from '../utils';
import postAPI from '../apis/postAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../states/userState';
import { useEffect } from 'react';
import AdminSidebar from '../components/admin/sidebar';
import { postListState } from '../states/postState';
import ManagePostListAll from '../components/admin/managePostListAll';
import ManagePostListBlock from '../components/admin/managePostListBlock';
import ManagePostListEcho from '../components/admin/managePostListEcho';
import ManagePostListBan from '../components/admin/managePostListBan';
import ManagePostAnalysis from '../components/admin/managePostAnalysis';

export default function Manage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const [, setPostList] = useRecoilState(postListState);

  useEffect(() => {
    if (!location.search) navigate('/manage?filter=all');
  }, []);

  return (
    <Style.Container>
      <AdminSidebar />
      {location.search?.split('=')[1] === 'all' ? <ManagePostListAll /> : null}
      {location.search?.split('=')[1] === 'block' ? <ManagePostListBlock /> : null}
      {location.search?.split('=')[1] === 'echo' ? <ManagePostListEcho /> : null}
      {location.search?.split('=')[1] === 'ban' ? <ManagePostListBan /> : null}
      {location.search?.split('=')[1] === 'analysis' ? <ManagePostAnalysis /> : null}
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    gap: 32px;

    width: calc(100vw - 48px);
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;

    background-color: ${color.white};
  `,
  AdminForm: styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  `,
  CommunityContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    gap: 8px;

    height: 448px;
    background-color: ${color.white};
  `,
  Table: styled.table`
    border-collapse: collapse;
    width: 80vw;
    min-width: 700px;
  `,
  TableRow: styled.tr`
    cursor: pointer;
  `,
  TableHeaderData: styled.th`
    background-color: ${color.blue};
    color: ${color.white};
    border: 1px solid ${color.blue};
    text-align: center;
    padding: 8px;
  `,
  TableData: styled.td`
    border: 1px solid ${color.blue};
    color: ${color.textDeep};
    text-align: center;
    height: 24px;
    padding: 8px;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  `,
  FillButton: styled.button`
    display: flex;
    align-self: flex-end;
    justify-content: center;
    align-items: center;

    width: 96px;
    height: 40px;

    font-weight: 500;
    border: none;
    border-radius: 20px;
    color: ${color.white};
    cursor: pointer;
    background-color: ${color.blueLight};
  `,
  BorderButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 96px;
    height: 40px;

    border: 1.5px solid ${color.blue};
    border-radius: 20px;

    font-weight: 500;
    color: ${color.blue};
    cursor: pointer;
    background-color: ${color.white};

    &:disabled {
      color: ${color.textExtraLight};
      background-color: ${color.grayLight};
      cursor: not-allowed;
    }
  `,
  PageNumber: styled.p`
    width: 20px;
    color: ${color.navy};
    text-align: center;
  `,
};
