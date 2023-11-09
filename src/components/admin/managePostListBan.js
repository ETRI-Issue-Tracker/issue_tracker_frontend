import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../states/userState';
import { postListState } from '../../states/postState';
import { useEffect, useState } from 'react';
import { color, formatDate, styledAlert } from '../../utils';
import postAPI from '../../apis/postAPI';

export default function ManagePostListBan() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const infoList = ['번호', '제목', '생성 시각', '상태', '삭제'];
  const [postList, setPostList] = useRecoilState(postListState);
  const [currentPagePostList, setCurrentPagePostList] = useState([]);
  const [page, setPage] = useState(1);

  const pageHandler = (newPage) => {
    setPage(newPage);
  };

  const getPostState = (echo, block) => {
    if (echo) {
      if (block === 'NORMAL') return 'ECHO';
      else return 'DANGEROUS';
    } else {
      return block;
    }
  };

  const postClickHandler = (e) => {
    const postId = e.currentTarget.firstChild.innerHTML;
    if (e.target.type !== 'submit') navigate(`/post/${postId}?manage=true&prev=ban`);
  };

  const postDeleteClickHandler = (e) => {
    const postId = +e.target.value;
    postAPI
      .postDelete(postId)
      .then((res) => {
        styledAlert('해당 컨텐츠가 삭제되었습니다.', () =>
          setPostList([...postList.filter((post) => post.id !== postId)]),
        );
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    postAPI
      .postGetAll()
      .then((res) => setPostList([...res.data?.filter((post) => post.echo && post.block !== 'NORMAL')]?.reverse()))
      .catch((err) => console.log(`status: ${err.response.status}, ${err.response.data}`));
  }, []);

  useEffect(() => {
    setCurrentPagePostList(postList.slice((page - 1) * 10, page * 10));
  }, [postList]);

  return (
    <Style.AdminForm>
      <Style.CommunityContainer>
        <Style.Table>
          <thead>
            <Style.TableRow style={{ cursor: 'default' }}>
              {infoList.map((info, infoIndex) => (
                <Style.TableHeaderData key={infoIndex}>{info}</Style.TableHeaderData>
              ))}
            </Style.TableRow>
          </thead>
          <tbody>
            {currentPagePostList.map((post, postIndex) => (
              <Style.TableRow key={postIndex} onClick={(e) => postClickHandler(e)}>
                <Style.TableData width={30}>{post.id}</Style.TableData>
                <Style.TableData width={280}>{post.title}</Style.TableData>
                <Style.TableData width={180}>{formatDate(post.createdDate)}</Style.TableData>
                <Style.TableData width={60}>{getPostState(post.echo, post.block)}</Style.TableData>
                <Style.TableData width={60}>
                  <Style.FillButton onClick={(e) => postDeleteClickHandler(e)} value={post?.id}>
                    {'삭제'}
                  </Style.FillButton>
                </Style.TableData>
              </Style.TableRow>
            ))}
            {Array(10 - currentPagePostList.length)
              .fill(0)
              .map((_, index) => {
                return (
                  <Style.TableRow style={{ cursor: 'default' }} key={index}>
                    <Style.TableData width={30} />
                    <Style.TableData width={280} />
                    <Style.TableData width={180} />
                    <Style.TableData width={60} />
                    <Style.TableData width={60} />
                  </Style.TableRow>
                );
              })}
          </tbody>
        </Style.Table>
      </Style.CommunityContainer>
      <Style.ButtonContainer>
        <Style.BorderButton disabled={page === 1} onClick={() => pageHandler(page - 1)}>
          이전 페이지
        </Style.BorderButton>
        <Style.PageNumber>{page}</Style.PageNumber>
        <Style.BorderButton
          disabled={page === Math.ceil(postList.length / 10 || postList.length === 0)}
          onClick={() => pageHandler(page + 1)}
        >
          다음 페이지
        </Style.BorderButton>
      </Style.ButtonContainer>
    </Style.AdminForm>
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
    gap: 32px;
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
    width: 78vw;
    min-width: 800px;
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
    position: relative;
    border: 1px solid ${color.blue};
    color: ${color.textDeep};
    text-align: center;
    height: 24px;
    padding: 8px;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    margin-left: 40px;
  `,
  FillButton: styled.button`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: calc(50% - 12px);
    left: calc(50% - 36px);

    width: 72px;
    height: 24px;

    font-weight: 500;
    border: none;
    border-radius: 20px;
    color: ${color.white};
    cursor: pointer;
    background-color: ${color.blueLight};

    &:hover {
      background-color: ${color.white};
      border: 1.5px solid ${color.blue};
      color: ${color.blue};
    }
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
