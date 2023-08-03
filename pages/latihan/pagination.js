import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const PAGE_SIZE = 5; // Number of items per page

const database = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item 3'},
  // ... and so on
];

const PaginatedList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    // Increase the current page when loading more data
    setCurrentPage(prevPage => prevPage + 1);
  };

  const renderListItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  // Function to get the current page's data
  const getDataForCurrentPage = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return database.slice(startIndex, endIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getDataForCurrentPage()}
        renderItem={renderListItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default PaginatedList;
