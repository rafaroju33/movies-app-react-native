import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { MoviePoster } from './MoviePoster';

interface Props{
    title?: string;
    movies: Movie[];
}

export const HorizontalSlider = ({title, movies}) => {
  return (
    <View style={{height:260, height: (title) ? 220:230}}>
        <Text style={{fontSize:30, fontWeight:'bold', marginLeft: 10}}>{title}</Text>
        <FlatList
            data={movies}
            renderItem={({item}: any) => (
            <MoviePoster movie={item} width={120} height={180}/>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}
