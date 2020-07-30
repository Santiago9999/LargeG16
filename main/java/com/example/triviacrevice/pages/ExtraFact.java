package com.example.triviacrevice.pages;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.triviacrevice.R;
import com.example.triviacrevice.objects.Player;
import com.example.triviacrevice.objects.Question;

public class ExtraFact extends Fragment {

    TextView userText;
    TextView livesText;
    TextView resultText;

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_extra_fact, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        livesText = view.findViewById(R.id.livesText);
        livesText.setText(Integer.toString(Player.getLives()));
	
        resultText = view.findViewById(R.id.answerResult);
        String s;
        if (questionPage.chosenIndex == questionPage.q.getCorrectIndex()) {
            Player.correctAnswer();
            s = "Correct!";
        }
        else {
            Player.incorrectAnswer();
            s = "That's too bad.";
        }
        resultText.setText(s);

        // If next button clicked.
        view.findViewById(R.id.nextButton).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
            // If dead, go to end screen. If not dead, but no more questions, go to end screen.
            // Otherwise, go back to question page with new question.
            if (Player.getLives() > 0) {
                questionPage.q = Question.getUnusedQuestion(Player.getCategory());
                if (questionPage.q != null) {
                    System.out.println("Not null.");
                    System.out.println(questionPage.q.getQuestion());
                    NavHostFragment.findNavController(ExtraFact.this)
                            .navigate(R.id.action_Extra_to_Question);
                }
                else {
                    System.out.println("It IS null.");
                    NavHostFragment.findNavController(ExtraFact.this)
                            .navigate(R.id.action_Extra_to_Result);
                }
            }
            else
                NavHostFragment.findNavController(ExtraFact.this)
                        .navigate(R.id.action_Extra_to_Result);
            }
        });
    }
}