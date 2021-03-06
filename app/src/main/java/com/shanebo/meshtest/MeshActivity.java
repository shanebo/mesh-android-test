package com.shanebo.meshtest;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MeshActivity extends Activity {
    WebSettings wSettings;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = new WebView(this);
        webView.setClickable(true);
        wSettings = webView.getSettings();
        wSettings.setJavaScriptEnabled(true);

        /**
         * Support classes for webview. Loading a ChromeClient for better performance
         */
        WebClientClass webViewClient = new WebClientClass();
        webView.setWebViewClient(webViewClient);
        WebChromeClient webChromeClient = new WebChromeClient();
        webView.setWebChromeClient(webChromeClient);

        /**
         * Now Added Java Interface Class
         */
        webView.addJavascriptInterface(new meshInterface(this), "Android");

        /**
         * Load Our Custom JS Inside WebView
         */
        webView.loadUrl("file:///android_asset/web/app.html");
        setContentView(webView);

    }

    public class WebClientClass extends WebViewClient {
        ProgressDialog pd = null;

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            pd = new ProgressDialog(MeshActivity.this);
            pd.setTitle("Please wait");
            pd.setMessage("Page is loading..");
            pd.show();
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            pd.dismiss();
        }
    }

    public class WebChromeClass extends WebChromeClient {
    }

    public class meshInterface {



        private Context con;

        public meshInterface(Context con) {
            this.con = con;
        }

        public void showToast(String mssg) {
            AlertDialog alert = new AlertDialog.Builder(con)
                    .create();
            alert.setTitle("My Js Alert");
            alert.setMessage(mssg);
            alert.setButton("OK", new DialogInterface.OnClickListener() {

                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                }
            });

        }
    }
}
