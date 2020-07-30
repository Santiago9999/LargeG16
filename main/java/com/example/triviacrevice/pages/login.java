package com.example.triviacrevice.pages;
import com.example.triviacrevice.R;
import com.example.triviacrevice.objects.IncorrectPasswordException;
import com.example.triviacrevice.objects.Player;
import com.example.triviacrevice.objects.User;
import com.example.triviacrevice.objects.UserNotRegisteredException;
import com.example.triviacrevice.objects.UserNotVerifiedException;
import com.example.triviacrevice.objects.Util;

import android.graphics.Color;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

public class login extends Fragment {
    TextView tv;

    EditText user;
    EditText pass;

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_login, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Initialize text fields and views.
        user = view.findViewById(R.id.usernameEnter);
        pass = view.findViewById(R.id.passwordEnter);
        tv = view.findViewById(R.id.textView);

        // If login button clicked.
        view.findViewById(R.id.loginButton).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
            String emailString = user.getText().toString();
            String passString = pass.getText().toString();
            String hash = Util.hash(passString);

            // Go to next page if valid login.
//            if (emailString.equals("bob@gmail.com") && passString.equals("password")) {
//                Player.setEmail(emailString);
//                NavHostFragment.findNavController(login.this)
//                        .navigate(R.id.action_Login_to_Home);
//                //Player.setName("Temporary Username");
//            }
            User u;
            String error;
            try {
                System.out.println(emailString + ", " + hash);
                u = User.getUser(emailString, hash);
                Player.setEmail(emailString);
                Player.setUser(u);
                NavHostFragment.findNavController(login.this)
                    .navigate(R.id.action_Login_to_Home);
            } catch (UserNotRegisteredException e) {
                error = "User doesn't exist.";
                tv.setText(error);
                tv.setTextColor(Color.RED);
                e.printStackTrace();
            } catch (UserNotVerifiedException e) {
                error = "Unverified user.";
                tv.setText(error);
                tv.setTextColor(Color.RED);
                e.printStackTrace();
            } catch (IncorrectPasswordException e) {
                e.printStackTrace();
                error = "Password incorrect.";
                tv.setText(error);
                tv.setTextColor(Color.RED);
            }
            }
        });

        // Back button.
        view.findViewById(R.id.backSubmit).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                NavHostFragment.findNavController(login.this)
                        .navigate(R.id.action_Login_to_LoginRegister);
            }
        });
    }
}