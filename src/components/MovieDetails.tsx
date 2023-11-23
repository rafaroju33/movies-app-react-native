import React from 'react'
import { FlatList, Text, View } from 'react-native'
import currencyFormatter from "currency-formatter";
import { MovieFull } from '../interfaces/movieInterface'
import { Cast } from '../interfaces/creditInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
        {/* Detalles */}
        <View style={{marginHorizontal: 20}}>
            <View style={{flexDirection: 'row'}}>
                <Icon 
                    name="star-outline"
                    color="black"
                    size={15}
                />
                <Text style={{color: "black"}}>{movieFull.vote_average}</Text>
                <Text style={{ marginLeft: 5, color: "black"}}>
                    - {movieFull.genres.map(g => g.name).join(', ')}
                </Text>
            </View>

            {/* Historia */}
            <Text style={{fontSize: 23, marginTop:10, fontWeight: 'bold', color: "black"}}>
                Historia
            </Text>
            <Text style={{fontSize:16, color: "black"}}>
                {movieFull.overview}
            </Text>

            <Text style={{fontSize:23, marginTop:10, fontWeight: 'bold', color: "black"}}>
                Presupuesto
            </Text>
            <Text style={{fontSize:18, color: "black"}}>{currencyFormatter.format(movieFull.budget, {code: 'USD'})}</Text>

            {/* Casting */}
            <View style={{ marginBottom:100}}>
                <Text style={{fontSize:23, marginTop:10, fontWeight: 'bold', color: "black"}}>
                    Actores
                </Text>
                <FlatList 
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <CastItem actor={item}/>}
                    horizontal
                    showHorizontalScrollIndicator={false}
                    style={{marginTop: 10, height:70}}
                />
                {/* <CastItem actor={cast[0]}/> */}
            </View>

        </View>
    </>
  )
}
