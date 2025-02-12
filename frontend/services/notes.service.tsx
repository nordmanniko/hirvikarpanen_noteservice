import api from './api';
import React, {useState} from 'react';

const getNotes = async (userID: number) => {
try {
    const response = await api.get(`/notes/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error('Error getting note:', error);
    return [];
  }
}
const deleteNotes = async (id: number) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    return [];
  }
}
const addNote = async (title: string, note: string, color: string, userID: number, tag_id: number) => {
  try{
    const response = await api.post('/notes/', {
      "note_h1": title,
      "note": note,
      "color": color,
      "date": new Date().toLocaleDateString('pt-PT'),
      "user_id": userID,
      ...(tag_id !== null && { "tag_id": tag_id })
    });
    return response;
    } catch (error) {
      console.error('Error adding note:', error);
      return [];
    }
  }
const editNote = async (id: number, title: string, note: string, userID: number) => {
  try {
    const response = await api.patch(`/notes/${id}`, {
      "note_h1": title,
      "note": note,
      "date": new Date().toLocaleDateString('pt-PT'), 
    });
    return response;
  } catch (error) {
    console.error('Error editing note:', error);
    return [];
  }
}
const getTagsByUser = async (userID: number) => {
  try {
      const response = await api.get(`/tags/user/${userID}`);
      return response.data;
    } catch (error) {
      console.error('Error getting tags:', error);
      return [];
    }
}
const getTagsByTagID = async (tagID: number) => {
  try {
      const response = await api.get(`/tags/${tagID}`);
      return response.data;
    } catch (error) {
      console.error('Error getting tags:', error);
      return [];
    }
}
const addTag = async (tag: string, userID: number) => {
  try {
      const response = await api.post('/tags/', {
        "tag": tag,
        "user_id": userID
      });
      return response;
    } catch (error) {
      console.error('Error adding tag:', error);
      return [];
    }
}
export {getNotes, deleteNotes, addNote, editNote, getTagsByUser, getTagsByTagID, addTag};