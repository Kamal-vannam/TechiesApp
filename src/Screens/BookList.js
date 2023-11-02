import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
//import { getBooks } from '../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBooks, addBookmark, removeBookmark } from '../redux/actions';
import { Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'




export default function BooksListApp() {


    // const { books } = useSelector(state => state.booksReducer);
    const { books, bookmarks } = useSelector(state => state.booksReducer);

    console.log("booksbooks.........", books)
    console.log("bookmarks.........", bookmarks)

    //...

    const dispatch = useDispatch();

    const fetchBooks = () => dispatch(getBooks());

    useEffect(() => {
        fetchBooks();
    }, []);


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



    const renderItem = ({ item }) => {
        return (
            // <View style={{ marginVertical: 12 }}>
            //     <View style={{ flexDirection: 'row', flex: 1 }}>
            //         {/* Book Cover */}
            //         <Image
            //             source={{ uri: item.image_url }}
            //             resizeMode='cover'
            //             style={{ width: 100, height: 150, borderRadius: 10 }}
            //         />
            //         {/* Book Metadata */}
            //         <View style={{ flex: 1, marginLeft: 12 }}>
            //             {/* Book Title */}
            //             <View>
            //                 <Text style={{ fontSize: 22, paddingRight: 16, color: 'white' }}>
            //                     {item.title}
            //                 </Text>
            //             </View>
            //             {/* Meta info */}
            //             <View
            //                 style={{
            //                     flexDirection: 'row',
            //                     marginTop: 10,
            //                     alignItems: 'center'
            //                 }}
            //             >
            //                 <MaterialCommunityIcons
            //                     color='#64676D'
            //                     name='book-open-page-variant'
            //                     size={20}
            //                 />
            //                 <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
            //                     {item.num_pages}
            //                 </Text>
            //                 <MaterialCommunityIcons
            //                     color='#64676D'
            //                     name='star'
            //                     size={20}
            //                     style={{ paddingLeft: 16 }}
            //                 />
            //                 <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
            //                     {item.rating}
            //                 </Text>
            //             </View>
            //             {/* Buttons */}
            //             <View style={{ marginTop: 14 }}>
            //                 <TouchableOpacity
            //                     onPress={() =>
            //                         ifExists(item) ? handleRemoveBookmark(item) : handleAddBookmark(item)
            //                     }
            //                     activeOpacity={0.7}
            //                     style={{
            //                         // rest remains same
            //                         backgroundColor: ifExists(item) ? '#F96D41' : '#2D3038'
            //                         //
            //                     }}
            //                 >
            //                     <MaterialCommunityIcons
            //                         color={ifExists(item) ? 'white' : '#64676D'}
            //                         size={24}
            //                         name={ifExists(item) ? 'bookmark-outline' : 'bookmark'}
            //                     />
            //                 </TouchableOpacity>
            //             </View>
            //         </View>
            //     </View>
            // </View>

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
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <Text style={{ color: 'white', fontSize: 22 }}>Bestsellers</Text>
                <View style={{ flex: 1, marginTop: 8 }}>
                    <FlatList
                        data={books}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
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