import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground  } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';


export default function Restoranlar() {
  const route = useRoute();
  const city = route.params.city;
  const navigation = useNavigation();

  const handleRestoranPress = (restoran) => {
    navigation.navigate('RestoranDetay', { restoran });
  };

  const handleAnasayfaPress = () => {
    navigation.goBack(); 
  };

  return (
   <ImageBackground style={styles.container}
   source={require('../../assets/620781.jpg')} 
   >
    <ScrollView >
      <Text style={styles.cityTitle}>{city.sehir}</Text>
      {city.restoranlar.map((restoran) => (
        <TouchableOpacity
          key={restoran.RestoranAdi}
          style={styles.restoranButton}
          onPress={() => handleRestoranPress(restoran)}
        >
          <Image source={{ uri: restoran.photoUrl }} style={styles.restoranImage} />
          <View style={styles.divider}></View>
          <Text style={styles.restoranName}>{restoran.RestoranAdi}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.anasayfaButton} onPress={handleAnasayfaPress}>
        <Text style={styles.anasayfaText}>Anasayfa</Text>
      </TouchableOpacity>
    </ScrollView>
    </ImageBackground>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#E1E1E1',
  },
  cityTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffff',
    fontFamily: 'Rubik-VariableFont_wght',
  },
  restoranButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  restoranImage: {
    width: 700,
    height: 380,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  divider: {
    height: 1,
    width: '103%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  restoranName: {
    fontSize: 25,
    fontFamily: 'Courgette-Regular',
    margin: 10,
  },
  anasayfaButton: {
    backgroundColor: '#ba1313',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  anasayfaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
