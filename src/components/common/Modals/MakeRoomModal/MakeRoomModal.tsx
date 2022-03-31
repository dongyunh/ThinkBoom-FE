import React, { useState } from 'react';
import { Modal } from '../Modal';
import { TextField, Dropdown, Button } from '../../../common';
import styled from 'styled-components';
import v8n from 'v8n';
import { memberCount, timerOptions } from '../../../../mock/makeRoomData';
import { themedPalette } from '../../../../theme';
import { ValidationType, ErrorTextType } from '../types';

type MakeRoomModalProps = {
  onClickDropdown1?: () => void;
  onClickDropdown2?: () => void;
  onClickButton: (title: string | null, number: number, time: number) => void;
};

const MakeRoomModal = ({
  onClickDropdown1,
  onClickDropdown2,
  onClickButton,
}: MakeRoomModalProps) => {
  const [title, setTitle] = useState<string | null>(null);
  const [number, setNumber] = useState<number>(1);
  const [timer, setTimer] = useState<number>(1);
  const [isError, setIsError] = useState<ValidationType>({ isLengthOver: false });

  const legnthValidation = v8n().not.null().string().length(2, 10);
  const [disabled, setDisabled] = useState(!legnthValidation.test(title));

  const checkValidation = (_title: string) => {
    const specialCharCheck = new RegExp(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g).test(
      _title,
    );
    const emptyCheck = new RegExp(/\s/g).test(_title);
    setTitle(_title);
    setIsError({
      isLengthOver: !legnthValidation.test(_title),
      isSpecialChar: specialCharCheck || emptyCheck,
    });
    setDisabled(!legnthValidation.test(_title) || specialCharCheck || emptyCheck);
  };

  const handleOnClickButton = (_title: string | null, _number: number, _time: number) => {
    if (!onClickButton) return;
    onClickButton(_title, _number, _time);
  };

  const TitleValidationText: ErrorTextType = {
    lengthErrorText: '방 제목은 2~10자로 이내로 설정해주세요',
    specialCharErrorText: '특수문자 및 띄어쓰기는 사용하실 수 없습니다.',
  };

  return (
    <Modal>
      <MakeRoomContainer>
        <Title>방 개설하기</Title>
        <SubText>아이디어 회의, 이젠 쉽게하세요!</SubText>
        <TextField
          label="방 제목"
          errorText={TitleValidationText}
          hintText="제목을 입력해주세요"
          isError={isError}
          onChange={checkValidation}
        />
        <DropDownWrapper>
          <Dropdown options={memberCount} onClick={setNumber} />
          <Dropdown options={timerOptions} onClick={setTimer} />
        </DropDownWrapper>
        <Button
          text="개설하기"
          onClick={() => handleOnClickButton(title, number, timer)}
          disabled={disabled}
        />
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
  background-color: ${themedPalette.bg_page3};
  border-radius: 18px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding-bottom: 22px;
  color: ${themedPalette.main_text1};
`;

const SubText = styled.p`
  text-align: center;
  margin: 0;
  padding-bottom: 46px;
  color: ${themedPalette.main_text1};
`;

const DropDownWrapper = styled.div`
  padding: 16px 0px;
  display: grid;
  width: 100%;
  box-sizing: border-box;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export { MakeRoomModal };

/**
 * TODO : 1.모든 요소 입력 안되었을 때, 버튼 diabled 처리하기
 */
