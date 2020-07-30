package com.example.triviacrevice.objects;

public enum Endpoint {

	// User
	RegisterUser("postregister"),
	GetUser("getLogin"),
	ChangePassword("postChangePassword"),
	
	// Questions
	AddQuestion("addQuestion"),
	GetQuestion("getQuestion"),
	
	// Getting Scores
	TotalScores("getTotalHighScores"),
	IntroScores("getIntroHighScores"),
	CS1Scores("getCS1HighScores"),
	CS2Scores("getCS2HighScores"),
	
	// Update Scores
	UpdateIntro("UpdateIntro"),
	UpdateCS1("UpdateCS1"),
	UpdateCS2("UpdateCS2"),
	
	// Email Validation
	ValidateEmail("postvalidateUser");
	
	
	private String endpoint;
	private Endpoint(String endpoint) {
		this.endpoint = endpoint;
	}
	
	@Override
	public String toString() {
		return endpoint;
	}
}
