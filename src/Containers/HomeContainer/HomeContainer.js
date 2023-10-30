import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwiperFlatList from 'react-native-swiper-flatlist';
import EvilIcons from "react-native-vector-icons/EvilIcons";


const HomeContainer = () => {

    const data = [
        {
            "id": 1,
            "image": require('../../Images/SwiperImages/meat.jpg')
        },
        {
            "id": 2,
            "image": require('../../Images/SwiperImages/meatadd2.jpg')
        },
        {
            "id": 3,
            "image": require('../../Images/SwiperImages/keema.jpg')
        },
        {
            "id": 4,
            "image": require('../../Images/SwiperImages/bbm.jpg')
        }
    ]

    const menu = [
        {
            id: 1,
            name: 'Chicken',
            'image': require('../../Images/SwiperImages/chi.jpg')
        },
        {
            id: 2,
            name: 'Eggs',
            'image': require('../../Images/SwiperImages/egg.jpg')
        },
        {
            id: 3,
            name: 'Fish',
            'image': require('../../Images/SwiperImages/fish.jpg')
        },
        {
            id: 4,
            name: 'Mutton',
            'image': require('../../Images/SwiperImages/mut.jpg')
        }
    ]
    return (
        <SafeAreaView>
            <View style={{
                flexDirection: 'row',
                padding: 5,

            }}>
                <EvilIcons
                    name="location"
                    size={40}
                    color={"black"}
                />
                <Text style={{
                    marginTop: 5,
                    fontWeight: "bold",
                    color: 'black'
                }}>Hyderabad</Text>

                <EvilIcons
                    name='chevron-down'
                    size={35}
                />

            </View>
            <View>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={3}
                    autoplayLoop
                    index={2}
                    showPagination
                    // PaginationComponent={CustomPagination}
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Image
                                source={item.image}
                                resizeMode="cover"
                                style={{ height: 200, width: 400, }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View>
                <FlatList
                    data={menu}
                    horizontal={true}
                    renderItem={({ item }) => {
                        return (
                            <Card style={{
                                marginLeft: 20,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '30%'
                            }}>
                                <Image
                                    source={item.image}
                                    style={{ height: 100, width: 100, margin: 10 }}
                                />
                                <Text style={{ alignSelf: 'center',
                              fontWeight:'bold',
                              color:'black'
                             }}>{item.name}</Text>

                            </Card>
                        )
                    }}
                />
            </View>



        </SafeAreaView>
    )
}

export default HomeContainer
