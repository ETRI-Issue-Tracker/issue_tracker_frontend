import postAPI from '../apis/postAPI';
import styled from 'styled-components';
import { color, formatDate } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PostView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState();

  useEffect(() => {
    try {
      if (!post) {
        postAPI
          .postGet(location.pathname.split('/')[2])
          .then((res) =>
            setPost({ title: res.data.title, content: res.data.content, createdDate: res.data.createdDate }),
          )
          .catch((err) => console.log(err.response));
      }
    } catch {
      navigate('/error');
    }
  }, []);

  const test = () => {
    postAPI
      .postGetAll()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };
  // 공백 포함 100자 제한

  return (
    <Style.Container>
      <Style.PostForm>
        <Style.InputForm>
          <Style.InputTitle>{'제목'}</Style.InputTitle>
          <Style.InputContainer>
            <Style.Input>{post?.title}</Style.Input>
          </Style.InputContainer>
        </Style.InputForm>
        <Style.InputForm>
          <Style.InputTitle>{'게시일'}</Style.InputTitle>
          <Style.InputContainer>
            <Style.Input>{formatDate(post?.createdDate)}</Style.Input>
          </Style.InputContainer>
        </Style.InputForm>
        <Style.InputForm>
          <Style.InputTitle>{'본문'}</Style.InputTitle>
          <Style.InputContainer>
            <Style.TextArea>{post?.content}</Style.TextArea>
          </Style.InputContainer>
        </Style.InputForm>
      </Style.PostForm>
      <Style.ButtonContainer>
        <Style.Button
          onClick={() => {
            console.log(location.search);
            if (location.search) {
              if (location.search?.split('=')[1].split('&')[0] === 'true')
                navigate(`/manage?filter=${location.search?.split('=')[2]}`);
            } else navigate('/community');
          }}
        >
          {'목록'}
        </Style.Button>
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

    width: calc(100vw - 48px);
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;

    background-color: ${color.white};
  `,
  PostForm: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
  `,
  InputForm: styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 0px;
  `,
  InputTitle: styled.p`
    width: 120px;

    text-align: center;
    margin: 0px;
    margin-top: 12px;

    color: ${color.navy};
    font-size: 32px;
    font-weight: 700;
  `,
  InputContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    width: 40vw;
    min-width: 480px;
    border-radius: 20px;
    border: 5px solid ${color.blue};
    padding: 12px;
    padding-left: 4px;
    padding-right: 4px;

    background: ${color.white};
    margin-right: 60px;
  `,
  Input: styled.div`
    display: flex;
    align-items: center;

    width: calc(40vw - 42px);
    height: 38px;
    min-width: 438px;
    flex-shrink: 0;

    border: none;
    border-radius: 13px;
    background-color: ${color.white};

    color: ${color.textDeep};

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  TextArea: styled.div`
    width: calc(40vw - 42px);
    height: 338px;
    min-width: 438px;
    min-height: 80px;
    flex-shrink: 0;

    border: none;
    border-radius: 13px;
    background-color: ${color.white};

    color: ${color.textDeep};

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  Button: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 120px;
    height: 60px;

    font-size: 20px;
    font-weight: 500;
    border: none;
    border-radius: 20px;
    color: ${color.white};
    cursor: pointer;
    background-color: ${color.blue};
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    margin: 40px;
    margin-left: 80px;
  `,
};
