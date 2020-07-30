package com.example.triviacrevice.objects;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Leaderboard {

	/**
	 * Retrieves the top <code>count</code> players of the given TriviaCategory
	 * 
	 * @param tc  the category to retrieve
	 * @param count  the number of players to retrieve
	 * @return the Leaderboard object
	 */
	public static Leaderboard getLeaderboard(TriviaCategory tc, int count) {
		Leaderboard board = new Leaderboard();
		
		try {
			String s = callAPI(tc, count);
			JSONParser parser = new JSONParser();
			JSONArray jarr = (JSONArray)parser.parse(s);
			
			for (String x : API.convertArray(jarr)) {
				JSONObject json = (JSONObject)parser.parse(x);
				LeaderboardUser u = new LeaderboardUser();
				u.firstName = json.get("FirstName").toString();
				u.lastName = json.get("LastName").toString();
				long high = Long.parseLong(json.get("HighScore").toString());
				long correct = Long.parseLong(json.get("TotalCorrect").toString());
				long attempt = Long.parseLong(json.get("TotalAttempted").toString());
				u.stats = new Statistic(high, correct, attempt);
				board.users.add(u);
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return board;
	}
	
	private static String callAPI(TriviaCategory tc, int count) {
		Map<String, String> args = new HashMap<String, String>();
		args.put("numberOfSpots", Integer.toString(count));
		
		switch (tc) {
		case Intro:
			return API.getAPICall(Endpoint.IntroScores, args);
		case CS1:
			return API.getAPICall(Endpoint.CS1Scores, args);
		case CS2:
			return API.getAPICall(Endpoint.CS2Scores, args);
		case Total:
			return API.getAPICall(Endpoint.TotalScores, args);
		}
		
		return null;
	}
	
	////////////////////////////////////////////////////////////////////////
	
	private ArrayList<LeaderboardUser> users;
	private Leaderboard() {
		users = new ArrayList<LeaderboardUser>();
	}
	
	public LeaderboardUser[] getUsers() {
		Collections.sort(users);
		return users.toArray(new LeaderboardUser[0]);
	}
	
	public static class LeaderboardUser implements Comparable<LeaderboardUser> {

		private String firstName, lastName;
		private Statistic stats;
		
		private LeaderboardUser() {}
		
		/**
		 * @return the name of the player
		 */
		public String getName() {
			return firstName + " " + lastName;
		}
		
		/**
		 * @return the Statistic object of the player
		 */
		public Statistic getStatistics() {
			return stats;
		}
		
		@Override
		public int compareTo(LeaderboardUser that) {
			return Long.compare(this.stats.getHighScore(), that.stats.getHighScore());
		}
	}
}
