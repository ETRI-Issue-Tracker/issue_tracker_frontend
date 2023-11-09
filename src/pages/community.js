import styled from 'styled-components';
import postAPI from '../apis/postAPI';
import { color, formatDate } from '../utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../states/userState';

export default function Community() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const infoList = ['번호', '제목', '생성 시각', '상태'];
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);

  const pageHandler = (newPage) => {
    setPage(newPage);
  };

  const currentPagePostList = postList.slice((page - 1) * 10, page * 10);

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
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    postAPI
      .postGetAll()
      .then((res) => setPostList(res.data?.reverse()))
      .catch((err) => console.log(`status: ${err.response.status}, ${err.response.data}`));
  }, []);

  return (
    <Style.Container>
      <Style.CommunityContainer>
        {userInfo?.uid ? <Style.FillButton onClick={() => navigate('/post')}>{'작성하기'}</Style.FillButton> : null}
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
                <Style.TableData width={300}>{post.title}</Style.TableData>
                <Style.TableData width={200}>{formatDate(post.createdDate)}</Style.TableData>
                <Style.TableData width={70}>{getPostState(post.echo, post.block)}</Style.TableData>
              </Style.TableRow>
            ))}
            {Array(currentPagePostList.length ? 10 - currentPagePostList.length : 10)
              .fill(0)
              .map((_, index) => {
                return (
                  <Style.TableRow key={index}>
                    <Style.TableData width={30} />
                    <Style.TableData width={280} />
                    <Style.TableData width={180} />
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
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;

    width: calc(100vw - 48px);
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;

    background-color: ${color.white};
  `,
  CommunityContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    gap: 8px;

    height: 520px;
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
