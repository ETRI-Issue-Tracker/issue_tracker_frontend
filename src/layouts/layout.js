import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/header';

export default function Layout() {
  return (
    <Style.Container>
      <Header />
      <Outlet />
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    justify-content: center;
    align-items: center;
  `,
};
