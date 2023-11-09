import styled from 'styled-components';
import postAPI from '../apis/postAPI';
import { color, styledAlert, styledWarning } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../states/userState';
import { useEffect, useRef, useState } from 'react';

export default function NewPost() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const titleRef = useRef('');
  const contentRef = useRef('');
  const [contentLength, setContentLength] = useState(0);

  const postCreateHandler = () => {
    if (!titleRef.current.value) {
      styledWarning('제목을 입력하세요.');
    } else if (!contentRef.current.value) {
      styledWarning('본문 내용을 입력하세요.');
    } else {
      postAPI
        .postCreate({ title: titleRef.current.value, content: contentRef.current.value, memberId: 1 })
        .then((res) => {})
        .catch((err) => console.log(err.response));
      styledAlert('게시물을 등록했습니다.', () => navigate('/community'));
    }
  };

  useEffect(() => {
    if (!userInfo.uid) {
      styledWarning('로그인이 필요한 서비스입니다.', () => navigate('/login'));
    }
  }, []);

  return (
    <Style.Container>
      <Style.PostForm>
        <Style.InputForm>
          <Style.InputTitle>{'제목'}</Style.InputTitle>
          <Style.InputContainer>
            <Style.Input ref={titleRef} placeholder={'제목을 입력하세요'} maxLength={100} />
          </Style.InputContainer>
        </Style.InputForm>
        <Style.InputForm>
          <Style.InputTitle>{'작성자'}</Style.InputTitle>
          <Style.InputContainer>
            <Style.Input readOnly value={userInfo?.nickname} />
          </Style.InputContainer>
        </Style.InputForm>
        <Style.InputForm>
          <Style.InputTitle>{'본문'}</Style.InputTitle>
          <Style.InputContainer>
            <Style.TextArea
              ref={contentRef}
              placeholder={'내용을 입력하세요 (공백 포함 100자 이내)'}
              maxLength={100}
              onInput={(e) => setContentLength(e.target.value?.length)}
            />
          </Style.InputContainer>
        </Style.InputForm>
        {contentLength >= 100 ? <Style.LengthWarning>{'* 100자를 모두 입력했습니다.'}</Style.LengthWarning> : null}
      </Style.PostForm>
      <Style.ButtonContainer>
        <Style.Button onClick={() => postCreateHandler()}>{'게시'}</Style.Button>
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
  Input: styled.input`
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

    &:focus {
      outline: none;
    }
  `,
  TextArea: styled.textarea`
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
    resize: vertical;

    &:focus {
      outline: none;
    }
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
  LengthWarning: styled.p`
    text-align: center;
    margin: 0px;
    margin-top: -12px;
    margin-left: 128px;

    color: ${color.navy};
    font-size: 20px;
    font-weight: 700;
  `,
};
