import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { ConnectButton } from '@/components/connectButton';
import { useAppDispatch, useAppSelector } from '@/hooks/stateHooks';
import { CreateNewUserModal } from '@/components/modals/createNewUser';
import { useGetUserData } from '@/hooks/api/useGetUserData';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { CreatePostModal } from '@/components/modals/createPost';
import { disconnect } from '@/store/connector';

//EXTRA TODO
export const UserIcon: React.FC = () => {
  const { signer, provider } = useAppSelector((state) => state.connector);
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement | undefined>(null);
  const [isCreateNewUserOpen, setIsCreateNewUserOpen] = useState<boolean>(false);
  const [isCreateNewPostOpen, setIsCreateNewPostOpen] = useState<boolean>(false);
  const { data: user, isSuccess } = useGetUserData();

  const handleDisconnect = useCallback(() => {
    if (provider) {
      dispatch(disconnect());
    }
  }, [user, provider]);

  const handleModalClose = useCallback(() => {
    setIsCreateNewUserOpen((prev) => !prev);
  }, []);
  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);
  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleOpenCreateNewPost = useCallback(() => {
    setIsCreateNewPostOpen(true);
  }, []);

  const handleCloseCreateNewPost = useCallback(() => {
    setIsCreateNewPostOpen(false);
  }, []);

  if (!signer) {
    return <ConnectButton />;
  }

  if (!user) {
    return (
      <>
        <Button onClick={handleModalClose}>Create new account</Button>
        <CreateNewUserModal isOpen={isCreateNewUserOpen} handleClose={handleModalClose} />
      </>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        {user.address}
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
          <MenuItem
            onClick={() => {
              handleOpenCreateNewPost();
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">Create new post</Typography>
          </MenuItem>

          <Link href={`/profile/${user.id}`}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
          </Link>

          <MenuItem
            onClick={() => {
              handleDisconnect();
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">Log Out</Typography>
          </MenuItem>
        </Menu>
      </Box>

      <CreatePostModal isOpen={isCreateNewPostOpen} handleClose={handleCloseCreateNewPost} />
    </>
  );
};
