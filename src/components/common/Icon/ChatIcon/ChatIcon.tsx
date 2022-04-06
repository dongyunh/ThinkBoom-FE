import React from 'react';
import Image from 'next/image';
import IC_Chat from '../../../../../public/asset/IC_chat.png';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setIsMessageArrived } from 'redux/modules/permit';
import { selectPermit } from 'redux/modules/permit';

type ChatIconProps = {
  isChatOpen: boolean;
};

const ChatIcon = ({ isChatOpen }: ChatIconProps) => {
  const dispatch = useAppDispatch();
  const { isMessageArrived } = useAppSelector(selectPermit);
  return (
    <IconWrapper>
      {isMessageArrived && !isChatOpen && <RedDot />}
      <Image src={IC_Chat} width={50} height={50} />
    </IconWrapper>
  );
};

const IconWrapper = styled.div`
  position: relative;
`;

const RedDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 10;
  top: -8px;
  right: -3px;
`;

export { ChatIcon };
