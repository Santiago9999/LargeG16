package com.example.triviacrevice.pages;

import android.os.Bundle;
import com.example.triviacrevice.R;
import com.example.triviacrevice.objects.*;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import java.util.Random;

public class questionPage extends Fragment {

    TextView userText;
    TextView livesText;
    TextView qText;

    Button [] buttons;

    public static Question q;

    public static int chosenIndex;

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_question, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState)
    {
        super.onViewCreated(view, savedInstanceState);

        livesText = view.findViewById(R.id.livesText2);
        livesText.setText(Integer.toString(Player.getLives()));

        qText = view.findViewById(R.id.textView);
        qText.setText(q.getQuestion());

        // Initialize buttons.
        buttons = new Button[4];
        buttons[0] = view.findViewById(R.id.aButton);
        buttons[1] = view.findViewById(R.id.bButton);
        buttons[2] = view.findViewById(R.id.cButton);
        buttons[3] = view.findViewById(R.id.dButton);
        chosenIndex = -1;

        // Set button text to answers.
        //q = Question.getUnusedQuestion(Player.getCategory());
        if (q != null)
            for (int i = 0; i < 4; i++)
            {
                if (q.getAnswers() != null)
                    buttons[i].setText(q.getAnswers()[i]);
            }

        buttons[0].setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
            chosenIndex = 0;
            System.out.println("Chose " + 0);
            NavHostFragment.findNavController(questionPage.this)
                    .navigate(R.id.action_Question_to_Extra);
            }
        });
        buttons[1].setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
            chosenIndex = 1;
            System.out.println("Chose " + 1);
            NavHostFragment.findNavController(questionPage.this)
                    .navigate(R.id.action_Question_to_Extra);
            }
        });
        buttons[2].setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
            chosenIndex = 2;
            System.out.println("Chose " + 2);
            NavHostFragment.findNavController(questionPage.this)
                    .navigate(R.id.action_Question_to_Extra);
            }
        });
        buttons[3].setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
            chosenIndex = 3;
            System.out.println("Chose " + 3);
            NavHostFragment.findNavController(questionPage.this)
                    .navigate(R.id.action_Question_to_Extra);
            }
        });
    }
}