import { Sheet } from '@mui/joy';
import { Box, Divider, IconButton} from '@mui/material';
import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

import LinkedInIcon from '@mui/icons-material/LinkedIn'; 
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import '../Css/Style.css'
const Footer = () => {
  return (
    <Sheet
      variant="solid"
      sx={{
        flexGrow: 1,
        p: 2
      }}
    >     

      <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'flex-end', gap: 2 }}>
        <IconButton
          variant="soft"
          size="sm"
        >
          <YouTubeIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton variant="plain">
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton variant="plain">
          <LinkedInIcon />
        </IconButton>

      </Box><Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center',  justifyContent: 'center',gap: 2 }}>
      <p className="footer">
      <span className="bright-color-text">  @copyright developed by ICT ACADEMY  | All
      rights reserved</span>
    </p>

      </Box>
    </Sheet>
  )
}

export default Footer
