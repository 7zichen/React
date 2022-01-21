package com.aowin.dao;

import java.util.List;
import java.util.Map;

import com.aowin.entity.Note;

public interface NoteMapper {
	
	public void addNote(Note note);
	public List<Note> selectNote();
	public List<Note> selectUnverifyNotes();
	public int deleteNote(Long id);
	public int updateNote(Map map);
}
