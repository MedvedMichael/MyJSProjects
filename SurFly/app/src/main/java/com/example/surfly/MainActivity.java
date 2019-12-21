package com.example.surfly;


import android.annotation.SuppressLint;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.VibrationEffect;
import android.util.Log;
import android.view.HapticFeedbackConstants;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebSettings;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.Vibrator;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Toast;

import java.io.*;

import static android.content.Context.MODE_PRIVATE;

public class MainActivity extends AppCompatActivity {

    WebView webView;


    @SuppressLint("ClickableViewAccessibility")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_main);
        webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebChromeClient(new WebChromeClient());
        //webView.evaluateJavascript("js/script.js", null);
        webView.loadUrl("file:///android_asset/index.html");

        JavaScriptInterface javaScriptInterface = new JavaScriptInterface(this, webView);
        webView.addJavascriptInterface(javaScriptInterface, "Android");
        // javaScriptInterface.setResultsText(javaScriptInterface.readFile(javaScriptInterface.getRESULTS_FILE_NAME()));
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.setVerticalScrollBarEnabled(false);        // отключили прокрутку
        webView.setHorizontalScrollBarEnabled(false);      // отключили прокрутку
        webView.getSettings().setUseWideViewPort(false);
        //webView.getSettings().setJavaScriptEnabled(true);  // включили JavaScript
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ECLAIR_MR1) {
            webView.getSettings().setDomStorageEnabled(true);  // включили localStorage и т.п.
        }
        webView.getSettings().setSupportZoom(false);       // отключили зум, т.к. нормальные приложения подобным функционалом не обладают
        webView.getSettings().setSupportMultipleWindows(false);   // отключили поддержку вкладок.
        webView.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
//        javaScriptInterface.writeFile("0");

        // Т.к. пользователь должен сидеть в SPA приложении
        // прокидываем объект в JavaScript.

    }

    @Override
    public void onBackPressed() {
        webView.loadUrl("javascript: game.activeScene.onBackPressed();");
    }


    @Override
    public void onPause() {
        super.onPause();
        webView.loadUrl("javascript:  windowClose();");
        MainActivity.this.finish();
    }

    @Override
    public void onResume() {
        super.onResume();
        webView.loadUrl("javascript:  windowOpen();");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        webView.loadUrl("javascript:  windowClose();");
        MainActivity.this.finish();
    }

}

class JavaScriptInterface {
    private Activity activity;
    private WebView webView;

    public String getRESULTS_FILE_NAME() {
        return RESULTS_FILE_NAME;
    }

    private final String RESULTS_FILE_NAME = "results.txt";
    private final String SETTINGS_FILE_NAME = "settings.txt";
    private final String SAVED_COLOR = "color_rgb";
    private int[] colors = new int[3];
    private String resultsText;
    private SharedPreferences sPref;
    private String fpsText, colorText;

    JavaScriptInterface(Activity activity, WebView webView) {

        this.activity = activity;
        this.webView = webView;
        //writeFile("",SETTINGS_FILE_NAME);
        //writeFile("",RESULTS_FILE_NAME);
        //saveColor(0,0,0);
        loadColor();
        //setResultsText(readFile(RESULTS_FILE_NAME));
        resultsText = "";
        resultsText = readFile(RESULTS_FILE_NAME);
        if(resultsText == null)
        {
            resultsText = "00:00";
        }
        String fileText = readFile(SETTINGS_FILE_NAME);


        try {
            fpsText = fileText.split("\n")[0];
            colorText = fileText.split("\n")[1];
        } catch (Exception ex) {
            colorText = null;
            fpsText = null;
        }
        if (fpsText == null || colorText == null) {
            writeFile("60\n0", SETTINGS_FILE_NAME);
            fpsText = "60";
            colorText = "0";
        }
        //Log.i("KUKUSIKI",readFile(SETTINGS_FILE_NAME));
    }

    public void setResultsText(String resultsText) {
        this.resultsText = resultsText;
    }

    public void setFpsText(String fpsText) {
        this.fpsText = fpsText;
    }

