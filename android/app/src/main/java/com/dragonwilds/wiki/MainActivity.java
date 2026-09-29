package com.dragonwilds.wiki;

import android.os.Bundle;
import android.graphics.Color;
import android.view.Window;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.parseColor("#0e1218"));
            window.setNavigationBarColor(Color.parseColor("#090b0e"));
            window.getDecorView().setBackgroundColor(Color.parseColor("#090b0e"));
            
            if (getBridge() != null && getBridge().getWebView() != null) {
                getBridge().getWebView().setBackgroundColor(Color.parseColor("#090b0e"));
            }
        } catch (Exception ignored) {}
    }
}
