import { createAction } from '@reduxjs/toolkit';

const prefix = 'permit';

export const setRoutingModalOpen = createAction<boolean>(`${prefix}/SET_ROUTING_MODAL_OPEN`);
export const setIsMessageArrived = createAction<boolean>(`${prefix}/SET_IS_MESSAGE_ARRIVED`);
