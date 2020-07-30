package com.example.triviacrevice.objects;

public class Player
{
	private static int lives = 0;
	private static int correct = 0;
	private static int incorrect = 0;
	private static TriviaCategory category;
	private static String email = "";
	public static User user;

//	public Player(String name)
//	{
//		setName(name);
//	}

	public static String getEmail()
	{
		return email;
	}

	public static void setEmail(String name)
	{
		email = name;
	}

	public static int getLives() { return lives; }

	public static void setLives(int n) { lives = n; }

	public static TriviaCategory getCategory() { return category; }

	public static void setCategory(TriviaCategory c) { category = c; }

	public static int getCorrect() { return correct; }

	public static int getIncorrect() { return incorrect; }

	public static void setUser(User u) { user = u; }

	public static void correctAnswer()
	{
		correct++;
	}

	public static void incorrectAnswer()
	{
		lives--;
		incorrect++;
	}

	public static void resetGame()
	{
		incorrect = 0;
		correct = 0;
		lives = 3;
		Question.loadQuestions();
	}
}