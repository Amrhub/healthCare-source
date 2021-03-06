import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';

import { BRAND_NAME } from '../../abstracts/common';

import FooterLayout from './FooterLayout';

const ContentPusher = styled('div')<any>(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar sx={{ backgroundColor: '#f4f4f8', color: 'grey.900' }}>
        <Toolbar>
          <Typography>{BRAND_NAME}</Typography>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
            <Button
              startIcon={<PersonOutlineOutlinedIcon />}
              sx={{ color: '#fff' }}
              variant="contained"
              href="/#sign-in-form"
            >
              Sign in
            </Button>
            <Button
              startIcon={<PersonAddOutlinedIcon />}
              sx={{
                color: '#fff',
                display: { xs: 'none', md: 'inline-flex' },
              }}
              variant="contained"
              href="/#sign-up"
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <ContentPusher /> {/* Necessary for the content to be below the AppBar*/}
      {children}
      <FooterLayout />
    </Box>
  );
};

export default GuestLayout;
