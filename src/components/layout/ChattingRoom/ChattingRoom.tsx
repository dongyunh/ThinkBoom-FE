import React, { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { HeaderBar, Card } from 'components/common';

export type message = {
  nickname: string;
  content: string;
};

const ChattingRoom = () => {
  return (
    <Card width={450} height={600}>
      <>
        <div>안녕! 이건 채팅방이야</div>
        <TextField />
      </>
    </Card>
  );
};

export { ChattingRoom };
