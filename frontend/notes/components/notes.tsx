import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import getNotes from '../services/notes.service';

export default function notes() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        getNotes().then((res) => {
        setNotes(res);
        console.log("notes: ",notes,", res:",res);
        });
    }, [])
    return (
      <>
        <Stack.Screen options={{ title: 'Oops! Not Found' }} />
        <View style={styles.container}>
            <p>joo</p>
        </View>
      </>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 6,
    },
    text: {
      color: '#fff',
    },
  });