import { Alert, Modal, StyleSheet, Pressable, Text, View, TextInput, Button} from 'react-native';
import { Link } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import NotepadPopup from '../writeanote';
import {Notes} from '../../components/notes';

export default function Index() {
    const [onClose, setOnClose] = useState(false);
    const [onSave, setOnSave] = useState({});
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        <Text>
        Go to About screen
        </Text>
      </Link>
      <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        {onClose && (
            <NotepadPopup
              setOnClose={setOnClose}
            />)}
        <Pressable
          style={[styles.backButton, styles.buttonOpen]}
          onPress={() => setOnClose(true)}>
          <Text style={styles.textStyle}>Write a new note</Text>
        </Pressable>    
        <Notes/>
      </SafeAreaView>
    </SafeAreaProvider>
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  h1: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 12,
  },
  text: {
    color: '#fff',
    marginBottom: 6,
  },
  multilineText: {
    color: '#fff',
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 5
  },
  button: {
    fontSize: 20,
    color: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  backButton: {
    fontSize: 20,
    color: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#25292e',
    borderRadius: 20,
    borderWidth:1,
    borderColor: '#fff',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});