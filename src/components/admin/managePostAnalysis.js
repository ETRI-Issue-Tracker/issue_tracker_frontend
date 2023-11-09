import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../states/userState';
import { keywordListState, postListState } from '../../states/postState';
import { useEffect, useState } from 'react';
import { color, formatDate, styledAlert } from '../../utils';
import postAPI from '../../apis/postAPI';
import ReactWordcloud from 'react-wordcloud';

export default function ManagePostAnalysis() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const infoList = ['번호', '제목', '생성 시각', '상태', '삭제'];
  const [keywordList, setKeywordList] = useRecoilState(keywordListState);
  const [currentPagePostList, setCurrentPagePostList] = useState([]);
  const [page, setPage] = useState(1);

  const options = {
    rotations: 2,
    rotationAngles: [0],
  };

  useEffect(() => {
    postAPI
      .postGetKeyword()
      .then((res) =>
        setKeywordList(
          res.data.map((keyword) => {
            return {
              text: keyword.word,
              value: keyword.count,
            };
          }),
        ),
      )
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    setCurrentPagePostList(keywordList.slice((page - 1) * 10, page * 10));
  }, [keywordList]);

  return (
    <Style.AdminForm>
      <ReactWordcloud words={keywordList} size={[200, 200]} options={options} />
    </Style.AdminForm>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    /* gap: 32px; */

    width: calc(100vw - 48px);
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;

    background-color: ${color.white};
  `,
  AdminForm: styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    gap: 32px;

    width: 40%;
    height: 50%;
    border-radius: 20px;
    background-color: ${color.grayLight};
  `,
  CommunityContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    gap: 8px;

    height: 448px;
    background-color: ${color.white};
  `,
  Table: styled.table`
    border-collapse: collapse;
    width: 78vw;
    min-width: 800px;
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
    position: relative;
    border: 1px solid ${color.blue};
    color: ${color.textDeep};
    text-align: center;
    height: 24px;
    padding: 8px;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    margin-left: 40px;
  `,
  FillButton: styled.button`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: calc(50% - 12px);
    left: calc(50% - 36px);

    width: 72px;
    height: 24px;

    font-weight: 500;
    border: none;
    border-radius: 20px;
    color: ${color.white};
    cursor: pointer;
    background-color: ${color.blueLight};

    &:hover {
      background-color: ${color.white};
      border: 1.5px solid ${color.blue};
      color: ${color.blue};
    }
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
