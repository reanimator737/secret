import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useGetUserByAddressQuery } from '@/store/service';
import { ZERO_ADDRESS } from '@/store/connector';
import { Card, CardContent, Grid, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { CreatePostModal } from '@/components/modals/createPost';
import { useAppSelector } from '@/hooks/stateHooks';

const ProfileByAddress: React.FC = () => {
  const {
    query: { pid },
  } = useRouter();
  const { provider, signer } = useAppSelector((state) => state.connector);
  const query = useMemo(() => (Array.isArray(pid) ? pid[0] : pid ?? ZERO_ADDRESS), [pid]);

  const { data, isLoading, isSuccess, isError } = useGetUserByAddressQuery(query);

  /*  //TODO REMOVE
  useEffect(() => {
    if (signer) {
      const shop = new ethers.Contract(
        '0x985Ff17a7cCd5902650C0Aff8Fd6D2Ad3d5ecd1a',
        secret20Shop.abi,
        signer,
      ) as unknown as Secret20Shop;

      shop.testTakeAll().then(console.log);
    }
  }, [provider]);*/

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (signer) {
    return <CreatePostModal handleClose={() => undefined} isOpen={true} />;
  }

  if (!data) {
    return <>Loading</>;
  }

  return (
    <Card>
      <CardContent>
        <TextField
          id="address"
          label="Wallet"
          variant="outlined"
          required
          fullWidth
          margin="dense"
          value={data.address}
        />
        <TextField
          id="nickName"
          label="Display name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={data.nickName}
        />
        <TextField
          id="description"
          label="About you"
          variant="outlined"
          fullWidth
          multiline
          margin="dense"
          value={data.description}
        />

        <Grid container spacing={2} alignItems="center" marginTop={1}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src={'http://localhost:8080/public/uploads/avatar-1683979436919.png'}
              sx={{ width: 80, height: 80 }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" component="label">
              Upload avatar
              <input id="avatar" hidden accept="image/*" multiple type="file" />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileByAddress;
