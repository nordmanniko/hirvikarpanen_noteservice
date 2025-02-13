import { View, Modal, Pressable, Text, Alert, TextInput, Image } from 'react-native';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import basic from '@/components/styles/basics'; 
import HandleClose from '../writeanote';
import {editNote, getTagsByUser} from '@/services/notes.service';
import {LoadNotes} from '@/app/notes/notes';

import DropDownPicker from 'react-native-dropdown-picker';

//styles
import noteStyle from '@/components/styles/noteStyle';
import {deleteNotes} from '@/services/notes.service';


interface Note {
  id: number;
  note_h1: string;
  note: string;
  img: string;
  color: string;
  date: string;
  tag_id: number;
}

export function GetTags() {
  const [tags, setTags] = useState<{ key: number, value: string, label: string }[]>([]);
  useEffect(() => {
    const userID = 1; // Placeholder user ID, replace with actual authentication
    getTagsByUser(userID).then((res) => {
      if (res.length > 0) {
        console.log(res)
        const newTags = res.map((tag: { key: number; tag: string, value: string }) => ({
          key: tag.id,
          label: `${tag.tag}`,
          value: tag.id
        }));
        setTags(newTags);
      } else {
      }
    }).catch(error => {
    });
  }, []);
  const tagOptions = [
    {key: '', label: "None", value: '' },
     ...tags
  ];
  return tagOptions;
}
 
function EditNote({ note, setOpnNote, notes, setNotes, setWhichReturn}: { note: Note | null; setOpnNote: Dispatch<SetStateAction<Note | null>>; notes: Note[]; setNotes: Dispatch<SetStateAction<Note[]>>; whichReturn: string; setWhichReturn: Dispatch<SetStateAction<string>> }) {
    const [title, setTitle] = useState('');
    const [newNote, setNewNote] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);
    const [slctdTag, setSlctdTag] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.note_h1);
            setNewNote(note.note);
            setValue(note.tag_id);
        }
    }, [note]);

    const handleSave = async () => {
        if (title === note?.note_h1 && newNote === note?.note && slctdTag === note?.tag_id) {
            alert('You can’t save the same note. Please change the fields.');
            return;
        }
        try{
            const result = await editNote(note?.id ?? 0, title, newNote, 1, slctdTag);
            console.log('Note changed:', result);
                if (result) {
                  setNotes(notes => notes.filter(note => note.id !== (note?.id ?? 0)));
                  console.log(notes,'Note changed successfully!');
                } else if (result == null) {
                  console.log('Failed to change note.');
                  return;
                }
              } catch (error) {
                console.error('Error changing note:', error);
                return;
              }
        setTitle('');
        setNewNote('');
        setOpnNote(null); // Close the modal after saving
        setWhichReturn('normal');
        LoadNotes({ notes, setNotes });
    };

    const handleChange = (setter: Dispatch<SetStateAction<any>>, value: string) => {
        setter(value);
    };
    
    return (
        <>
                    <Text style={basic.modalText}>Edit note</Text>
                    <Text style={basic.modalText}>Title</Text>
                    <TextInput
                      style={basic.input}
                      onChangeText={text => handleChange(setTitle, text)}
                      value={title}
                    />
                    <DropDownPicker
                      style={{ width: '10%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}
                      open={open}
                      value={value}
                      onChangeValue={value => {
                        setSlctdTag(value) 
                        // const selectedItem = items.find(item => item.value === event.target.value);
                        // handleChange(setSlctdTag, selectedItem.key ? selectedItem.key : null);
                      }}
                      items={
                        // tähän asia joka vaihtuu riippuen siitö onko painettu via ei
                        GetTags()
                      }
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                    />
                    <Text style={basic.modalText}>Note</Text>
                    <TextInput
                      style={basic.textArea}
                      multiline={true}
                      onChangeText={text => handleChange(setNewNote, text)}
                      value={newNote}
                      numberOfLines={4}
                    />
                <View style={noteStyle.modalButtonContainer}>
                  <Pressable
                    style={[noteStyle.modalButton, basic.buttonOpen]}
                    onPress={handleSave}>
                    <Text style={basic.textStyle}>Save</Text>
                  </Pressable>
                  <Pressable
                    style={[noteStyle.modalButton, basic.buttonClose]}
                    onPress={() => setWhichReturn('normal')}>
                    <Text style={basic.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
        </>
    );
}
export default EditNote;