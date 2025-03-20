import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Grid } from '@mui/material';
import { SERVER_URL } from '../../context/globals';

const MealCard = ({ meal, onRemove, onUpdate }) => {
  return (
    <Card sx={{ backgroundColor: 'white', boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
      <Grid container>
        {/* Left side - Images */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: 200, objectFit: 'cover' }}
            image={`${SERVER_URL}/${meal.picture_before}`}
            alt="Meal Before"
          />
          <CardMedia
            component="img"
            sx={{ width: '100%', height: 200, objectFit: 'cover', marginTop: '8px' }}
            image={`${SERVER_URL}/${meal.picture_after}`}
            alt="Meal After"
          />
        </Grid>

        {/* Right side - Details */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Meal ID: {meal.id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {meal.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Initial Weight: {meal.weight_before}g
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Final Weight: {meal.weight_after}g
            </Typography>

            {/* Display Products */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Products in the Meal:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {meal.products.map((product, index) => (
                <Chip key={index} label={product} color="primary" variant="outlined" />
              ))}
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MealCard;
