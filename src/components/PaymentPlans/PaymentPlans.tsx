import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';

const PlansCard = styled(Paper)(({ theme }) => ({
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  width: '388px',
  height: '500px',
  padding: '44px',
  border: `1px solid ${theme.palette.primary.main}`,
}));

interface IProps {
  cost: string;
  type: string;
  features: string[];
  contained: boolean;
}

const PaymentPlans = ({ cost, type, features, contained }: IProps) => (
  <PlansCard
    variant="outlined"
    sx={{
      bgcolor: contained ? 'primary.main' : 'paper.default',
      color: contained ? 'primary.contrastText' : 'grey.900',
    }}
  >
    <Typography sx={{ fontWeight: '700' }} variant="h3">
      {cost}
      <Typography sx={{ display: 'inline-block' }}>/month</Typography>
    </Typography>
    <Typography sx={{ fontWeight: '700', fontSize: '24px' }}>{type}</Typography>
    <Typography variant="body1" sx={{ mt: '35px' }}>
      <Stack rowGap={0.5}>
        {features.map((feature) => (
          <Stack key={uuidv4()} alignItems="center" direction="row">
            <CheckCircleRoundedIcon
              sx={{
                mr: 2,
              }}
              color={contained ? 'inherit' : 'primary'}
              fontSize="medium"
            />
            <Typography style={{ fontWeight: '700', fontSize: '16px' }}>{feature}</Typography>
          </Stack>
        ))}
      </Stack>
    </Typography>
    <Box sx={{ color: '#fff', mt: 'auto', mx: 'auto' }}>
      <Button
        variant="contained"
        color={contained ? 'inherit' : 'primary'}
        sx={{
          width: '256px',
          fontWeight: '700',
          fontSize: '18px',
          color: contained ? 'grey.900' : 'primary.contrastText',
        }}
      >
        Get Started
      </Button>
    </Box>
  </PlansCard>
);

export default PaymentPlans;
