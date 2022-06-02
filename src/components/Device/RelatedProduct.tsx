import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { useState } from 'react';

import { ProductType } from '../../pages/Store/RelatedProducts';

const RelatedProduct = ({ product }: { product: ProductType }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <Stack sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1, boxShadow: 4 }}>
      <img src={product.img} alt={`${product.name} image`} style={{ width: '200px', height: '150px' }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body1" color="initial" sx={{ fontWeight: '700' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color={product.inStock ? 'secondary' : 'error'}>
            {product.inStock ? 'In stock' : 'Out of stock'}
          </Typography>
        </Box>
        <Typography color="initial">
          {product.price * quantity} L.E
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
        <IconButton onClick={() => setQuantity(prev => prev - 1)} disabled={quantity <= 1}>
          <RemoveCircleIcon />
        </IconButton>
        {quantity}
        <IconButton onClick={() => setQuantity(prev => prev + 1)}>
          <AddCircleIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default RelatedProduct