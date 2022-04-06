import React, { useState } from 'react';
import { Card } from '../Card';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sixHatSelector } from 'redux/modules/sixHat';
import { getSubjectRW } from 'redux/modules/randomWord/actions';
import BGSubjectLeft from '../../../../public/asset/backgrounds/bg_subject_left.png';
import BGSubjectRight from '../../../../public/asset/backgrounds/bg_subject_right.png';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import { brainWritingSelector } from '../../../redux/modules/brainWriting/selectors';

const useStyles = makeStyles({
  arrow: {
    color: '#EEEEEE',
  },
});

type SubjectTextFieldProps = {
  type?: 'randomWord' | 'sixHat' | 'brainWriting';
  onChange?: (e: string) => void;
  onClick?: (arg?: string) => void;
  isAdmin?: boolean;
};

type StyledProps = {
  disabled: boolean;
};

const SubjectTextField = ({ type, onChange, onClick, isAdmin = true }: SubjectTextFieldProps) => {
  const dispatch = useAppDispatch();
  const { subject: SHEnteredSubject } = useAppSelector(sixHatSelector);
  const { BWsubject: BWEnteredSubject } = useAppSelector(brainWritingSelector);
  const [subject, setSubject] = useState<string>('');
  const classes = useStyles();

  const handleGetSubject = () => {
    if (type == 'randomWord') {
      dispatch(getSubjectRW(subject));
      if (!onClick) return;
      onClick();
    }

    if (type == 'sixHat') {
      if (!onClick) return;
      onClick(subject);
    }

    if (type == 'brainWriting') {
      if (!onClick) return;
      onClick(subject);
    }
  };

  return (
    <Containger>
      <BGLeft>
        <Image src={BGSubjectLeft} alt="background_image" />
      </BGLeft>
      <Card width={600} height={124}>
        <TextFieldBox disabled={!isAdmin}>
          <TextField
            maxLength={28}
            defaultValue={type === 'sixHat' ? SHEnteredSubject : BWEnteredSubject}
            disabled={!isAdmin}
            onChange={e => setSubject(e.target.value)}
          />
          {isAdmin && (
            <Button onClick={handleGetSubject}>
              <ArrowIcon fontSize="large" className={classes.arrow} />
            </Button>
          )}
        </TextFieldBox>
      </Card>
      <BGRight>
        <Image src={BGSubjectRight} alt="background_image" />
      </BGRight>
    </Containger>
  );
};

const Containger = styled.div`
  position: relative;
`;

const BGLeft = styled.div`
  position: absolute;
  top: -180px;
  left: -320px;
`;

const BGRight = styled.div`
  position: absolute;
  top: -150px;
  right: -380px;
`;

const TextFieldBox = styled.div<StyledProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0px 130px 0px 60px;
  cursor: not-allowed;
  ${props => props.disabled && `background-color: ${themedPalette.cute_button_disabled}`};
`;

const TextField = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 24px;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${themedPalette.main_text1};

  :disabled {
    background-color: ${themedPalette.cute_button_disabled};
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  background-color: ${themedPalette.button_1};
  height: 100%;
  width: 120px;
  box-sizing: border-box;
  border: none;
  position: absolute;
  color: ${themedPalette.main_text2};
  border-radius: 18px 12px 12px 18px;
  right: 0;
  cursor: pointer;
  :disabled {
    background-color: ${themedPalette.subject_button_disabled};
    cursor: not-allowed;
  }
`;

const ArrowIcon = styled(ArrowForwardIcon)`
  :hover {
    transform: translate(10px);
  }
`;

export { SubjectTextField };
