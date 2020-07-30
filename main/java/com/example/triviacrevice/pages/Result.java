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
import com.example.triviacrevice.objects.IncorrectPasswordException;
import com.example.triviacrevice.objects.Player;
import com.example.triviacrevice.objects.TriviaCategory;
import com.example.triviacrevice.objects.User;
import com.example.triviacrevice.objects.UserNotRegisteredException;
import com.example.triviacrevice.objects.UserNotVerifiedException;
import com.example.triviacrevice.objects.Util;

public class Result extends Fragment {

    TextView userText;
    TextView livesText;

    TextView finalResultText;

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_result, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        livesText = view.findViewById(R.id.livesText3);
        livesText.setText(Integer.toString(Player.getLives()));

        finalResultText = view.findViewById(R.id.finalText);
        String s;
        if (Player.getLives() > 0)
            s = "Congratulations, You Won!";
        else
            s = "Sorry. It's Over.";
        finalResultText.setText(s);

        System.out.println("Hey There: " + Player.getCategory() + ", " + (long)Player.getCorrect() + ", " + (long)Player.getIncorrect());
        Player.user.pushScore(Player.getCategory(), Player.getCorrect(), Player.getIncorrect());
        try {
            System.out.println(User.getUser(Player.getEmail(), Util.hash("qwerty")).getStatistic(TriviaCategory.Intro).getHighScore());
        } catch (UserNotRegisteredException e) {
            e.printStackTrace();
        } catch (UserNotVerifiedException e) {
            e.printStackTrace();
        } catch (IncorrectPasswordException e) {
            e.printStackTrace();
        }

        // To restart game.
        view.findViewById(R.id.restartButton).setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Player.resetGame();
                NavHostFragment.findNavController(Result.this)
                        .navigate(R.id.action_Result_to_Category);
            }
        });

        // To go back to home screen.
        view.findViewById(R.id.homeButton).setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Player.resetGame();
                NavHostFragment.findNavController(Result.this)
                        .navigate(R.id.action_Result_to_Home);
            }
        });

        // To logout.
        view.findViewById(R.id.logout).setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Player.resetGame();
                NavHostFragment.findNavController(Result.this)
                        .navigate(R.id.action_Result_to_LoginRegister);
            }
        });
    }
}