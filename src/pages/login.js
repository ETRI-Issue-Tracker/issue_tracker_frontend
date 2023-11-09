import { useRecoilState } from 'recoil';
import { userInfoState } from '../states/userState';
import { useNavigate } from 'react-router-dom';
import userAPI from '../apis/userAPI';
import styled from 'styled-components';
import { color, enterKeyPressHandler, styledAlert, styledWarning } from '../utils/';
import { useRef } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [, setUserInfo] = useRecoilState(userInfoState);
  const idRef = useRef('');
  const passwordRef = useRef('');

  const loginHandler = () => {
    if (!idRef.current.value) {
      styledWarning('아이디를 입력하세요.');
    } else if (!passwordRef.current.value) {
      styledWarning('비밀번호를 입력하세요.');
    } else {
      userAPI
        .login({ uid: idRef.current.value, password: passwordRef.current.value })
        .then((res) => {
          console.log(res.data);
          styledAlert(`${res.data.nickname} 님 환영합니다.`, () => navigate('/'));
          setUserInfo({ uid: res.data.uid, nickname: res.data.nickname });
        })
        .catch((err) => {
          styledWarning('아이디 혹은 비밀번호가 틀렸습니다.');
        });
    }
  };

  return (
    <Style.Container>
      <Style.PageTitle>{'로그인'}</Style.PageTitle>
      <Style.LoginForm>
        <Style.InputForm>
          <Style.InputTitle>{'아이디'}</Style.InputTitle>
          <Style.InputContainer>
            <Style.Input ref={idRef} placeholder={'아이디를 입력하세요'} />
          </Style.InputContainer>
        </Style.InputForm>
        <Style.InputForm>
          <Style.InputTitle>{'비밀번호'}</Style.InputTitle>
          <Style.InputContainer>
            <Style.Input
              ref={passwordRef}
              placeholder={'비밀번호를 입력하세요'}
              type={'password'}
              onKeyDown={(e) => enterKeyPressHandler(e, () => loginHandler())}
            />
          </Style.InputContainer>
        </Style.InputForm>
        <Style.ButtonContainer>
          <Style.LoginButton onClick={() => loginHandler()}>{'로그인'}</Style.LoginButton>
        </Style.ButtonContainer>
      </Style.LoginForm>
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
  PageTitle: styled.p`
    position: absolute;
    top: 120px;

    color: ${color.navy};
    font-size: 48px;
    font-weight: 700;
    user-select: none;
  `,
  LoginForm: styled.div`
    display: flex;
    position: absolute;
    top: 340px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
  `,
  InputForm: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
  `,
  InputTitle: styled.p`
    width: 150px;

    text-align: center;
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
    height: 48px;
    min-width: 480px;
    border-radius: 20px;
    border: 5px solid ${color.blue};

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

    color: ${color.textExtraLight};

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

    &:focus {
      outline: none;
    }
  `,
  Button: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    width: 90px;
    height: 90px;
    padding: 20px;

    border: none;
    border-radius: 28px;
    background: ${color.blue};
    cursor: pointer;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    margin: 80px;
  `,
  LoginButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 120px;
    height: 60px;

    border: none;
    border-radius: 20px;

    font-size: 20px;
    color: ${color.white};
    cursor: pointer;
    background-color: ${color.blue};
  `,
};
