import { View, Text, Pressable, Modal, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {getNotes} from '../../services/notes.service';
import NotepadPopup from '@/app/notes/writeanote';
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
  date: string;
}

const loadNotes = (notes: Note[], setNotes: Dispatch<SetStateAction<Note[]>>) => {
  setNotes([]);
  const userID = 1;
  getNotes(userID).then((res) => {
    if (res.length <= 0) {
      setNotes(res);
      console.log("notes null: ", notes, ", res:", res);
    } else {
      setNotes(res);
      console.log("notes contains: ", notes, ", res:", res);
    }
  });
};
function NoteItem({ note, setOpnNote }: { note: Note; setOpnNote: Dispatch<SetStateAction<Note | null>> }) {
  return (
    <Pressable style={noteStyle.note} onPress={() => setOpnNote(note)}>
      <Text style={noteStyle.noteH1}>{note.note_h1}</Text>
      <Text style={noteStyle.truncatedText} numberOfLines={3} ellipsizeMode="tail">
        {note.note}
      </Text>
      <Text style={noteStyle.noteText}>{note.date}</Text>
    </Pressable>
  );
}

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [opnNote, setOpnNote] = useState<Note | null>(null);
  const [onClose, setOnClose] = useState(false);

  useEffect(() => {
    loadNotes(notes, setNotes);
  }, []);

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
        </SafeAreaView>
      <Stack.Screen options={{ title: 'Notes' }} />
      {opnNote && <BigModal note={opnNote} setOpnNote={setOpnNote} setNotes={setNotes}/>}
      <View style={basic.container}>
        {notes.map((note) => (
          <NoteItem key={note.note_h1} note={note} setOpnNote={setOpnNote} />
        ))}
      </View>
    </>
  );
}

export default Notes;
