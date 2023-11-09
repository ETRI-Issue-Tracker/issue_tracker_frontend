import styled from 'styled-components';
import color from '../utils/color';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../states/userState';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const echo = '연애인 연애설';
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);

  return (
    <Style.Container style={{ fontSize: 200 }}>
      <Style.LogoContainer>
        <Style.LogoImage src={process.env.PUBLIC_URL + '/assets/images/logo.svg'} draggable={false} />
        <Style.LogoText>{'IssueTracker'}</Style.LogoText>
      </Style.LogoContainer>
      <Style.ContentForm>
        <Style.InputForm>
          <Style.InputContainer>
            <Style.Input placeholder={'검색어를 입력해 주세요'} />
          </Style.InputContainer>
          <Style.Button>
            <Style.ButtonImage src={process.env.PUBLIC_URL + '/assets/images/homeSearchButton.svg'} />
          </Style.Button>
        </Style.InputForm>
        <Style.TextContainer>
          <Style.Text>{'현재 동조적 현상 키워드는'}</Style.Text>
          <Style.Text style={{ color: color.blue }}>{'"' + echo + '"'}</Style.Text>
        </Style.TextContainer>
        <Style.MenuForm>
          <Style.MenuContainer onClick={() => navigate('/community')}>
            <Style.MenuButton src={process.env.PUBLIC_URL + '/assets/images/homeCommunityButton.svg'} />
            <Style.MenuTitle>{'커뮤니티'}</Style.MenuTitle>
          </Style.MenuContainer>
          <Style.MenuContainer onClick={() => navigate('/post')}>
            <Style.MenuButton src={process.env.PUBLIC_URL + '/assets/images/homePostButton.svg'} />
            <Style.MenuTitle>{'게시물 작성'}</Style.MenuTitle>
          </Style.MenuContainer>
          {userInfo.uid === 'admin' ? (
            <Style.MenuContainer onClick={() => navigate('/manage?filter=all')}>
              <Style.MenuButton src={process.env.PUBLIC_URL + '/assets/images/homeManageButton.svg'} />
              <Style.MenuTitle>{'게시물 관리'}</Style.MenuTitle>
            </Style.MenuContainer>
          ) : null}
          <Style.MenuContainer onClick={() => navigate('/manage?filter=echo')}>
            <Style.MenuButton src={process.env.PUBLIC_URL + '/assets/images/homeEchoButton.svg'} />
            <Style.MenuTitle>{'동조적 컨텐츠'}</Style.MenuTitle>
          </Style.MenuContainer>
          {userInfo.uid === 'admin' ? (
            <Style.MenuContainer onClick={() => navigate('/manage?filter=block')}>
              <Style.MenuButton src={process.env.PUBLIC_URL + '/assets/images/homeDangerousButton.svg'} />
              <Style.MenuTitle>{'유해 컨텐츠'}</Style.MenuTitle>
            </Style.MenuContainer>
          ) : null}
        </Style.MenuForm>
      </Style.ContentForm>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;

    width: calc(100vw - 48px);
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;

    background-color: ${color.white};
  `,
  LogoContainer: styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 120px;
    gap: 24px;

    width: 400px;
    height: 156px;

    cursor: pointer;
    background-color: transparent;

    margin-bottom: 60px;
  `,
  LogoImage: styled.img`
    width: 120px;
    height: 154px;

    user-select: none;
  `,
  LogoText: styled.p`
    user-select: none;

    color: ${color.black};
    font-size: 56px;
    font-weight: 900;
    font-style: italic;
  `,
  InputForm: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 16px;
    margin-left: 80px;
  `,
  ContentForm: styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    top: 300px;
  `,
  InputContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    width: 40vw;
    height: 80px;
    min-width: 480px;
    border-radius: 20px;
    border: 5px solid ${color.blue};

    background: ${color.white};
  `,
  Input: styled.input`
    width: calc(40vw - 42px);
    height: 70px;
    flex-shrink: 0;

    min-width: 438px;
    padding-left: 8px;

    border: none;
    border-radius: 13px;
    background-color: ${color.white};

    color: ${color.textExtraLight};

    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &:focus {
      outline: none;
    }
  `,
  TextContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    gap: 8px;
  `,
  Text: styled.p`
    text-align: center;
    color: ${color.black};
    font-size: 16px;
    font-weight: 800;
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
  ButtonImage: styled.img`
    width: 36px;
    height: 36px;
  `,
  MenuForm: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    gap: 8px;
  `,
  MenuContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    cursor: pointer;
  `,
  MenuButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    width: 90px;
    height: 90px;
    padding: 20px;

    border: none;
    border-radius: 32px;
    background: ${color.grayLight};
    background-size: 48px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${(props) => 'url(' + props.src + ')'};

    cursor: pointer;
  `,
  MenuTitle: styled.p`
    width: 100px;

    text-align: center;
    color: ${color.text};
    font-size: 14px;
    font-weight: 500;
  `,
};
