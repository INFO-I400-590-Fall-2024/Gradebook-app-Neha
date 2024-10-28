import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {collection, getDocs} from 'firebase/firestore';
import {db} from './firebase';

export default function FirebaseFetcher() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentData = [];
      querySnapshot.forEach(doc => {
        studentData.push({id: doc.id, ...doc.data()});
      });
      setStudents(studentData);
    };

    fetchData();
  }, []);

  const renderStudentItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>ID: {item.id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students List</Text>
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // For Android shadow
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});
