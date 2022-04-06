import axios from 'axios';

const saveResult = (roomId: string | null) => {
  const res = axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/gallery/save/${roomId}`,
  );
  return res;
};

export default saveResult;
