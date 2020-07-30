package com.example.triviacrevice.objects;

public class Statistic {

	private long highScore;
	private long totalCorrect;
	private long totalAttempted;
	
	public Statistic(long highScore, long totalCorrect, long totalAttempted) {
		this.highScore = highScore;
		this.totalCorrect = totalCorrect;
		this.totalAttempted = totalAttempted;
	}
	
	/**
	 * @return the high score
	 */
	public long getHighScore() {
		return highScore;
	}
	
	/**
	 * @return the number of correct answers
	 */
	public long getTotalCorrect() {
		return totalCorrect;
	}
	
	/**
	 * @return the number of attemted questions
	 */
	public long getTotalAttempted() {
		return totalAttempted;
	}
	
	/**
	 * @return the percent of questions answered correctly
	 */
	public double getPercent() {
		if (totalAttempted == 0) return 0d;
		return 100d * totalCorrect / totalAttempted;
	}
}
