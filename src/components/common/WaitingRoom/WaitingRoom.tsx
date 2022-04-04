import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useAppSelector } from '../../../redux/hooks';
import { sixHatSelector } from '../../../redux/modules/sixHat';
import {
  Title,
  PrimaryButton,
  SubjectTextField,
  HeaderBar,
  CountingUser,
} from '@components/common';
import { brainWritingSelector } from '@redux/modules/brainWriting';
import { selectUserCount } from '@redux/modules/CountUser';
import { useRouter } from 'next/router';

type WaitingRoomProps = {
  onClickSubmit?: (arg?: string) => void;
  onClickComplete?: () => void;
  onChange?: () => void;
};

const WaitingRoom = ({ onClickSubmit, onClickComplete, onChange }: WaitingRoomProps) => {
  const { isAdmin: SHIsAdmin, subject: SHSubject } = useAppSelector(sixHatSelector);
  const { isAdmin: BWIsAdmin, BWsubject } = useAppSelector(brainWritingSelector);
  const { userCount } = useAppSelector(selectUserCount);
  const router = useRouter();
  const currentService = router.pathname.split('/')[1];

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

  const checkIsDisabled = () => {
    if (currentService === 'brainWriting') {
      return !(BWsubject && BWIsAdmin && userCount.totalUser == userCount.currentUser);
    } else if (currentService === 'sixHat') {
      return !(SHIsAdmin && SHSubject);
    }
  };

  return (
    <Grid>
      <Empty />
      <TextFieldWrapper>
        <Title text="회의 주제" />
        <SubjectTextField
          isAdmin={currentService === 'sixHat' ? SHIsAdmin : BWIsAdmin}
          type={currentService === 'sixHat' ? 'sixHat' : 'brainWriting'}
          onChange={handleOnChange}
          onClick={handleOnclickSubmit}
        />
      </TextFieldWrapper>
      <PrimaryButton text="완료" onClick={handleOnClickComplete} disabled={checkIsDisabled()} />
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

const Empty = styled.div``;

export { WaitingRoom };
