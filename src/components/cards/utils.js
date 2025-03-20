import React from 'react';
import { CardMedia, Typography } from '@mui/material';
import { SERVER_URL } from '../../context/globals.js';

// Utility function to render product attributes conditionally
export const renderProductAttribute = (label, value) => {
  return value ? (
    <Typography variant="body2" color="textSecondary">
      {label}: {value}
    </Typography>
  ) : null;
};

// Utility component for rendering CardMedia with error handling
export const CardMediaComponent = ({ alt, img_url }) => {
  const imageUrl = img_url ? `${SERVER_URL}/${img_url}` : '/default-image.png';

  return (
    <CardMedia
      component="img"
      sx={{ width: '100%', height: 200, objectFit: 'contain' }}
      image={imageUrl}
      alt={alt || 'Image'}
    />
  );
};
