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
  color: string;
  date: string;
}
export default function  NotepadPopup({setOnClose, setNotes}: {setOnClose: Dispatch<SetStateAction<boolean>>; setNotes: Dispatch<SetStateAction<Note[]>>}) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [color, setColor] = useState('#ff0000');
  const [showColorModal, setShowColorModal] = useState(false);
//värille oma ja taijelle lähetykset
  const HandleClose = () => {
    setOnClose(false);
  };
  const handleSave = async () => {
    if(title === ''){ 
    alert('You cant save an empty note. Please fill the title field.');
    return;
    }
    try {
      const userID = 1;/*pitää vaihtaa tokenilta saatavaksi tuo userid*/ 
      console.log("title:",title,"note:", note, "color:", color  )
      const response = await addNote(title, note, color, userID);
      if (response.data) {
        const newNote = {
          id: response.data.id,
          note_h1: title,
          note: note,
          img: response.data.img,
          color: color,
          date: new Date().toISOString(),
        };
        setNotes(notes => [...notes, newNote]);
      } else {
        console.error('Error saving note:', response.error);
      }
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
    // console.log(hex);
    setColor(hex)
  };
  const handleOverlayClick = () => {
    //if(title !== '' && note !== '') handleSave();
    HandleClose();
    
  };

  const handleChange = (setter: Dispatch<SetStateAction<any>>, value: string) => {
    setter(value);
  };
  return (
    <Modal
    animationType="slide"
    transparent={true}
    onRequestClose={() => HandleClose()}
  >
    <View style={basic.overlay}>
      <View style={basic.popupContainer}>
          <Text style={basic.heading}>New Note</Text>
  
          <TextInput
            style={basic.input}
            placeholder="Title"
            value={title}
            onChangeText={text => handleChange(setTitle, text)}
          />
  
          <TextInput
            style={basic.textArea}
            placeholder="Write your notes here..."
            value={note}
            onChangeText={text => handleChange(setNote, text)}
            multiline={true}
            numberOfLines={4}
          />
          {/* <GestureHandlerRootView> */}
            <ColorPicker style={{ width: '70%' }} value="red" onComplete={onSelectColor}>
              <Preview />
              <Panel2 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
          {/* </GestureHandlerRootView> */}
  
          <View style={basic.buttonRow}>
            <Button title="Cancel" onPress={() => HandleClose()} color="gray" />
            <Button title="Save" onPress={handleSave} color="blue" />
          </View>
          </View>
      </View>
    </Modal>
  );
};
