package com.example.triviacrevice;

import androidx.appcompat.app.AppCompatActivity;
import com.example.triviacrevice.R;

import android.os.Bundle;
import android.os.StrictMode;

public class MainActivity extends AppCompatActivity
{
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
    }
}