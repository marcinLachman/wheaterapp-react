import HomePage from './components/HomePage';

import { Container } from '@mui/material';

const App = () => {

  return (
    <Container maxWidth="md" sx={{ 
      bgcolor: '#cfe8fc',
      padding: '2rem'
      }}>
      <HomePage />
    </Container>
  );
}

export default App;
