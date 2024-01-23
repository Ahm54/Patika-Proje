import React from 'react';
import { Typography } from '@mui/material';

function Header() {
  return (
    <div>
      <Typography variant='h1' sx={{textAlign:'center', color:'rgba(175, 47, 47, 0.15)'}}>todos</Typography>
    </div>
  )
}

export default React.memo(Header);
