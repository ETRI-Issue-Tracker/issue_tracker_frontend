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
  const [hover, setHover] = useState(false);
  const [hoverNumber, setHoverNumber] = useState(0);

  const pageHandler = (newPage) => {
    setPage(newPage);
  };

  const currentPagePostList = postList.slice((page - 1) * 4, page * 4);

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
      .catch((err) => console.log(err));
  }, []);

  return (
    <Style.Container>
      <Style.CommunityContainer>
        {userInfo?.uid ? <Style.FillButton onClick={() => navigate('/post')}>{'작성하기'}</Style.FillButton> : null}
        <Style.PostList>
          {currentPagePostList.map((post, index) => {
            return (
              <>
                {!(post.echo && post.block !== 'NORMAL') ? (
                  <Style.PostContainer key={index} onClick={() => navigate(`/post/${post.id}`)}>
                    <Style.PostInfo>
                      <Style.PostTitle>{post.title}</Style.PostTitle>
                      <Style.PostCreatedAt>{formatDate(post.createdDate)}</Style.PostCreatedAt>
                    </Style.PostInfo>
                    {post.echo ? <Style.PostState>{post.echo}</Style.PostState> : null}
                    {post.block !== 'NORMAL' ? (
                      post.echo ? (
                        <Style.PostState
                          onMouseEnter={() => {
                            setHover(true);
                            setHoverNumber(post.id);
                          }}
                          onMouseLeave={() => {
                            setHover(false);
                            setHoverNumber(0);
                          }}
                          src={process.env.PUBLIC_URL + '/assets/images/echo.png'}
                        >
                          {hover && hoverNumber === post.id ? (
                            <Style.HoverContainer style={{ backgroundColor: '#ffffdd' }}>
                              {'동조적'}
                            </Style.HoverContainer>
                          ) : null}
                        </Style.PostState>
                      ) : (
                        <Style.PostState
                          onMouseEnter={() => {
                            setHover(true);
                            setHoverNumber(post.id);
                          }}
                          onMouseLeave={() => {
                            setHover(false);
                            setHoverNumber(0);
                          }}
                          src={process.env.PUBLIC_URL + '/assets/images/block.png'}
                        >
                          {hover && hoverNumber === post.id ? (
                            <Style.HoverContainer>{'공격적'}</Style.HoverContainer>
                          ) : null}
                        </Style.PostState>
                      )
                    ) : post.echo ? (
                      <Style.PostState
                        onMouseEnter={() => {
                          setHover(true);
                          setHoverNumber(post.id);
                        }}
                        onMouseLeave={() => {
                          setHover(false);
                          setHoverNumber(0);
                        }}
                        src={process.env.PUBLIC_URL + '/assets/images/echo.png'}
                      >
                        {hover && hoverNumber === post.id ? (
                          <Style.HoverContainer style={{ backgroundColor: '#ffffdd' }}>{'동조적'}</Style.HoverContainer>
                        ) : null}
                      </Style.PostState>
                    ) : null}
                  </Style.PostContainer>
                ) : null}
              </>
            );
          })}
        </Style.PostList>
      </Style.CommunityContainer>
      <Style.ButtonContainer>
        <Style.BorderButton disabled={page === 1} onClick={() => pageHandler(page - 1)}>
          이전 페이지
        </Style.BorderButton>
        <Style.PageNumber>{page}</Style.PageNumber>
        <Style.BorderButton
          disabled={page === Math.ceil(postList.length / 4 || postList.length === 0)}
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
  PostList: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;

    width: 80vw;
    padding: 8px;
    min-width: 600px;
    border-radius: 12px;
    background-color: ${color.white};
  `,
  PostContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: calc(100% - 24px);

    padding: 8px;
    padding-left: 16px;
    padding-right: 16px;

    cursor: pointer;
    border-radius: 12px;
    box-shadow: 2px 2px 3px 3px ${color.grayLight};
    background-color: ${color.white};
  `,
  PostInfo: styled.div``,
  PostTitle: styled.p`
    color: ${color.black};
    font-size: 18px;
    font-weight: 900;
  `,
  PostCreatedAt: styled.p`
    color: ${color.textExtraLight};
    font-size: 14px;
    font-weight: 300;
  `,
  PostState: styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    padding: 8px;
    padding-left: 16px;
    font-size: 14px;
    font-weight: 900;
    border: none;
    border-radius: 20px;
    background-color: transparent;
    background-size: 48px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${(props) => 'url(' + props.src + ')'};
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
  HoverContainer: styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 24px;
    left: 24px;

    width: 100px;
    height: 40px;

    color: ${color.text};
    border-radius: 12px;
    box-shadow: 2px 2px 3px 3px ${color.grayLight};
    background-color: #ffdddd;
    padding: 8px;
  `,
};
