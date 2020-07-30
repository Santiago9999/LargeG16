package com.example.triviacrevice.objects;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Question {

	private static HashMap<TriviaCategory, ArrayList<Question>> questions;

	/**
	 * Loads the questions from the database. This must be called when a user
	 * starts a game to ensure that all questions are retrieved and reset.
	 */
	public static void loadQuestions() {
		questions = new HashMap<TriviaCategory, ArrayList<Question>>();
		questions.put(TriviaCategory.Total, new ArrayList<Question>());

		try {
			for (TriviaCategory tc : TriviaCategory.values()) {
				if (!tc.isPlayable()) continue;
				questions.put(tc, new ArrayList<Question>());

				Map<String, String> args = new HashMap<String, String>();
				args.put("category", tc.toString());

				String s = API.getAPICall(Endpoint.GetQuestion, args);
				JSONParser parser = new JSONParser();
				JSONArray jarr = (JSONArray)parser.parse(s);

				for (String x : API.convertArray(jarr)) {
					JSONObject json = (JSONObject)parser.parse(x);
					Question q = new Question();
					q.question = json.get("Question").toString();
					q.category = tc;
					q.answers.add(json.get("PossibleAnswer1").toString());
					q.answers.add(json.get("PossibleAnswer2").toString());
					q.answers.add(json.get("PossibleAnswer3").toString());
					q.answers.add(json.get("PossibleAnswer4").toString());
					q.shuffleAnswers();
					questions.get(tc).add(q);
					questions.get(TriviaCategory.Total).add(q);
				}

				Collections.shuffle(questions.get(tc));
			}

			Collections.shuffle(questions.get(TriviaCategory.Total));
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Returns an unused Question for the given TriviaCategory. If there are
	 * no questions remaining, this method returns null.
	 *
	 * @param tc  The TriviaCategory to retrieve a question from
	 * @return an unused Question or null, if there are no questions left
	 */
	public static Question getUnusedQuestion(TriviaCategory tc) {
		if (questions.get(tc) == null) return null;
		for (Question q : questions.get(tc)) {
			if (!q.used) {
				q.used = true;
				return q;
			}
		}

		return null;
	}

	/////////////////////////////////////////////////

	private String question;
	private TriviaCategory category;
	private ArrayList<String> answers;
	private int correct;
	private boolean used;

	private Question() {
		answers = new ArrayList<String>();
	}

	/**
	 * @return the question
	 */
	public String getQuestion() {
		return question;
	}

	/**
	 * @return the category of the question
	 */
	public TriviaCategory getCategory() {
		return category;
	}

	/**
	 * @return an array of answers
	 */
	public String[] getAnswers() {
		return answers.toArray(new String[0]);
	}

	/**
	 * @return the index of the correct answer
	 */
	public int getCorrectIndex() {
		return correct;
	}

	/**
	 * @return the correct answer
	 */
	public String getCorrectAnswer() {
		return answers.get(correct);
	}

	private void shuffleAnswers() {
		String correct = answers.get(0);
		Collections.shuffle(answers);

		for (int q = 0; q < answers.size(); q++) {
			if (correct.equals(answers.get(q))) {
				this.correct = q;
				break;
			}
		}
	}
}
