import { View, Text, Pressable, Modal, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {getNotes, deleteNotes} from '../services/notes.service';
import NotepadPopup from '@/app/writeanote';
//Styles
import {basic} from './styles/basics'; 
import {noteStyle} from './styles/noteStyle';
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
const sendDeleteNote = async (id: number, setNotes: Dispatch<SetStateAction<Note[]>>) => {
  console.log('sendDeleteNote called with id:', id);
  try{
      const result = await deleteNotes(id);
          if (result) {
            Alert.alert('Note deleted successfully!');
            setNotes(notes => notes.filter(note => note.id !== id));
          } else {
            Alert.alert('Failed to delete note.');
          }
        } catch (error) {
          console.error('Error deleting note:', error);
        }
}
function BigModal({ note, setOpnNote, setNotes}: { note: Note | null; setOpnNote: Dispatch<SetStateAction<Note | null>>; setNotes: Dispatch<SetStateAction<Note[]>> }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View style={basic.overlay}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={note !== null}
        onRequestClose={() => setOpnNote(null)}
        style={noteStyle.inspectionModal}>
        <View style={basic.centeredView}>
          <View style={basic.modalView}>
          <Pressable
              onPress={() => setOpnNote(null)}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={[
                noteStyle.closeButton,
                isPressed && noteStyle.closeButtonPressed,
              ]}
            >
              <Text style={noteStyle.closeText}>Close</Text>
            </Pressable>
            <Text style={noteStyle.noteH1}>{note?.note_h1}</Text>
            <Text style={noteStyle.noteText}>{note?.note}</Text>
            <Text style={noteStyle.noteText}>{note?.date}</Text>
            <Pressable
              onPress={() => {note && sendDeleteNote(note.id, setNotes);console.log('Note object:', note);setOpnNote(null)}}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={[
                noteStyle.deleteButton,
                isPressed && noteStyle.deleteButtonPressed,
              ]}>
              <Text style={noteStyle.closeText}>DELETE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  const [onSave, setOnSave] = useState({});
  const [which, setWhich] = useState(null);

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

export { Notes, loadNotes };
