import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const FlexBoxRow = styled(Box)((props) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'

}));

export const FlexBoxColumn = styled(Box)((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
   
}));
