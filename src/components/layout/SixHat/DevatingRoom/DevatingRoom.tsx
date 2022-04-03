import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout, PrimaryButton } from '../../../common';
import { DevatingChatBox } from '../DevatingChatBox';
import { useAppSelector } from '@redux/hooks';
import { selectSixHat } from '@redux/modules/sixHat';

type DevatingRoom = {
  onClick: (arg: string) => void;
};

const DevatingRoom = ({ onClick }: DevatingRoom) => {
  const { isAdmin } = useAppSelector(selectSixHat);

  return (
    <CenterLayout>
      <>
        <DevatingChatBox onClick={onClick} />
        <Empty />
        {isAdmin && <PrimaryButton text="완료" height={50} width={150} />}
      </>
    </CenterLayout>
  );
};

const Empty = styled.div`
  height: 10px;
`;

export { DevatingRoom };
