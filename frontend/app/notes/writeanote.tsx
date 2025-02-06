import React, { useState, Dispatch, SetStateAction} from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import ColorPicker, { Panel2, Swatches, Preview, OpacitySlider, HueSlider, } from 'reanimated-color-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import basic from '@/components/styles/basics';
import {addNote} from '@/services/notes.service';

interface Note {
  id: number;
  note_h1: string;
  note: string;
  img: string;
  date: string;
}
export default function  NotepadPopup({setOnClose, setNotes}: {setOnClose: Dispatch<SetStateAction<boolean>>; setNotes: Dispatch<SetStateAction<Note[]>>}) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [color, setColor] = useState('');
  const [showColorModal, setShowColorModal] = useState(false);
//värille oma ja taijelle lähetykset
  const handleClose = () => {
    setOnClose(false);
  };
  const handleSave = async () => {
    if(title === ''){ 
    alert('You cant save an empty note. Please fill the title field.');
    return;
    }
    try {
      const response = await addNote(title, note, color, 1);/*pitää vaihtaa tokenilta saatavaksi tuo userid*/ 
      console.log('Note saved:', response.data);
      setNotes(notes => [...notes, response.data]);
    } catch (error) {
      console.error('Error saving note:', error);
      alert('The note couldnt save. Please try again.');
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
    onRequestClose={() => handleClose()}
  >
    <View style={basic.overlay}>
      <View style={basic.popupContainer}>
          <Text style={basic.heading}>New Note</Text>
  
          <TextInput
            style={basic.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
  
          <TextInput
            style={basic.textArea}
            placeholder="Write your notes here..."
            value={note}
            onChangeText={setNote}
            multiline={true}
            numberOfLines={4}
          />
          <GestureHandlerRootView>
            <ColorPicker style={{ width: '70%' }} value="red" onComplete={onSelectColor}>
              <Preview />
              <Panel2 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
          </GestureHandlerRootView>
  
          <View style={basic.buttonRow}>
            <Button title="Cancel" onPress={() => handleClose()} color="gray" />
            <Button title="Save" onPress={handleSave} color="blue" />
          </View>
          </View>
      </View>
    </Modal>
  );
};
