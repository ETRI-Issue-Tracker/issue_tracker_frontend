import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @font-face {
	font-family: 'Pretendard';
	font-weight: 900;
	font-display: swap;
	src: local('Pretendard Black'), url('./woff2/Pretendard-Black.woff2') format('woff2')
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 800;
        font-display: swap;
        src: local('Pretendard ExtraBold'), url('./woff2/Pretendard-ExtraBold.woff2') format('woff2')
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 700;
        font-display: swap;
        src: local('Pretendard Bold'), url('./woff2/Pretendard-Bold.woff2') format('woff2')
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 600;
        font-display: swap;
        src: local('Pretendard SemiBold'), url('./woff2/Pretendard-SemiBold.woff2') format('woff2')
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 500;
        font-display: swap;
        src: local('Pretendard Medium'), url('./woff2/Pretendard-Medium.woff2') format('woff2')
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 400;
        font-display: swap;
        src: local('Pretendard Regular'), url('./woff2/Pretendard-Regular.woff2') format('woff2')
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 300;
        font-display: swap;
        src: local('Pretendard Light'), url('./woff2/Pretendard-Light.woff2') format('woff2')
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 200;
        font-display: swap;
        src: local('Pretendard ExtraLight'), url('./woff2/Pretendard-ExtraLight.woff2') format('woff2')
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 100;
        font-display: swap;
        src: local('Pretendard Thin'), url('./woff2/Pretendard-Thin.woff2') format('woff2')
    }
`;
