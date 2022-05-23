import { BackToTop } from 'components-extra';
import styled from 'styled-components';

export default {
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
        main: '#23B59C',
        constrastText: '#fff',
    },
  },
};

export const CustomBackToTop = styled(BackToTop)`
  svg {
    fill: #fff;
    }
`;
