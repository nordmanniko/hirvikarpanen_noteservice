import { Alert, Modal, StyleSheet, Pressable, Text, View, TextInput, Button} from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, } from 'reanimated-color-picker';
import { Link } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState} from 'react';
export default function Index() {
  const [writenewVisible, setwritenewVisible] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
    const [showTextEditor, setShowTextEditor] = useState(false);
    const onSelectColor = ({ hex }) => {
      // do something with the selected color.
      console.log(hex);
    };
    return (

      <View style={styles.container}>
        <Text style={styles.h1}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
      <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={writenewVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setwritenewVisible(!writenewVisible);
          }}>
            
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Pressable
            style={[styles.backButton, styles.buttonClose]}
            onPress={() => setwritenewVisible(!writenewVisible)}>
            <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Text style={styles.h1}>Write a new note</Text>
                
                  <View style={styles.container}>{/*värinvalinta*/}
                    <Button title='Color Picker' onPress={() => setShowColorModal(true)} />
                    <Modal visible={showColorModal} animationType='slide' style={styles.centeredView}>
                      <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>
                      <Preview />
                          <View>
                            <Panel1/>
                            <HueSlider />
                          </View>
                          <View>
                            {/* <Text>Opacity</Text> */}
                            <OpacitySlider />
                          </View>
                        <Swatches />
                      </ColorPicker>

                      <Button title='Ok' onPress={() => setShowColorModal(false)} />
                    </Modal>
                  </View>
                
              <Text style={styles.textStyle}>Title</Text>
              <TextInput style={styles.input}></TextInput>
              <Pressable
                style={[styles.backButton, styles.buttonOpen]}
                onPress={() => setwritenewVisible(true)}>
                <Text style={styles.textStyle}></Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.backButton, styles.buttonOpen]}
          onPress={() => setwritenewVisible(true)}>
          <Text style={styles.textStyle}>Write a new note</Text>
        </Pressable>
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