import { View, Text, Pressable, Modal, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect, useLayoutEffect, Dispatch, SetStateAction } from 'react';
import {getNotes, getTagsByUser, getTagsByTagID} from '../../services/notes.service';
import {NotepadPopup} from '@/app/notes/writeanote';
import DropDownPicker from 'react-native-dropdown-picker';
//Styles
import basic from '../../components/styles/basics'; 
import noteStyle from '../../components/styles/noteStyle';

//other functions
import BigModal from './noteFunctions/inspec_note';

interface Note {
  id: number;
  note_h1: string;
  note: string;
  img: string;
  color: string;
  date: string;
  tag_id: number;
}

function LoadNotes({ notes, setNotes, value, tags, setTags }: { notes: Note[]; setNotes: Dispatch<SetStateAction<Note[]>>; value: string; tags: {key: number, value: string}[]; setTags: Dispatch<SetStateAction<{key: number, value: string}[]>> }) {
  setNotes([]);
  const userID = 1;
      getNotes(userID).then((res) => {
        if (res.length <= 0) {
          // console.log("notes null: ", notes, ", res:", res);
        } else {
          getTagsByUser(userID).then((res) => {
            const temp: {key: number, Tag: string}[] = [];
            res.forEach((tag: { key: number; Tag: string }) => {
              temp.push({
                key: tag.id,
                Tag: tag.tag
              });
            });
            setTags(temp);
            console.log("tags:", tags);
          })
          const temp = [];
          res.forEach((res: Note) => {
          temp.push({
            id: res.id,
            note_h1: res.note_h1,
            note: res.note,
            img: res.img,
            color: res.color,
            date: res.date,
            tag_id: res.tag_id
          });
          });
          temp.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-')); // Convert 'DD/MM/YYYY' to 'YYYY-MM-DD'
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB.getTime() - dateA.getTime();
        });
        if(value == ''){ /*All notes*/
          setNotes(temp);
          // console.log("notes contains: ", notes, ", res:", res);
        }
        else if (value !== '') { /*Specific tag*/
          const selectedTag = tags.find(tag => tag.Tag === value);
          // console.log("selectedTag:", selectedTag);
          if (selectedTag!=null) {
            const filteredNotes = temp.filter((note: Note) => {
              console.log("Checking note:", note, "with tag_id:", note.tag_id);
              return note.tag_id === selectedTag.key;
          });
            setNotes(filteredNotes);
            console.log("Filtered notes based on selected tag:", filteredNotes);
          } else {
            console.log("Tag not found:", value);
          }
        }
      }    
  });
}
function GetFilterTags({ notes }: { notes: Note[] }) {
  const [tags, setTags] = useState<{key: number, value: string, label: string }[]>([]);

  useEffect(() => {
    const userID = 1; // Placeholder user ID, replace with actual authentication
    getTagsByUser(userID).then((res) => {
      if (res.length > 0) {
        console.log("res:", res);
        const newTags = res.map((tag: { key: number; tag: string }) => ({
          key: tag.key,
          label: `Filter by tag: ${tag.tag}`,
          value: tag.tag
        }));
        setTags(newTags);
        // console.log("tags:", tags);
      } else {
        console.log("No tags found for user");
      }
    }).catch(error => {
      console.error("Error fetching tags:", error);
    });
  }, []);
  // tags.map((tag) => ({
  //   label: `Filter by tag: ${tag.value}`, 
  //   value: tag.value
  // }));
  // console.log("tagoptions:", tagOptions);
  return tags;
}

function NoteItem({ note, setOpnNote }: { note: Note; setOpnNote: Dispatch<SetStateAction<Note | null>> }) {
  return (
    <Pressable style={[noteStyle.note, { borderWidth: 2, borderColor: note.color, width: '80%' }]} onPress={() => setOpnNote(note)}>
      <Text style={[noteStyle.noteH1, { textDecorationLine: 'underline', textDecorationColor: note.color }]}>{note.note_h1}</Text>
      <Text style={noteStyle.truncatedText} numberOfLines={3} ellipsizeMode="tail">
        {note.note}
      </Text>
      <Text style={noteStyle.noteText}>Last edited: {note.date}</Text>
    </Pressable>
  );
}

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [opnNote, setOpnNote] = useState<Note | null>(null);
  const [onClose, setOnClose] = useState(false);
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState<{key: number, Tag: string}[]>([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  useEffect(() => {
      LoadNotes({ notes, setNotes, value, tags, setTags});
  }, [value]);

  const filterTags = GetFilterTags({ notes });

  return (
    <>
      <SafeAreaView style={basic.centeredView}>
      {onClose && 
            <NotepadPopup
              setOnClose={setOnClose}
              setNotes={setNotes}
              notes={notes}
            />}
        <Pressable
          style={[noteStyle.backButton, noteStyle.buttonOpen]}
          onPress={() => setOnClose(true)}>
          <Text style={noteStyle.textStyle}>Write a new note</Text>
        </Pressable>
        <DropDownPicker
        style={{ width: '70%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}
          open={open}
          value={value}
          // onChange={console.log("selected tag:", value)}
          items={[
            {label:"Select tag", value: ''},// tähän asia joka vaihtuu riippuen siitö onko painettu via ei
            ...GetFilterTags({ notes })
          ]}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      <Stack.Screen options={{ title: 'Notes' }} />
      {opnNote && <BigModal note={opnNote} setOpnNote={setOpnNote} notes={notes} setNotes={setNotes}/>}
      <View style={basic.container}>
        {notes.map((note) => (
          <NoteItem key={note.note_h1} note={note} setOpnNote={setOpnNote} />
        ))}
      </View>
        </SafeAreaView>
    </>
  );
}

export {Notes,LoadNotes};
