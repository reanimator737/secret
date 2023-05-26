import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useGetUserByAddressQuery } from '@/store/service';
import { ZERO_ADDRESS } from '@/store/user';
import { Card, CardContent, Grid, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const ProfileByAddress: React.FC = () => {
  const {
    query: { pid },
  } = useRouter();

  const query = useMemo(() => (Array.isArray(pid) ? pid[0] : pid ?? ZERO_ADDRESS), [pid]);

  const { data, isLoading, isSuccess, isError } = useGetUserByAddressQuery(query);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <>Empy(</>;
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
