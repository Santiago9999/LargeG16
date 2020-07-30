package com.example.triviacrevice.pages;
import com.example.triviacrevice.R;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

// Login/Register page.
public class loginRegister extends Fragment
{
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_login_register, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState)
    {
        super.onViewCreated(view, savedInstanceState);
        view.findViewById(R.id.loginButton).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                NavHostFragment.findNavController(loginRegister.this)
                        .navigate(R.id.action_LoginRegister_to_Login);
            }
        });

        view.findViewById(R.id.registerButton).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                System.out.println("Register");
                NavHostFragment.findNavController(loginRegister.this)
                        .navigate(R.id.action_LoginRegister_to_Register);
            }
        });
    }
}