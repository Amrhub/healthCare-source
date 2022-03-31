import { Box, Container } from '@mui/material';

const ContainerBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Container
        sx={{
          bgcolor: 'background.paper',
          maxWidth: { md: '1032px' },
          height: '90%',
          my: 'auto',
          boxShadow: 4,
          borderRadius: '10px',
          color: 'grey.900',
          p: '38px 60px',
        }}
        fixed
        disableGutters
      >
        {children}
      </Container>
    </Box>
  );
};

export default ContainerBox;
