import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Linking, FlatList, TextInput } from "react-native";
import StarRating from 'react-native-star-rating';
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  (error) => {
    console.log(error);
  }
);


export default function RestoranDetay({ route, navigation }) {

    const { restoran } = route.params;
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      createTable();
      getComments();
    }, []);

    const handleAnasayfaPress = () => {
        navigation.goBack(); 
      };
  
    const createTable = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, restaurant_id INTEGER, name TEXT, comment TEXT, rating INTEGER)',
          [],
          () => {
            console.log('Veritabanı tablosu başarıyla oluşturuldu.');
          },
          (error) => {
            console.error('Veritabanı tablosu oluşturulurken hata oluştu:', error);
          }
        );
      });
    };
  
    const addCommentToDatabase = (restaurantId, name, comment, rating) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO comments (restaurant_id, name, comment, rating) VALUES (?, ?, ?, ?)',
          [restaurantId, name, comment, rating],
          () => {
            console.log('Yorum başarıyla eklendi.');
          },
          (error) => {
            console.error('Yorum eklenirken hata oluştu:', error);
          }
        );
      });
    };
  
    const getCommentsFromDatabase = (restaurantId, callback) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM comments WHERE restaurant_id = ?',
          [restaurantId],
          (_, result) => {
            const data = result.rows.raw();
            callback(data);
          },
          (tx, error) => {
            console.error('Yorumlar alınırken hata oluştu:', error);
            callback([]);
          }
        );
      });
    };
  
    const getComments = () => {
      getCommentsFromDatabase(restoran.id, (data) => {
        setComments(data);
      });
    };
  
    const saveComment = () => {
      if (!name || !comment) {
        alert('Lütfen tüm alanları doldurun ve puan verin.');
        return;
      }
  
      addCommentToDatabase(restoran.id, name, comment, rating);
      getComments();
      setName('');
      setComment('');
      setRating(0);
    };


  const openMapScreen = () => {
    navigation.navigate('Map', { lat: restoran.lat, lng: restoran.lng });
  };

  return (
    <ScrollView style={styles.container}>
        <ImageBackground source={{ uri: restoran.photoUrl }} style={styles.image}>
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    underlayColor="#A3A5FA"
                    style={styles.mapButton}
                    onPress={openMapScreen}
                >
                    <Text style={styles.mapButtonText}>Haritada Göster</Text>
                </TouchableOpacity>
                <View style={styles.restaurantContainer}>
                
                <Text style={styles.restaurantName}>{restoran.RestoranAdi}</Text>

                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={restoran.rating}
                        starSize={20}
                        fullStarColor="gold"
                    />
                    <View style={styles.locationContainer}>
  <FontAwesome name="map-marker-alt" size={20} color="#ba1313" style={styles.locationIcon} />
  <Text style={styles.location}>{restoran.konum}</Text>
</View>
                </View>
            </View>
        </ImageBackground>
        <View style={styles.box}>
            <Text style={styles.yazi}>{restoran.yazi}</Text>
            <Text style={[styles.yazi, { fontWeight: 'bold', color: '#00000099' }]}>Vedat Milor</Text>
        </View>
        <View style={styles.box}>
            <Text style={styles.header}>Tavsiyeler:</Text>
            <FlatList
                data={restoran.tavsiyeler}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.yazi}>{item}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
        <Text style={styles.reviewHeader}>Adres ve İletişim</Text>
        <View style={styles.box}>
  <Text style={styles.header}>Adres:</Text>
  <Text style={styles.text}>{restoran.adres}</Text>

  <Text style={styles.header}>Telefon:</Text>
  <Text
    style={styles.text}
    onPress={() => Linking.openURL(`tel:${restoran.telefon}`)}
  >
    {restoran.telefon}
  </Text>

  <Text style={styles.header}>Web:</Text>
  <Text
    style={styles.text}
    onPress={() => Linking.openURL(restoran.web)}
  >
    {restoran.web}
  </Text>
</View>
        <View>
            <Text style={styles.reviewHeader}>İncelemeler</Text>
            <View style={styles.commentBox}>
  <Text style={styles.commentHeader}>Yorum Ekle:</Text>
  <TextInput
    placeholder="Adınız"
    value={name}
    onChangeText={(text) => setName(text)}
    style={styles.input}
  />
  <TextInput
    placeholder="Yorumunuz"
    value={comment}
    onChangeText={(text) => setComment(text)}
    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
    multiline
  />
  <Text style={styles.ratingText}>Puan Ver:</Text>
 
  <View style={styles.reviewTextContainer}>
  <StarRating
    maxStars={5}
    rating={rating}
    starSize={30}
    fullStarColor="gold"
    selectedStar={(rating) => setRating(rating)}
    containerStyle={styles.ratingContainer}
    starStyle={{ marginHorizontal: 5 }} 
  />
</View>
  
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.submitButton}
    onPress={saveComment}
  >
    <Text style={styles.submitButtonText}>Gönder</Text>
  </TouchableOpacity>
</View>
<FlatList
  data={comments}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.reviewBox}>
  <View style={styles.reviewTextContainer}>
      <Text style={styles.reviewText}>{item.name}</Text>
      <StarRating
      disabled={true}
      maxStars={5}
      rating={item.rating}
      starSize={20}
      fullStarColor="gold"
      starStyle={{ marginHorizontal: 2 }}
    />
    </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
    </View>
  )}
/>
    <FlatList
  data={restoran.yorumlar}
  renderItem={({ item }) => (
    <View style={styles.reviewBox}>
  <View style={styles.reviewTextContainer}>
    <Text style={styles.reviewText}>{item.isim}</Text>
    <StarRating
      disabled={true}
      maxStars={5}
      rating={item.rating1}
      starSize={20}
      fullStarColor="gold"
      starStyle={{ marginHorizontal: 2 }}
    />
  </View>
  <Text style={styles.reviewText}>{item.yorum}</Text>
</View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
<TouchableOpacity style={styles.submitButton} onPress={handleAnasayfaPress}>
        <Text style={styles.submitButtonText}>Restoranlar</Text>
      </TouchableOpacity>

        </View>
    </ScrollView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D2D2D2',
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: "flex-end"
    },
    innerContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.60)',
        padding: 25,
    },
    mapButton: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    mapButtonText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    restaurantContainer: {
        margin: 10,
        padding: 10,
        alignItems: "flex-start"
    },
    restaurantName: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 5,
    },
    location: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 5
    },
    box: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 20,
    },
    yazi: {
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5
    },
    reviewHeader: {
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 10,
        marginTop: 5,
    },
    reviewBox: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    reviewItem: {
        marginBottom: 10,
    },
    reviewAuthor: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 5,
    },
    reviewText: {
        fontSize: 15,
    },
    reviewTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      sehirContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      locationIcon: {
        marginLeft: 5,
      },
      locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      commentBox: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
      },
      commentHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      input: {
        fontSize: 20,
        marginVertical: 5,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
      },
      ratingText: {
        fontSize: 20,
        marginVertical: 5,
      },
      ratingContainer: {
        marginVertical: 5,
      },
      submitButton: {
        backgroundColor: '#ba1313',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
      },
      submitButtonText: {
        color: '#ffffff',
        fontSize: 20,
      },
      commentContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
      },

});

