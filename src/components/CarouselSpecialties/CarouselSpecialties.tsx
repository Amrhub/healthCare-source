import { Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Carousel from 'react-material-ui-carousel';
import { v4 as uuidv4 } from 'uuid';

import bones from '../../assets/landingPage/categories/bone.png';
import brain from '../../assets/landingPage/categories/brain-nervous-system.png';
import earNoseThroat from '../../assets/landingPage/categories/ear-nose-throat.png';
import teeth from '../../assets/landingPage/categories/teeth.svg.png';

const specialtiesItems = [
  {
    row: [
      {
        name: 'Teeth',
        image: teeth,
      },
      {
        name: 'Bone',
        image: bones,
      },
      {
        name: 'Ear, Nose and Throat',
        image: earNoseThroat,
      },
      {
        name: 'Brain and Nervous',
        image: brain,
      },
    ],
  },
  {
    row: [
      {
        name: 'Brain and Nervous',
        image: brain,
      },
      {
        name: 'Teeth',
        image: teeth,
      },
      {
        name: 'Bone',
        image: bones,
      },
      {
        name: 'Ear, Nose and Throat',
        image: earNoseThroat,
      },
    ],
  },
  {
    row: [
      {
        name: 'Ear, Nose and Throat',
        image: earNoseThroat,
      },
      {
        name: 'Brain and Nervous',
        image: brain,
      },
      {
        name: 'Teeth',
        image: teeth,
      },
      {
        name: 'Bone',
        image: bones,
      },
    ],
  },
  {
    row: [
      {
        name: 'Bone',
        image: bones,
      },
      {
        name: 'Ear, Nose and Throat',
        image: earNoseThroat,
      },
      {
        name: 'Brain and Nervous',
        image: brain,
      },
      {
        name: 'Teeth',
        image: teeth,
      },
    ],
  },
];

const SpecialtiesContainer = styled(Box)`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const CardImageFooter = styled(Box)`
  transition: 300ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const Image = styled('img')`
  backgroundcolor: white;
  height: 100%;
  overflow: hidden;
  opacity: 0.8;
  transition: 300ms;

  &:hover {
    opacity: 1;
  }
`;

const CarouselSpecialties = () => (
  <Carousel animation="slide" >
    {specialtiesItems.map((item) => (
      <Stack direction={'row'} gap={'48px'} key={uuidv4()}>
        {item.row.map(({ image, name }) => (
          <SpecialtiesContainer key={uuidv4()}>
            <Image src={image} alt={name} />
            <CardImageFooter
              sx={{
                position: 'absolute',
                bottom: '0',
                padding: '15px',
                color: 'white',
                width: '100%',
                height: '20%',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
            >
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  fontSize: '24px',
                  fontWeight: '700',
                }}
              >
                {name}
              </Typography>
            </CardImageFooter>
          </SpecialtiesContainer>
        ))}
      </Stack>
    ))}
  </Carousel>
);

export default CarouselSpecialties;
