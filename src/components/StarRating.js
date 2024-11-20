import React from 'react';
import { View, Text } from 'react-native';

export default function StarRating({rating}) {
  // Function to generate stars based on the rating
  const renderStars = (rating) => {
    const totalStars = 5; // Total number of stars
    let stars = '';

    // Loop to create stars based on rating
    for (let i = 0; i < totalStars; i++) {
      stars += i < rating ? '⭐' : '☆'; // Filled star for rating and empty star for the rest
    }
    return stars;
  };

  return (
    <View>
      <Text style={{ fontSize: 12 }}>
        {renderStars(rating)}
      </Text>
    </View>
  );
}
