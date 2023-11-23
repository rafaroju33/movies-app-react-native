import React from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon  from 'react-native-vector-icons/Ionicons';


const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScrenProps<RootStackParams, 'DetailsScreen'>{}

export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const {isLoading, cast, movieFull} = useMovieDetails(movie.id);  

  console.log({movieFull})

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image 
              source={{uri}}
              style={styles.posterImage}
            />
          </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      
        {
          isLoading 
            ? <ActivityIndicator size={35} color="grey" style={{marginTop: 20}} />
            : <MovieDetails movieFull={movieFull} cast={cast}/>

        }

        {/* Boton para cerrar */}
        {/* <View style={styles.backButton}> */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.pop()}
            >
            <Icon 
              color="white"
              name="arrow-back-outline"
              size={50}
              />
          </TouchableOpacity>
        {/* </View> */}
      
    </ScrollView>

  )
}

const styles = StyleSheet.create({
    imageContainer:{
      // backgroundColor: 'red',
      // overflow: 'hidden',
      width: '100%',
      height: screenHeight * 0.7,
      // paddingBottom: 15,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.24,
      shadowRadius: 7,

      elevation: 9,
      borderBottomEndRadius: 25,
      borderBottomStartRadius: 25
    },
    imageBorder:{
      flex: 1,
      overflow: 'hidden',
      borderBottomEndRadius: 25,
      borderBottomStartRadius: 25
    },
    posterImage: {
      flex:1
    },
    marginContainer: {
      marginHorizontal: 20,
      marginTop: 20
    },
    subTitle:{
      fontSize: 16,
      opacity: 0.8,
      color: "black"
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black"
    },
    backButton: {
      position: 'absolute',
      zIndex: 999,
      elevation: 9,
      top: 30,
      left: 5
    },

});