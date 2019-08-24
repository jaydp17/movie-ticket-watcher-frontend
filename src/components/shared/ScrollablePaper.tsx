import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const ScrollablePaper = styled(Paper)`
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default ScrollablePaper;
