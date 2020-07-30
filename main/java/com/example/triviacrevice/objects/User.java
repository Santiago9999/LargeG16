package com.example.triviacrevice.objects;

import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class User {

	/**
	 * Registers a user with the given information.
	 * 
	 * @param firstName  the first name of the user
	 * @param lastName  the last name of the user
	 * @param email  the email of the user
	 * @param password  the hashed password of the user
	 */
	public static void registerUser(String firstName, String lastName, String email, String password) {
		Map<String, String> args = new HashMap<String, String>();
		args.put("firstName", firstName);
		args.put("lastName", lastName);
		args.put("email", email);
		args.put("password", password);
		
		API.getAPICall(Endpoint.RegisterUser, args);
	}
	
	/**
	 * Validates a user with the given code.
	 * 
	 * @param email  the email of the user
	 * @param code  the code the user enters
	 */
	public static void validateUser(String email, String code) {
		Map<String, String> args = new HashMap<String, String>();
		args.put("email", email);
		args.put("code", code);
		
		API.getAPICall(Endpoint.ValidateEmail, args);
	}
	
	/**
	 * Pushes a player's score to the database.
	 * 
	 * @param category  the TriviaCategory the user played
	 * @param correct  the number of correct answers
	 * @param incorrect  the number of incorrect answers
	 */
	public void pushScore(TriviaCategory category, long correct, long incorrect) {
		Map<String, String> args = new HashMap<String, String>();
		args.put("_id", id);
		args.put("firstName", firstName);
		args.put("lastName", lastName);
		args.put("numberOfCorrect", Long.toString(correct));
		args.put("numberOfAttempted", Long.toString(correct + incorrect));
		
		switch (category) {
		case Intro:
			API.getAPICall(Endpoint.UpdateIntro, args);
			break;
		case CS1:
			API.getAPICall(Endpoint.UpdateCS1, args);
			break;
		case CS2:
			API.getAPICall(Endpoint.CS2Scores, args);
			break;
		case Total:
			break;
		}
	}
	
	/**
	 * Retrieves a user object.
	 * 
	 * @param email  the email of the user
	 * @param password  the hashed password of the user
	 * @return the User object
	 * @throws UserNotRegisteredException  the account does not exist
	 * @throws UserNotVerifiedException  the user's account is not verified
	 * @throws IncorrectPasswordException  the user has provided an incorrect password
	 */
	public static User getUser(String email, String password) throws UserNotRegisteredException, UserNotVerifiedException, IncorrectPasswordException {
		Map<String, String> args = new HashMap<String, String>();
		args.put("email", email);
		args.put("password", password);
		String str = API.getAPICall(Endpoint.GetUser, args);
		
		try {
			JSONObject json = (JSONObject)(new JSONParser().parse(str));
			
			String error = json.get("error").toString();
			if (error.equals("Account does not exist")) {
				throw new UserNotRegisteredException();
			} else if (error.equals("Account not validated")) {
				throw new UserNotVerifiedException();
			} else if (error.equals("Incorrect Password")) {
				throw new IncorrectPasswordException();
			}
			
			User user = new User();
			
			user.id = json.get("ID").toString();
			user.firstName = json.get("firstName").toString();
			user.lastName = json.get("lastName").toString();
			
			// Stats
			for (TriviaCategory tc : TriviaCategory.values()) {
				JSONObject tcJson = (JSONObject)json.get(tc.toString());
				long high = Long.parseLong(tcJson.get("HighScore").toString());
				long correct = Long.parseLong(tcJson.get("TotalCorrect").toString());
				long attempt = Long.parseLong(tcJson.get("TotalAttempted").toString());
				Statistic stat = new Statistic(high, correct, attempt);
				user.stats.put(tc, stat);
			}
			
			return user;
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	//////////////////////////////////////////////////////
	
	private String id, firstName, lastName;
	private HashMap<TriviaCategory, Statistic> stats;
	
	private User() {
		stats = new HashMap<TriviaCategory, Statistic>();
	}
	
	/**
	 * @return the User's ID
	 */
	public String getId() {
		return id;
	}
	
	/**
	 * @return the User's first name
	 */
	public String getFirstName() {
		return firstName;
	}
	
	/**
	 * @return the User's last name
	 */
	public String getLastName() {
		return lastName;
	}
	
	/**
	 * @param category  the TriviaCategory to get the statistics of
	 * @return the Statistic of the given category
	 */
	public Statistic getStatistic(TriviaCategory category) {
		return stats.get(category);
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(String.format("ID: %s\nName: %s %s\nScores:\n", id, firstName, lastName));
		
		for (TriviaCategory tc : TriviaCategory.values()) {
			sb.append(String.format("\t%s - High %,d ; Correct %,d ; Attempt %,d\n", tc.name(), stats.get(tc).getHighScore(), stats.get(tc).getTotalCorrect(), stats.get(tc).getTotalAttempted()));
		}
		
		return sb.toString();
	}
}
