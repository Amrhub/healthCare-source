import { Stack } from '@mui/material';
import { useState } from 'react';

import ecgElectrodesImg from '../../assets/devices/ecg_electrodes.svg';
import ecgPadsImg from '../../assets/devices/ecg_pads.svg';
import RelatedProduct from '../../components/Device/RelatedProduct';

const products = [
  {
    id: 1,
    name: 'ECG Pads',
    img: ecgPadsImg,
    price: 60,
    inStock: true,
  },
  {
    id: 2,
    name: 'ECG Electrodes',
    img: ecgElectrodesImg,
    price: 75,
    inStock: false,
  }
]

export type ProductType = typeof products[0];



const RelatedProducts = () => {
  const [padsQuantity, setPadsQuantity] = useState(1);
  const [electrodesQuantity, setElectrodesQuantity] = useState(1);

  return (
    <Stack direction="row" spacing={3}>
      {products.map(product => (
        <RelatedProduct key={product.id} product={product} />
      ))}
    </Stack>
  )
}

export default RelatedProducts