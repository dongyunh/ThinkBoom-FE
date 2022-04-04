import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../redux/hooks';
import { brainWritingSelector } from '@redux/modules/brainWriting';
import { Title, PrimaryButton, HeaderBar, CountingUser } from '@components/common';
import { BWSubjectTextField } from '../BWSubjectTextField';
type BWWaitingRoomProps = {
  onClickSubmit?: (arg?: string) => void;
  onClickComplete?: () => void;
  onChange?: () => void;
};

const BWWaitingRoom = ({ onClickSubmit, onClickComplete, onChange }: BWWaitingRoomProps) => {
  const { BWisAdmin, BWsubject, BWUserCount } = useAppSelector(brainWritingSelector);
  const handleOnclickSubmit = (arg?: string) => {
    if (!onClickSubmit) return;
    onClickSubmit(arg);
  };

  const handleOnClickComplete = () => {
    if (!onClickComplete) return;
    onClickComplete();
  };

  const handleOnChange = () => {
    if (!onChange) return;
    onChange();
  };

  return (
    <Grid>
      <Empty />
      <TextFieldWrapper>
        <Title text="회의 주제" />
        <BWSubjectTextField
          BWisAdmin={BWisAdmin}
          type="brainWriting"
          onChange={handleOnChange}
          onClick={handleOnclickSubmit}
        />
      </TextFieldWrapper>
      <PrimaryButton
        text="완료"
        onClick={handleOnClickComplete}
        disabled={!(BWsubject && BWisAdmin && BWUserCount.totalUser == BWUserCount.currentUser)}
      />
      <BackGroundImage />
    </Grid>
  );
};

const Grid = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0px;
  position: relative;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const BackGroundImage = styled.div`
  width: 110vw;
  height: 100vh;
  background-image: url('/asset/subject_background.png');
  background-size: cover;
  position: absolute;
  z-index: -10;
  bottom: 110px;
`;

const Empty = styled.div``;

export { BWWaitingRoom };
