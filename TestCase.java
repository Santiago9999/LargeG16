package test;

import java.util.concurrent.ThreadLocalRandom;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import api.IncorrectPasswordException;
import api.TriviaCategory;
import api.User;
import api.UserNotRegisteredException;
import api.UserNotVerifiedException;
import api.Util;

class TestCase {

	private static final String email = "ctsn99@gmail.com";
	private static final String email2 = "cqwocrlvmdyogakoic@ttirv.net";
	private static final String password = Util.hash("password");
	
	@Test
	void testUserExists() {
		try {
			User u = User.getUser(email, password);
			Assertions.assertNotNull(u);
		} catch (UserNotRegisteredException e) {
		} catch (UserNotVerifiedException e) {
		} catch (IncorrectPasswordException e) {
		}
	}
	
	@Test
	void testUserNotRegistered() {
		try {
			User.getUser("randomemail@gmail.com", password);
		} catch (UserNotRegisteredException e) {
			Assertions.assertTrue(true);
		} catch (UserNotVerifiedException e) {
		} catch (IncorrectPasswordException e) {
		}
	}

	@Test
	void testUserNotVerified() {
		try {
			User.getUser(email2, password);
		} catch (UserNotRegisteredException e) {
		} catch (UserNotVerifiedException e) {
			Assertions.assertTrue(true);
		} catch (IncorrectPasswordException e) {
		}
	}
	
	@Test
	void testIncorrectPassword() {
		try {
			User.getUser(email, Util.hash("incorrect"));
		} catch (UserNotRegisteredException e) {
		} catch (UserNotVerifiedException e) {
		} catch (IncorrectPasswordException e) {
			Assertions.assertTrue(true);
		}
	}
	
	@Test
	void testFirstName() {
		try {
			User u = User.getUser(email, password);
			Assertions.assertEquals(u.getFirstName(), "Christopher");
		} catch (UserNotRegisteredException e) {
		} catch (UserNotVerifiedException e) {
		} catch (IncorrectPasswordException e) {
		}
	}
	
	@Test
	void testLastName() {
		try {
			User u = User.getUser(email, password);
			Assertions.assertEquals(u.getLastName(), "Stephens");
		} catch (UserNotRegisteredException e) {
		} catch (UserNotVerifiedException e) {
		} catch (IncorrectPasswordException e) {
		}
	}
	
	@Test
	void testId() {
		try {
			User u = User.getUser(email, password);
			Assertions.assertEquals(u.getId(), "5f21e19091d2e800048af8cc");
		} catch (UserNotRegisteredException e) {
		} catch (UserNotVerifiedException e) {
		} catch (IncorrectPasswordException e) {
		}
	}
	
	@Test
	void testPushScore() {
		final int cases = 100;
		
		for (int q = 0; q < cases; q++) {
			try {
				int correct = ThreadLocalRandom.current().nextInt(50, 100) + 1;
				int incorrect = ThreadLocalRandom.current().nextInt(0, 6);
				
				User u = User.getUser(email, password);
				u.pushScore(TriviaCategory.Intro, correct, incorrect);
				User u2 = User.getUser(email, password);
				Assertions.assertEquals(u2.getStatistic(TriviaCategory.Intro).getTotalCorrect(), u.getStatistic(TriviaCategory.Intro).getTotalCorrect() + correct);
				Assertions.assertEquals(u2.getStatistic(TriviaCategory.Intro).getTotalAttempted(), u.getStatistic(TriviaCategory.Intro).getTotalAttempted() + correct + incorrect);
			} catch (UserNotRegisteredException e) {
			} catch (UserNotVerifiedException e) {
			} catch (IncorrectPasswordException e) {
			}
		}
	}
}
