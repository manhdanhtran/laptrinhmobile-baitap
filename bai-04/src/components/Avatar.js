import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Avatar = ({ uri, size = 50, style }) => {
  const [error, setError] = useState(false);

  return (
    <View style={[
      styles.container, 
      { width: size, height: size, borderRadius: size / 2 },
      style
    ]}>
      {!uri || error ? (
        // Gray placeholder circle if load fails or no URI
        <View style={[styles.placeholder, { borderRadius: size / 2 }]} />
      ) : (
        <Image 
          source={{ uri }} 
          style={{ width: size, height: size, borderRadius: size / 2 }}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#999',
  }
});

export default Avatar;
