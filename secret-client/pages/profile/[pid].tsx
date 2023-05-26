import React from 'react';
import { useRouter } from 'next/router';

const Profile: React.FC = () => {
  const { query } = useRouter();
  console.log('loaded');
  console.log(query);
  return (
    <div style={{ height: '100vh' }}>
      <div style={{ height: '200px', background: 'black' }}>malskfmnasdknfgoadnfgndasofjgnsdjpfhgdnfgkn</div>
    </div>
  );
};

export default Profile;
