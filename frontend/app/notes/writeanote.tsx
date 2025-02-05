import React, { useState, Dispatch, SetStateAction} from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, } from 'reanimated-color-picker';
import api from '../../services/api';
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
//värille oma ja tägeille lähetykset
  const handleClose = () => {
    setOnClose(false);
  };
  const handleSave = async () => {
    if(title === ''){ 
    alert('You cant save an empty note. Please fill the title field.');
    return;
    }
    try {
      const response = await api.post('/notes/', {"note_h1":title,"note":note, "user_id":1});/*pitää vaihtaa tokenilta saatavaksi tuo userid*/ 
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
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
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
  
          <ColorPicker style={{ width: '70%' }} value="red" onComplete={onSelectColor}>
            <Preview />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
          </ColorPicker>
  
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => handleClose()} color="gray" />
            <Button title="Save" onPress={handleSave} color="blue" />
          </View>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
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
