import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TextField, Button } from '../../../common';
import styled from 'styled-components';
import v8n from 'v8n';
import { useAppSelector } from '@redux/hooks';
import { selectSixHat } from '@redux/modules/sixHat';
import { ValidationType, ErrorTextType } from '../types';

type NicknameModalProps = {
  title: string;
  onClick: (arg: any) => void;
};

const NicknameModal = ({ title, onClick }: NicknameModalProps) => {
  const { userList } = useAppSelector(selectSixHat);
  const [nickname, setNickname] = useState<string>();
  const [isError, setIsError] = useState<ValidationType>({
    isLengthOver: false,
    isDuplicated: false,
  });

  const lengthValidation = v8n().string().length(2, 6);

  const checkValidation = (_nickname: string) => {
    const isThereNickname = userList.map(user => user.nickname).includes(_nickname);
    setNickname(_nickname);
    setIsError({
      isLengthOver: !lengthValidation.test(_nickname),
      isDuplicated: isThereNickname,
    });
  };

  const handleOnClick = () => {
    if (!onClick) return;
    onClick(nickname);
  };

  const validationText: ErrorTextType = {
    lengthErrorText: '닉네임은 2~6자 이내로 설정해주세요',
    duplicatedErrorText: '다른 팀원이 사용중인 닉네임입니다.',
  };

  return (
    <Modal>
      <MakeRoomContainer>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <TextFieldWrapper>
          <TextField
            label="닉네임"
            errorText={validationText}
            hintText="닉네임을 입력해주세요 (2~6자)"
            isError={isError}
            onChange={checkValidation}
          />
        </TextFieldWrapper>
        <Button text="입력하기" onClick={handleOnClick} />
      </MakeRoomContainer>
    </Modal>
  );
};

const MakeRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 38px;
  box-sizing: border-box;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding-bottom: 22px;
`;

const TitleWrapper = styled.div`
  padding-bottom: 70px;
`;

const TextFieldWrapper = styled.div`
  width: 100%;
  padding-bottom: 16px;
`;

export { NicknameModal };
