import styled from 'styled-components';
import color from '../../utils/color';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../states/userState';
import { styledAlert } from '../../utils';

export default function Header() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const logoutHandler = () => {
    setUserInfo({});
    styledAlert('로그아웃 되었습니다.', () => navigate('/'));
  };

  const OnUserButton = () => {
    return (
      <Style.ButtonContainer>
        <Style.UserNickname>{'[ ' + userInfo.nickname + ' ]'}</Style.UserNickname>
        <Style.LoginButton onClick={() => logoutHandler()}>{'로그아웃'}</Style.LoginButton>
      </Style.ButtonContainer>
    );
  };

  const OffUserButton = () => {
    return (
      <Style.ButtonContainer>
        <Style.LoginButton onClick={() => navigate('/login')}>{'로그인'}</Style.LoginButton>
        <Style.JoinButton onClick={() => navigate('/join')}>{'회원가입'}</Style.JoinButton>
      </Style.ButtonContainer>
    );
  };

  return (
    <Style.Container>
      <Style.LogoContainer onClick={() => navigate('/')}>
        <Style.LogoImage src={process.env.PUBLIC_URL + '/assets/images/logo.svg'} draggable={false} />
        <Style.LogoText>{'IssueTracker'}</Style.LogoText>
      </Style.LogoContainer>
      {userInfo.uid ? OnUserButton() : OffUserButton()}
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;

    width: calc(100vw - 32px);
    height: 78px;
    padding-left: 16px;
    padding-right: 16px;

    border-bottom: 2px solid ${color.grayLight};
    background-color: ${color.white};
  `,
  LogoContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    width: 200px;
    height: 78px;

    cursor: pointer;
    background-color: transparent;
  `,

  LogoImage: styled.img`
    width: 48px;
    height: 64px;
  `,
  LogoText: styled.p`
    user-select: none;

    color: ${color.black};
    font-size: 20px;
    font-weight: 900;
    font-style: italic;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  `,
  LoginButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 96px;
    height: 40px;

    font-weight: 500;
    border: none;
    border-radius: 20px;
    color: ${color.white};
    cursor: pointer;
    background-color: ${color.blue};
  `,
  JoinButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 96px;
    height: 40px;

    border: 2px solid ${color.blue};
    border-radius: 20px;

    font-weight: 500;
    color: ${color.blue};
    cursor: pointer;
    background-color: ${color.white};
  `,
  UserNickname: styled.p`
    height: 78px;

    user-select: none;
    color: ${color.black};
    line-height: 72px;
    font-size: 18px;
    font-weight: 500;
  `,
};
