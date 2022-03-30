import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { DarkModeToggle, CountingUser } from '../../common';
import Image from 'next/image';
import Logo from '../../../../public/asset/Logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { selectUserCount } from '@redux/modules/CountUser';
import { sixHatSelector } from '@redux/modules/sixHat';
import { selectPermit, setRoutingModalOpen } from '@redux/modules/permit';

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userCount } = useAppSelector(selectUserCount);
  const { userList: sixHatUserList } = useAppSelector(sixHatSelector); // NOTE : brainWriting도 이런 방식으로 가져와서 유저 리스트를 사용하시면 될 것 같아요!

  const showCpntCheckPathName = () => {
    if (router.pathname.includes('/sixHat/debating/')) {
      return (
        <CountingAndTimer>
          <DarkModeToggle />
          <CountingUser
            totalUser={userCount.totalUser}
            currentUser={userCount.currentUser}
            userList={sixHatUserList}
          />
        </CountingAndTimer>
      );
    }

    if (router.pathname == '/') {
      return <DarkModeToggle />;
    }
  };

  const handleRouting = () => {
    if (router.pathname.includes('/sixHat/debating/')) {
      dispatch(setRoutingModalOpen(true));
    } else {
      router.push('/');
    }
  };

  return (
    <StyledHeaderBar>
      <Image src={Logo} width="300" height="" onClick={handleRouting} />
      {showCpntCheckPathName()}
    </StyledHeaderBar>
  );
};

const StyledHeaderBar = styled.header`
  width: 100vw;
  height: 80px;
  padding: 0px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  cursor: pointer;
  z-index: 99;
`;

const CountingAndTimer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export { HeaderBar };
