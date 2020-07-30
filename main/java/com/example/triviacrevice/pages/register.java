package com.example.triviacrevice.pages;

import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

import com.example.triviacrevice.R;
import com.example.triviacrevice.objects.Player;
import com.example.triviacrevice.objects.User;
import com.example.triviacrevice.objects.Util;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

public class register extends Fragment {
    TextView tv;

    EditText first, last, user, pass;

    public static String userString;

    String firstString, lastString, hashedPass;

    int temp = 1;

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_register, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Initialize text fields and views.
        first = view.findViewById(R.id.firstName);
        last = view.findViewById(R.id.lastName);
        user = view.findViewById(R.id.usernameEnter);
        pass = view.findViewById(R.id.passwordEnter);

        tv = view.findViewById(R.id.registerText);

        // If login button clicked.
        view.findViewById(R.id.registerSubmit).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                firstString = first.getText().toString();
                lastString = last.getText().toString();
                userString = user.getText().toString();
                hashedPass = Util.hash(pass.getText().toString());

                System.out.println(firstString + ", " + lastString + ", " + userString + ", " + hashedPass);
                User.registerUser(firstString, lastString, userString, hashedPass);
                // TODO: Store whether valid register.

                NavHostFragment.findNavController(register.this)
                        .navigate(R.id.action_Register_to_Validate);
//                else
//                {
//                    String s = "Invalid register.";
//                    tv.setTextColor(Color.RED);
//                    tv.setText(s);
//                }
            }
        });

        // Back button.
        view.findViewById(R.id.backSubmit).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                System.out.println("Register");
                NavHostFragment.findNavController(register.this)
                        .navigate(R.id.action_Register_to_LoginRegister);
            }
        });
    }
}