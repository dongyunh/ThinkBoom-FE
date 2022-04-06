import React, { useEffect } from 'react';
import { CenterLayout } from '../../common';
import { useAppDispatch } from 'redux/hooks';
import { getRandomWord } from 'redux/modules/randomWord';
import { SelectWordBox } from '../../layout/RandomWord/SelectWordBox';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectWord = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRandomWord());
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      <CenterLayout>
        <SelectWordBox />
      </CenterLayout>
    </>
  );
};

export { SelectWord };
