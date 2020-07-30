package com.example.triviacrevice.pages;
import com.example.triviacrevice.R;
import com.example.triviacrevice.objects.User;

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

import static com.example.triviacrevice.objects.User.validateUser;

public class validation extends Fragment {

    TextView tv;
    EditText code;

    int temp = 1;

    // TODO: figure out how to store actual email.
    String email;

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_validation, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Initialize text fields and views.
        code = view.findViewById(R.id.codeEnter);
        tv = view.findViewById(R.id.codeText);

        // If login button clicked.
        view.findViewById(R.id.submit).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                String codeString = code.getText().toString();
                User.validateUser(register.userString, codeString); // NOT DONE

                NavHostFragment.findNavController(validation.this)
                        .navigate(R.id.action_Validate_to_LoginRegister);
            }
        });

        // Home button.
        view.findViewById(R.id.home).setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View view)
            {
                NavHostFragment.findNavController(validation.this)
                        .navigate(R.id.action_Validate_to_LoginRegister);
            }
        });
    }
}