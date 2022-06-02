import { Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import PaymentPlans from '../../components/PaymentPlans/PaymentPlans';

export const plans = [
  {
    cost: 'Free',
    type: 'Basic',
    features: [
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
    ],
    contained: false,
  },
  {
    cost: '$30',
    type: 'Standard',
    features: [
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
    ],
    contained: true,
  },
  {
    cost: '$50',
    type: 'Premium',
    features: [
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
    ],
    contained: false,
  },
];

const Memberships = () => {
  return (
    <Stack columnGap={11.25} direction="row" sx={{ height: '100%' }} justifyContent="center" alignItems="center">
      {plans.map(({ cost, type, features, contained }) => (
        <PaymentPlans
          cost={cost}
          type={type}
          features={features}
          contained={contained}
          key={uuidv4()}
        />
      ))}
    </Stack>
  )
}

export default Memberships