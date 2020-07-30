package com.example.triviacrevice.objects;

public enum TriviaCategory {

	Intro("Intro", true),
	CS1("CS1", true),
	CS2("CS2", true),
	Total("Total", false);
	
	private String string;
	private boolean playable;
	private TriviaCategory(String string, boolean playable) {
		this.string = string;
		this.playable = playable;
	}
	
	public boolean isPlayable() {
		return playable;
	}
	
	@Override
	public String toString() {
		return string;
	}
}
