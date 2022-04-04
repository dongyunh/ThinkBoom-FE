import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { Main } from '@components/layout/Main';
import { useRouter } from 'next/router';
import { DarkModeToggle } from '@components/common/DarkModeToggle';
import { useAppDispatch } from '@redux/hooks';
import { enableDarkMode, enableLightMode } from '@redux/modules/darkMode';
import BGMainLeft from '../public/asset/backgrounds/bg_main_left.png';
import BGDarkMainLeft from '../public/asset/backgrounds/bg_dark_main_left.png';
import BGMainRight from '../public/asset/backgrounds/bg_main_right.png';
import BGDarkMainRight from '../public/asset/backgrounds/bg_dark_main_right.png';
import Image from 'next/image';
import { useThemeEffect } from '@hooks/useThemeEffect';
import { themedPalette } from '@theme/styleTheme';

import { Title, Desc } from '../src/components/common';
import { persistor } from './_app';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = localStorage.getItem('theme');

  const loadTheme = () => {
    if (!theme) return;
    if (theme === 'dark') {
      dispatch(enableDarkMode());
    } else {
      dispatch(enableLightMode());
    }
    document.body.dataset.theme = 'light';
  };

  useEffect(() => {
    persistor.purge();
    loadTheme();
  }, []);

  useThemeEffect();

  return (
    <Main>
      <Grid>
        <DescWrapper>
          <SubDesc>생각이 터지다</SubDesc>
          <MainDesc>아이디어 회의? 이젠 쉽고 빠르게!</MainDesc>
        </DescWrapper>
        <CardWrapper>
          <BGLeft>
            <Image src={theme === 'dark' ? BGDarkMainLeft : BGMainLeft} />
          </BGLeft>
          <Main.Card width={280} height={330} onMouseUp={() => router.push('/randomWord')}>
            <CardContent>
              <Title text="랜덤워드" />
              <Desc text="참신한 주제가 필요하다면?" />
              <Desc text="1인용" />
            </CardContent>
          </Main.Card>
          <Main.Card width={280} height={330} onMouseUp={() => router.push('/brainWriting')}>
            <CardContent>
              <Title text="브레인 라이팅" />
              <Desc text="다양한 의견을 공유하고 싶다면?" />
              <Desc text="8인용" />
            </CardContent>
          </Main.Card>
          <Main.Card width={280} height={330} onMouseUp={() => router.push('/sixHat')}>
            <CardContent>
              <Title text="6가지 생각모자" />
              <Desc text="새로운 관점에서 문제를 바라보고 싶다면?" />
              <Desc text="8인용" />
            </CardContent>
          </Main.Card>
          <BGRight>
            <Image src={theme === 'dark' ? BGDarkMainRight : BGMainRight} />
          </BGRight>
        </CardWrapper>
      </Grid>
    </Main>
  );
};

export default Home;

const Grid = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BGLeft = styled.div`
  position: absolute;
  top: -50px;
  left: -250px;
`;

const BGRight = styled.div`
  position: absolute;
  top: -80px;
  right: -200px;
`;

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const SubDesc = styled.div`
  font-size: 20px;
  color: ${themedPalette.main_text1};
`;

const MainDesc = styled.h1`
  font-size: 40px;
  color: ${themedPalette.main_text1};
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  position: relative;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
