package com.shanebo.meshtest;

import android.webkit.WebView;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.util.AttributeSet;
import android.util.Log;
import android.annotation.TargetApi;

public class MeshWebview extends WebView {

    public MeshWebview(Context context) {
        this(context, null);
    }

    public MeshWebview(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Deprecated
    public MeshWebview(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    @TargetApi(11)
    @Deprecated
    public MeshWebview(Context context, AttributeSet attrs, int defStyle, boolean privateBrowsing) {
        super(context, attrs, defStyle, privateBrowsing);
    }

    /**
     * Load the specified URL in the Cordova webview or a new browser instance.
     *
     * NOTE: If openExternal is false, only URLs listed in whitelist can be loaded.
     *
     * @param url           The url to load.
     */

    public void showWebPage(String url) {

        this.loadUrl(url);
        return;
    }


}
