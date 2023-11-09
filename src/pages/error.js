import styled from 'styled-components';
import { color } from '../utils';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

  return (
    <Style.Container style={{ fontSize: 100 }}>
      <Style.PageTitle>{'존재하지 않는 페이지 입니다.'}</Style.PageTitle>
      <Style.Button onClick={() => navigate('/')}>{'홈으로 이동'}</Style.Button>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 48px;

    width: calc(100vw - 48px);
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;

    background-color: ${color.white};
  `,
  PageTitle: styled.p`
    color: ${color.navy};
    font-size: 48px;
    font-weight: 700;
    user-select: none;
  `,
  Button: styled.button`
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
