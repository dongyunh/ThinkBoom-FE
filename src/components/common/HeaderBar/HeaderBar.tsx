import React from 'react';
import styled from 'styled-components';
import { DarkModeToggle, CountingUser, GalleryIcon } from '../../common';
import Image from 'next/image';
import Logo from '../../../../public/asset/Logo.png';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { selectUserCount } from '@redux/modules/CountUser';
import { sixHatSelector } from '@redux/modules/sixHat';
import { brainWritingSelector } from '@redux/modules/brainWriting';
import { selectPermit, setRoutingModalOpen } from '@redux/modules/permit';

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userCount } = useAppSelector(selectUserCount);
  const { userList: sixHatUserList } = useAppSelector(sixHatSelector);

  const { BWUserList: BrainWritingUserList } = useAppSelector(brainWritingSelector); //

  const showCpntCheckPathName = () => {
    if (router.pathname.includes('/brainWriting/ideate/')) {
      return (
        <CountingAndTimer>
          {/* <DarkModeToggle /> */}
          <CountingUser
            totalUser={userCount.totalUser}
            currentUser={userCount.currentUser}
            userList={BrainWritingUserList}
          />
        </CountingAndTimer>
      );
    }

    if (router.pathname.includes('/sixHat/debating/')) {
      return (
        <CountingAndTimer>
          {/* <DarkModeToggle /> */}
          <CountingUser
            totalUser={userCount.totalUser}
            currentUser={userCount.currentUser}
            userList={sixHatUserList}
          />
        </CountingAndTimer>
      );
    }

    if (router.pathname == '/') {
      return (
        <Wrapper>
          <DarkModeToggle />
          <GalleryIcon />
        </Wrapper>
      );
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export { HeaderBar };