    @JavascriptInterface
    public void saveColor(int red, int green, int blue) {
        sPref = activity.getPreferences(MODE_PRIVATE);
        SharedPreferences.Editor ed = sPref.edit();
        ed.putString(SAVED_COLOR, red + " " + green + " " + blue);
        ed.commit();
        // Toast.makeText(this, "Text saved", Toast.LENGTH_SHORT).show();
    }


    private void loadColor() {
        sPref = activity.getPreferences(MODE_PRIVATE);
        String savedText = sPref.getString(SAVED_COLOR, "");
        if (!savedText.equals("") && !savedText.equals("0 0 0")) {
            for (int i = 0; i < colors.length; i++)
                colors[i] = Integer.parseInt(savedText.split(" ")[i]);
        } else {
            colors = new int[]{255, 205, 0};
            saveColor(255, 205, 0);
        }
    }

    void writeFile(String text, String url) {
        try {
            // отрываем поток для записи
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
                    activity.openFileOutput(url, MODE_PRIVATE)));
            // пишем данные
            bw.write(text);
            // закрываем поток
            bw.close();
            //Log.d(LOG_TAG, "Файл записан");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    String readFile(String url) {
        try {
            // открываем поток для чтения
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    activity.openFileInput(url)));
            String str;
            StringBuilder textOutput = new StringBuilder();
            // читаем содержимое
            while ((str = br.readLine()) != null) {
                //  Log.d(LOG_TAG, str);
                textOutput.append(str).append("\n");
            }
            return textOutput.toString();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @JavascriptInterface
    public int getRedColor() {
        return colors[0];
    }

    @JavascriptInterface
    public int getGreenColor() {
        return colors[1];
    }

    @JavascriptInterface
    public int getBlueColor() {
        return colors[2];
    }

    @JavascriptInterface
    public int getFPS() {
        return Integer.parseInt(fpsText);
    }

    @JavascriptInterface
    public float getColor() {
        return Float.parseFloat(colorText);
    }

    @JavascriptInterface
    public void endOfGame(String time) {
        String[] times = time.split(":");
        String[] lastResult = resultsText.split(":");
        boolean flag = false;
        if (times.length > lastResult.length)
            flag = true;
        else if (times.length == lastResult.length) {
            for (int i = 0; i < times.length; i++) {
                if (Integer.parseInt(times[i]) > Integer.parseInt(lastResult[i].split("\n")[0])) {
                    flag = true;
                    break;
                }
            }
            //Log.i("KUKUSIKI",Integer.parseInt(lastResult[1]) + "");
        }

        if (flag)
            writeNewResult(time);
    }

    void writeNewResult(String time) {
        writeFile(time, RESULTS_FILE_NAME);
        resultsText = time;
    }

    @JavascriptInterface
    public void setNewColor(float color) {
        colorText = Float.toString(color);
        writeFile(fpsText + "\n" + colorText, SETTINGS_FILE_NAME);
    }

    @JavascriptInterface
    public void setNewFPS(int fps) {
        fpsText = Integer.toString(fps);
        writeFile(fpsText + "\n" + colorText, SETTINGS_FILE_NAME);
    }

    @JavascriptInterface
    public String getBestResult() {
        return resultsText;
    }

    void vibrateTest(View view) {
        view.performHapticFeedback(HapticFeedbackConstants.LONG_PRESS);
    }

    @JavascriptInterface
    public int getDisplayWidth() {
        return webView.getWidth();
    }

    @JavascriptInterface
    public int getDisplayHeight() {
        return webView.getHeight();
    }

    @JavascriptInterface
    public void exitAll() {
        activity.finish();
    }

    @JavascriptInterface
    public void vibrate() {
        //Toast.makeText(activity.getApplicationContext(), "You clicked on OK", Toast.LENGTH_SHORT).show();
        Vibrator v = (Vibrator) activity.getApplicationContext().getSystemService(Context.VIBRATOR_SERVICE);
        v.vibrate(50);
    }
}
