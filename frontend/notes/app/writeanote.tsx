import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, } from 'reanimated-color-picker';
import api from '../services/api';

export default function  NotepadPopup({setOnClose}) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [color, setColor] = useState('');
  const [showColorModal, setShowColorModal] = useState(false);
//värille oma ja tägeille lähetykset
  const handleClose = () => {
    setOnClose(false);
  };
  const handleSave = async () => {
    try {
      const response = await api.post('/notes/', {"note_h1":title,"note":note, "user_id":1});
      console.log('Note saved:', response.data);
      alert('Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save the note.');
    }
    setTitle('');
    setNote('');
    setOnClose(false);
  };
  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex);
    setColor(hex)
  };
  const handleOverlayClick = () => {
    //if(title !== '' && note !== '') handleSave();
    handleClose();
    
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={()=>handleClose()}
    >
      {/* <Pressable style={styles.overlay} 
      onPress={handleOverlayClick}> */}
        <View style={styles.popupContainer} >
          <Text style={styles.heading}>New Note</Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.textArea}
            placeholder="Write your notes here..."
            value={note}
            onChangeText={setNote}
            multiline={true}
            numberOfLines={4}
          />
            
            {/*<View style={styles.container}>{/*värinvalinta*/}
              {/*<Button title='Color Picker' onPress={() => setShowColorModal(true)} />
              <Modal visible={showColorModal} animationType='slide' style={styles.centeredView}>*/}
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
              {/*</View><Button title='Ok' onPress={() => setShowColorModal(false)} />
              </Modal>
            </View>*/}
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => handleClose()} color="gray" />
            <Button title="Save" onPress={handleSave} color="blue" />
          </View>
        </View>
      {/* </Pressable> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
