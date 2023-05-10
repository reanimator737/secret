import React from 'react';
import { CreateNewUserModal } from '@/components/modals/createNewUser';

const Profile: React.FC = () => {
  /*
  const router = useRouter();
*/
  /*  const [updatePost, result] = useCreateNewUserMutation();
  const data = useGetAllUsersQuery();*/

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ height: '200px', background: 'black' }}>malskfmnasdknfgoadnfgndasofjgnsdjpfhgdnfgkn</div>
      <CreateNewUserModal isOpen={true} handleClose={() => undefined} />
    </div>
  );
};

export default Profile;
