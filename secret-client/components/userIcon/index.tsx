import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { ConnectButton } from '@/components/connectButton';
import { useAppSelector } from '@/hooks/stateHooks';
import { CreateNewUserModal } from '@/components/modals/createNewUser';
import { useGetUserData } from '@/hooks/api/useGetUserData';
import Button from '@mui/material/Button';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

//EXTRA TODO
export const UserIcon: React.FC = () => {
  const signer = useAppSelector((state) => state.connector.signer);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement | undefined>(null);
  const [isCreateNewUserOpen, setIsCreateNewUserOpen] = useState<boolean>(false);

  const { data, isSuccess } = useGetUserData();

  const handleModalClose = useCallback(() => {
    setIsCreateNewUserOpen((prev) => !prev);
  }, []);
  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);
  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  if (!signer) {
    return <ConnectButton />;
  }

  if (isSuccess && data === null) {
    return (
      <>
        <Button onClick={handleModalClose}>Create new account</Button>
        <CreateNewUserModal isOpen={isCreateNewUserOpen} handleClose={handleModalClose} />
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
