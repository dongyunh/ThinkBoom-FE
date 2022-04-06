import React, { ReactChild, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { themedPalette } from 'theme/styleTheme';

type S_ModalProps = {
  children: ReactChild;
};

function S_VoteModal({ children }: S_ModalProps) {
  const [container] = useState(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'NicknameModal');
    return modalRoot;
  });

  useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (!root) {
      return;
    }
    root.appendChild(container);
    return () => {
      root.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <ModalWrapper>{children}</ModalWrapper>
    </>,
    container,
  );
}

const ModalOverlay = styled.div`
  background: ${themedPalette.overlay};
  opacity: 50%;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 998;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 18px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

type ModalProps = {
  children: ReactChild;
};

function VoteModal({ children }: ModalProps) {
  const [container] = useState(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'NicknameModal');
    return modalRoot;
  });

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

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <ModalWrapper>{children}</ModalWrapper>
    </>,
    container,
  );
}

export { S_VoteModal, VoteModal };
