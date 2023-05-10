import React from 'react';
import { useSign } from '@/hooks/useSign';

const Home: React.FC = () => {
  const obj = useSign();
  console.log(obj);
  return (
    <div style={{ color: 'black', paddingTop: '200px', gap: '10px', display: 'flex', flexDirection: 'column' }}>
      <div>hasError</div>
      <div>errorMsg {obj.errorMsg}</div>
      <div>isLoading {obj.isLoading}</div>
      <div>signMsg {obj.signMsg}</div>
    </div>
  );
};

export default Home;
