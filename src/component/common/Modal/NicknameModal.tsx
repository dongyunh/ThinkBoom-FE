import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import v8n from 'v8n';

type NicknameModalProps = {
  title: string;
  inviteMember: string;
  onClick?: (arg: any) => void;
};

function NicknameModal({ title, inviteMember, onClick }: NicknameModalProps) {
  const [container] = useState(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'NicknameModal');
    return modalRoot;
  });
  const [nickname, setNickname] = useState<string>();
  const [isError, setIsError] = useState<boolean>();

  useLayoutEffect(() => {
    const root = document.getElementById('modal_root');
    if (!root) {
      return;
    }
    root.appendChild(container);
    return () => {
      root.removeChild(container);
    };
  }, []);

  const handleOnClick = () => {
    if (!onClick) return;
    onClick(nickname);
  };

  const validation = v8n().string().length(2, 6);

  const checkValidation = (_nickname: string) => {
    setNickname(_nickname);
    setIsError(!validation.test(_nickname));
  };

  return ReactDOM.createPortal(
    <>
      <S_ModalOverlay />
      <S_ModalWrapper>
        <h1>{title}</h1>
        <h3>{inviteMember}님이 초대하셨습니다.</h3>
        <TextField error={isError} onChange={e => checkValidation(e.target.value)} />
        {isError && <ErrorMessage>닉네임은 2~6자 로 설정해주세요</ErrorMessage>}
        <Button onClick={handleOnClick}>닉네임 설정하기</Button>
      </S_ModalWrapper>
    </>,
    container,
  );
}

const S_ModalOverlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`;

const S_ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  min-width: 480px;
  max-width: 560px;
  z-index: 99;
`;

const ErrorWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const ErrorMessage = styled.sub`
  display: block;
  text-align: left;
  padding-top: 6px;
  font-size: 12px;
  color: red;
`;

export { NicknameModal };