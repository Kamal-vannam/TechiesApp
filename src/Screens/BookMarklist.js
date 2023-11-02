    import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { removeBookmark } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-paper';




export default function BookmarksList() {
    const { bookmarks } = useSelector(state => state.booksReducer);

console.log("bookmarkslist,,,,,,,,,,",bookmarks)

    const dispatch = useDispatch();

    const removeFromBookmarkList = book => dispatch(removeBookmark(book));

    const handleRemoveBookmark = book => {
        removeFromBookmarkList(book);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginVertical: 12 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    {/* Book Cover */}
                    {/* <Image
                        source={item.image}
                        resizeMode='cover'
                        style={{ width: 100, height: 150, borderRadius: 10 }}
                    /> */}
                    {/* Book Metadata */}
                    <View style={{ flex: 1, marginLeft: 12 }}>
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
                   
                </View>

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
            </View>

        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <Text style={{ color: 'white', fontSize: 22 }}>Bookmarks</Text>
                <View style={{ flex: 1, marginTop: 8 }}>
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});