package com.example.triviacrevice.pages;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.triviacrevice.R;
import com.example.triviacrevice.objects.Player;
import com.example.triviacrevice.objects.Question;
import com.example.triviacrevice.objects.TriviaCategory;

public class category extends Fragment {

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_category, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        Player.resetGame();

        // Intro to C category.
        view.findViewById(R.id.intro).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                Player.setCategory(TriviaCategory.Intro);
                questionPage.q = Question.getUnusedQuestion(Player.getCategory());
                NavHostFragment.findNavController(category.this)
                        .navigate(R.id.action_Category_to_Question);
            }
        });

        // CS1 category.
        view.findViewById(R.id.cs1).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                Player.setCategory(TriviaCategory.CS1);
                questionPage.q = Question.getUnusedQuestion(Player.getCategory());
                NavHostFragment.findNavController(category.this)
                        .navigate(R.id.action_Category_to_Question);
            }
        });

        // CS2 category.
        view.findViewById(R.id.cs2).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                Player.setCategory(TriviaCategory.CS2);
                questionPage.q = Question.getUnusedQuestion(Player.getCategory());
                NavHostFragment.findNavController(category.this)
                        .navigate(R.id.action_Category_to_Question);
            }
        });
    }
}