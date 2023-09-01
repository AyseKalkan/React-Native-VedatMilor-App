import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import veri from '../../veri.json';

export default function Sehirler() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleCityPress = (city) => {
    navigation.navigate('Restoranlar', { city });
  };

  const filteredCities = veri.filter((sehir) =>
    sehir.sehir.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ImageBackground
    source={require('../../assets/SehirlerBackground.jpg')} 
    style={styles.container}
    >
    <ScrollView >
      
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Şehir ara..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {filteredCities.length === 0 ? (
        <Text style={styles.noResultText}>Eşleşen şehir bulunamadı.</Text>
      ) : (
        filteredCities.map((sehir) => (
          <TouchableOpacity
          key={sehir.sehir}
          style={styles.sehirButton}
          onPress={() => handleCityPress(sehir)}
        >
          <View style={styles.sehirContainer}>
          <FontAwesome name="map-marker-alt" size={20} color="#ba1313" style={styles.locationIcon} />
            <Text style={styles.sehirText}> {sehir.sehir}</Text>

          </View>
        </TouchableOpacity>
        ))
      )}
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#E1E1E1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sehirButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sehirText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333'
  },
  noResultText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#ffffff'
  },
  
  sehirContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginLeft: 5,
  },
});
