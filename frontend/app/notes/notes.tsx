import { View, Text, Pressable, Modal, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {getNotes} from '../../services/notes.service';
import NotepadPopup from '@/app/notes/writeanote';
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
}

function LoadNotes({ notes, setNotes, filters }: { notes: Note[]; setNotes: Dispatch<SetStateAction<Note[]>>; filters: string }) {
  setNotes([]);
  const userID = 1;
    if (filters == '') {
      getNotes(userID).then((res) => {
        if (res.length <= 0) {
          console.log("notes null: ", notes, ", res:", res);
        } else {
          const temp = [];
          res.forEach((res: Note) => {
          temp.push({
            id: res.id,
            note_h1: res.note_h1,
            note: res.note,
            img: res.img,
            color: res.color,
            date: res.date
          });
          });
          temp.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-')); // Convert 'DD/MM/YYYY' to 'YYYY-MM-DD'
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB.getTime() - dateA.getTime();
        });
          setNotes(temp);
          console.log("notes contains: ", notes, ", res:", res);
        }
      });
    }
    else if (filters == '') {

    }
};
function NoteItem({ note, setOpnNote }: { note: Note; setOpnNote: Dispatch<SetStateAction<Note | null>> }) {
  return (
    <Pressable style={[noteStyle.note, { border: 1, borderStyle: 'solid', borderColor: note.color }]} onPress={() => setOpnNote(note)}>
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
  const [filters, setFilters] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  useEffect(() => {
      LoadNotes({ notes, setNotes, filters});
  }, [/*notes*/]);

  return (
    <>
      <SafeAreaView style={basic.centeredView}>
      {onClose && 
            <NotepadPopup
              setOnClose={setOnClose}
              setNotes={setNotes}
            />}
        <Pressable
          style={[noteStyle.backButton, noteStyle.buttonOpen]}
          onPress={() => setOnClose(true)}>
          <Text style={noteStyle.textStyle}>Write a new note</Text>
        </Pressable>
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
