import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwiperFlatList from 'react-native-swiper-flatlist';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { menu } from '../../assets/data';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../../redux/actions';


const HomeContainer = () => {

    const { books, bookmarks } = useSelector(state => state.booksReducer);

    const dispatch = useDispatch();

    const addToBookmarkList = book => dispatch(addBookmark(book));
    const removeFromBookmarkList = book => dispatch(removeBookmark(book));
    const handleAddBookmark = book => {
        addToBookmarkList(book);
    };


    const handleRemoveBookmark = book => {
        removeFromBookmarkList(book);
    };

    const ifExists = book => {
        if (bookmarks.filter(item => item.id === book.id).length > 0) {
            return true;
        }

        return false;
    };
  

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

    

    const Categories = [
        {
            id: 1,
            name: 'Chicken',
            'image': require('../../Images/SwiperImages/chi.jpg'),

        },
        {
            id: 2,
            name: 'Eggs',
            'image': require('../../Images/SwiperImages/egg.jpg'),

        },
        {
            id: 3,
            name: 'Fish',
            'image': require('../../Images/SwiperImages/fish.jpg'),

        },
        {
            id: 4,
            name: 'Mutton',
            'image': require('../../Images/SwiperImages/mut.jpg'),

        },
        {
            id: 5,
            name: 'Liver',
            'image': require('../../Images/SwiperImages/liver.jpg')
        },
        {
            id: 6,
            name: ' skin',
            'image': require('../../Images/SwiperImages/skin.jpg')
        },
        {
            id: 7,
            name: 'Mutton Boti',
            'image': require('../../Images/SwiperImages/boti.jpg')
        },
        {
            id: 8,
            name: 'Boneless ',
            'image': require('../../Images/SwiperImages/boneless.jpg')
        },
        {
            id: 9,
            name: 'Mutton',
            'image': require('../../Images/SwiperImages/raan.jpg')
        }
    ]
    return (
        <ScrollView>
            <SafeAreaView>
                {/* <ScrollView> */}
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
                <View style={{ padding: 5 }}>

                    <FlatList
                        data={menu}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <Card style={{
                                    marginLeft: 20,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '30%',
                                    padding: 10
                                }}>
                                    <Image
                                        source={item.image}
                                        style={{ height: 100, width: 100, margin: 10 }}
                                    />
                                    <Text style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>{item.name}</Text>
                                    <Text style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>{item.grm}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        //  justifyContent:'space-between',
                                        alignSelf: "center"
                                    }}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            color: 'black',
                                            marginRight: 10
                                        }}>Price:{item.price}</Text>
                                        <AntDesign
                                            name={  ifExists(item) ? 'minus' :  "pluscircle"}
                                            size={20}
                                            onPress={() =>
                                                ifExists(item) ? handleRemoveBookmark(item) : handleAddBookmark(item)
                                            }
                                            />
                                    </View>

                                </Card>
                            )
                        }}
                    />
                </View>

                <Card style={{
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '10%',
                    padding: 20
                }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>Categories</Text>

                    <FlatList
                        data={Categories}
                        // horizontal={true}
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ padding: 10 }}>
                                    <Image
                                        source={item.image}
                                        style={{ height: 80, width: 80, borderRadius: 80 / 2 }}
                                    />
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: "bold",
                                        alignSelf: 'center'
                                    }}>{item.name}</Text>
                                </View>
                            )
                        }}
                    />

                </Card>
                {/* </ScrollView> */}



            </SafeAreaView>
        </ScrollView>
    )
}

export default HomeContainer
