import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { StyledProvider, Footer } from 'components-extra';

import logo from '../../assets/landingPage/Logo.png';

import myTheme, { CustomBackToTop } from './extraComponentsTheme';

const FooterLayout = () => (
  <StyledProvider theme={myTheme}>
    <Footer>
      <Footer.Column isInline>
        <Footer.Item>
          <Box
            component="img"
            sx={{
              height: '61px',
              width: '317px',
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="logo"
            src={logo}
          />
        </Footer.Item>
        <Footer.Item href="#">
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: '700' }}>
            About Us
          </Typography>
        </Footer.Item>
        <Footer.Item href="#">
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: '700' }}>
            Our Team
          </Typography>
        </Footer.Item>
        <Footer.Item href="#">
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: '700' }}>
            Membership
          </Typography>
        </Footer.Item>
        <Footer.Item href="#">
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: '700' }}>
            Specialties
          </Typography>
        </Footer.Item>
        <Footer.Item href="#">
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: '700' }}>
            Help
          </Typography>
        </Footer.Item>
      </Footer.Column>
    </Footer>
    <CustomBackToTop color="secondary" />
  </StyledProvider>
);

export default FooterLayout;
