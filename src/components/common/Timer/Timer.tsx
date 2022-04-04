import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
type TimerProps = {
  seconds: number | null;
};

const Timer = ({ seconds }: TimerProps) => {
  const HOUR = 60 * 60;
  const mm = seconds ? Math.floor((seconds % HOUR) / 60) : 0;
  const ss = seconds ? seconds % 60 : 0;
  const formatTime = (time: number) => (time >= 10 ? time : '0'.concat(time.toString()));

  return (
    <Box>
      <TimerBox>
        <Count>
          {formatTime(mm)}:{formatTime(ss)}
        </Count>
      </TimerBox>
      <Play />
    </Box>
  );
};

const Box = styled.div`
  width: 200px;
  height: 60px;
  border: 5px solid #000000;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #000;
`;

const TimerBox = styled.div`
  width: 70%;
  background-color: #fff;
  border-radius: 12px 0 0 12px;
  display: flex;
  margin: auto;
`;
const Count = styled.div`
  width: 100%;
  color: ${themedPalette.main_text1};
  text-align: center;
  font-size: 30px;
`;
const Play = styled.div`
  width: 10%;
  margin: auto;
  border-color: transparent transparent transparent #fff;
  border-style: solid solid solid solid;
  border-width: 15px 0 15px 30px;
`;

export { Timer };
