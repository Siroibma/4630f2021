package com.example.helloworld;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;

public class MainActivity extends AppCompatActivity {
    private Button button;
    private Button button2;
    private Button button3;
    private Button button4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button = (Button) findViewById(R.id.button);
        button2 = (Button) findViewById(R.id.button2);
        button3 = (Button) findViewById(R.id.button3);
        button4 = (Button) findViewById(R.id.button4);

        button4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openFactsPage();
            }
        });

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openResumeDoc();
            }
        });
        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openStockPage();
            }
        });
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openWeatherPage();
            }
        });

    }
    public void openFactsPage() {
        Intent intent = new Intent(this, Activity2.class);
        startActivity(intent);
    }

    public void openResumeDoc() {
        Uri uri = Uri.parse("https://www.linkedin.com/in/ambioris-lora-alora/");
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        startActivity(intent);
    }
    public void openWeatherPage() {
        Intent intent = new Intent(this, Activity3.class);
        startActivity(intent);
    }
    public void openStockPage() {
        Intent intent = new Intent(this, Activity4.class);
        startActivity(intent);
    }
}