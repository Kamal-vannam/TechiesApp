import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { removeBookmark } from '../../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';

const CartContainer = () => {

    const { bookmarks } = useSelector(state => state.booksReducer);

    console.log("bookmarkslist,,,,,,,,,,", bookmarks)

    const dispatch = useDispatch();

    const removeFromBookmarkList = book => dispatch(removeBookmark(book));

    const handleRemoveBookmark = book => {
        removeFromBookmarkList(book);
    };


const Payment=()=>{
    let options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_E6ZPerREiK1Gfn',
        amount: '800'*100,
        name: 'Acme Corp',
        order_id: '',//Replace this with an order_id created using Orders API.
        prefill: {
          email: 'gaurav.kumar@example.com',
          contact: '9191919191',
          name: 'Gaurav Kumar'
        },
        theme: {color: '#53a20e'}
      }
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      }).catch((error) => {
        // handle failure

        alert(`Error: ${error.code} | ${error.description}`);
      });

}

    


    const renderItem = ({ item }) => {
        return (
           
            <View style={styles.container}>
                    {/* Book Cover */}
                    {/* <Image
                        source={item.image}
                        resizeMode='cover'
                        style={{ width: 100, height: 150, borderRadius: 10 }}
                    /> */}
                    {/* Book Metadata */}
                    <View style={{ flex: 1, marginLeft: 13 }}>
                        {/* Book Title */}
                        <Card style={{
                            marginLeft: 20,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '30%',
                            padding: 10
                        }}>
                            <Image
                                source={item.image}
                                style={styles.image}
                            />
                            <Text style={{
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                color: 'black'
                            }}>{item.name}</Text>
                            <Text style={
                               styles.price
                            }>{item.grm}</Text>
                           
                                <Text style={
                                  
                                        styles.price
                                     
                                    
                                }>Price:{item.price}</Text>

                           

                        </Card>
                        {/* Buttons */}
                        <View style={{ marginTop: 14 }}>
                            <TouchableOpacity
                                onPress={() => handleRemoveBookmark(item)}
                                activeOpacity={0.7}
                                style={{
                                    flexDirection: 'row',
                                    padding: 2,
                                    backgroundColor: '#2D3038',
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 40,
                                    width: 40
                                }}
                            >
                                <MaterialCommunityIcons
                                    color='#64676D'
                                    size={24}
                                    name='bookmark-remove'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
           

        )
    }


    return (

        <View>

            <Text style={{ fontSize: 22 }}>Bookmarks</Text>
            <View style={{  marginTop: 8 }}>
                {bookmarks.length === 0 ? (
                    <Text style={{ color: '#64676D', fontSize: 18 }}>
                        Add a book to bookmark list.
                    </Text>
                ) : (
                    <FlatList
                        data={bookmarks}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
           <Button title='pay' onPress={()=>{Payment()}} />
        </View>


    )
}

export default CartContainer






const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    color: 'green',
  },
});





