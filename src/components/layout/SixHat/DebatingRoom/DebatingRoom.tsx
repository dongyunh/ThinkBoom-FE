import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout, PrimaryButton } from '../../../common';
import { DebatingChatBox } from '../DebatingChatBox';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { selectSixHat, saveSixHatData } from '@redux/modules/sixHat';
import { useRouter } from 'next/router';

type DebatingRoom = {
  onClick: (arg: string) => void;
};

const DebatingRoom = ({ onClick }: DebatingRoom) => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(selectSixHat);
  const router = useRouter();
  const roomId = window.location.pathname.split('/').pop();

  const handleComplete = async () => {
    await dispatch(saveSixHatData({ roomId }));
    await router.push(`/sixHat/result/${roomId}`);
  };

  return (
    <CenterLayout>
      <>
        <DebatingChatBox onClick={onClick} />
        <Empty />
        {isAdmin && <PrimaryButton text="완료" height={50} width={150} onClick={handleComplete} />}
      </>
    </CenterLayout>
  );
};

const Empty = styled.div`
  height: 10px;
`;

export { DebatingRoom };
