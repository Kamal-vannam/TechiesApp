import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwiperFlatList from 'react-native-swiper-flatlist';
import EvilIcons from "react-native-vector-icons/EvilIcons";


const HomeContainer = () => {

    const data=[
        {
            "id":1,
            "image":require('../../Images/SwiperImages/meat.jpg')
        },
        {
            "id":2,
            "image":require('../../Images/SwiperImages/meatadd2.jpg')
        },
        {
            "id":3,
            "image":require('../../Images/SwiperImages/keema.jpg')
        },
        {
            "id":4,
            "image":require('../../Images/SwiperImages/bbm.jpg')
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


        </SafeAreaView>
    )
}

export default HomeContainer
