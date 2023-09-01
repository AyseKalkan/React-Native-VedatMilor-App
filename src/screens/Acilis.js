import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ImageBackground,
} from 'react-native';
import Sehirler from './Sehirler';

export default function Acilis({ navigation }) {

    useEffect(() => {
         setTimeout(() => {
            navigation.replace('Sehirler');
        }, 2000);
    }, []);

    return (
        <ImageBackground 
        source={require('../../assets/background.png')}
        style={styles.body}>
            <Text
                style={{fontFamily: 'Rubik-Courgette-Regular', fontSize: 60, color:'#ffffff'}}
            >
                Lezzet Rehberi
            </Text>
            <Text
                style={{fontFamily: 'Rubik-VariableFont_wght', fontSize: 40, color:'#ffffff'}}
            >
                Vedat Milor
            </Text>
   </ImageBackground> )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        margin: 20,
    },
    text: {
        fontSize: 40,
        color: '#ffffff',
    },
})