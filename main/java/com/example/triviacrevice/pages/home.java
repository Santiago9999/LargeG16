package com.example.triviacrevice.pages;

import com.example.triviacrevice.R;
import com.example.triviacrevice.objects.*;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;


public class home extends Fragment {

    TextView userText;

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        userText = view.findViewById(R.id.userText);
        userText.setText(Player.getEmail());

        // If "Start Game" button clicked.
        view.findViewById(R.id.startButton).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                Question.loadQuestions(); // Reset and load all questions for new game.
                NavHostFragment.findNavController(home.this) // Navigate to question page.
                        .navigate(R.id.action_Home_to_Category);
            }
        });

        // If "Logout" button clicked.
        view.findViewById(R.id.logoutButton).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                NavHostFragment.findNavController(home.this)
                        .navigate(R.id.action_Home_to_LoginRegister);
            }
        });
    }
}