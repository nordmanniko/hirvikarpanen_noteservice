import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import ColorPicker, { Panel2, Swatches, Preview, OpacitySlider, HueSlider, } from 'reanimated-color-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import basic from '@/components/styles/basics';
import { addNote, getTagsByUser } from '@/services/notes.service';
import DropDownPicker from 'react-native-dropdown-picker';
import { InputNewTag } from './tagFunctions';

interface Note {
  id: number;
  note_h1: string;
  note: string;
  img: string;
  color: string;
  date: string;
  tag_id: number;
}

export function GetTags({ slctdTag, notes }: { slctdTag: number, notes: Note[] }) {
  const [tags, setTags] = useState<{ key: number, value: string, label: string }[]>([]);
  useEffect(() => {
    const userID = 1; // Placeholder user ID, replace with actual authentication
    getTagsByUser(userID).then((res) => {
      if (res.length > 0) {
        const newTags = res.map((tag: { key: number; tag: string }) => ({
          key: tag.key,
          label: `${tag.tag}`,
          value: tag.tag
        }));
        setTags(newTags);
      } else {
        console.log("No tags found for user");
      }
    }).catch(error => {
      console.error("Error fetching tags:", error);
    });
  }, []);
  return tags;
}


export function NotepadPopup({ setOnClose, setNotes, notes, tags }: { setOnClose: Dispatch<SetStateAction<boolean>>; setNotes: Dispatch<SetStateAction<Note[]>>; notes: Note[]; tags: { key: number, value: string }[] }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [color, setColor] = useState('#ff0000');
  const [showColorModal, setShowColorModal] = useState(false);
  const [slctdTag, setSlctdTag] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const HandleClose = () => {
    setOnClose(false);
  };

  const handleSave = async () => {
    try {
      if (title === '') { 
        alert('You cant save an empty note. Please fill the title field.');
        return;
      }
      const userID = 1; /*pitää vaihtaa tokenilta saatavaksi tuo userid*/ 
      // console.log("title:", title, "note:", note, "color:", color, "tag_id:", slctdTag);
      const response = await addNote(title, note, color, userID, slctdTag);
      if (response.data) {
        const newNote = {
          id: response.data.id,
          note_h1: title,
          note: note,
          img: response.data.img,
          color: color,
          date: new Date().toISOString(),
          tag_id: response.data.tag_id
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
          <DropDownPicker
            style={{ width: '70%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}
            open={open}
            value={value}
            onChange={value => {setSlctdTag(value)}}
            items={items}
            items={[
              // tähän asia joka vaihtuu riippuen siitö onko painettu via ei
              { label: "None", value: '' },
              ...GetTags({slctdTag, notes})
            ]}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
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

export{NotepadPopup, GetTags};