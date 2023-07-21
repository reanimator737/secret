import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { UserIcon } from '@/components/userIcon';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

export const NavBar: React.FC = () => {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={'/'}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </Link>

          <Link href={'/shop'}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Shop
            </Typography>
          </Link>

          <UserIcon />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
