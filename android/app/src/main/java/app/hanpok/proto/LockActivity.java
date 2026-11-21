package app.hanpok.proto;

import android.app.Activity;
import android.app.KeyguardManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowInsetsController;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/** 실제 잠금화면: 시스템 잠금 위에 명화 화면을 띄우고, 밀어서 열면 닫혀요. */
public class LockActivity extends Activity {
  private WebView web;
  private int insetTop = 0, insetBottom = 0;
  private BroadcastReceiver onReceiver;

  @Override protected void onCreate(Bundle b) {
    super.onCreate(b);
    if (Build.VERSION.SDK_INT >= 27) setShowWhenLocked(true);
    else getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED);
    Window w = getWindow();
    w.setStatusBarColor(Color.TRANSPARENT); w.setNavigationBarColor(Color.TRANSPARENT);
    if (Build.VERSION.SDK_INT >= 30) w.setDecorFitsSystemWindows(false);
    if (Build.VERSION.SDK_INT >= 29) { w.setStatusBarContrastEnforced(false); w.setNavigationBarContrastEnforced(false); }

    web = new WebView(this);
    web.setBackgroundColor(Color.BLACK);
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true); s.setAllowFileAccess(true); s.setTextZoom(100);
    web.setWebChromeClient(new WebChromeClient());
    web.setWebViewClient(new WebViewClient() {
      @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) { return true; }
      @Override public void onPageFinished(WebView v, String url) { pushInsets(); }
    });
    web.addJavascriptInterface(new Bridge(), "HP");
    web.setOnApplyWindowInsetsListener((v, ins) -> {
      float d = getResources().getDisplayMetrics().density;
      if (Build.VERSION.SDK_INT >= 30) {
        android.graphics.Insets sb = ins.getInsets(WindowInsets.Type.systemBars());
        insetTop = Math.round(sb.top / d); insetBottom = Math.round(sb.bottom / d);
      } else { insetTop = Math.round(ins.getSystemWindowInsetTop() / d); insetBottom = Math.round(ins.getSystemWindowInsetBottom() / d); }
      pushInsets(); return ins;
    });
    setContentView(web);
    hideNavBar();
    web.loadUrl("file:///android_asset/index.html?app=1&lock=1");

    // 화면을 켜는 순간: 새 그림 + 광고 1초 타이머를 그때부터
    onReceiver = new BroadcastReceiver() { @Override public void onReceive(Context c, Intent i) { if (web != null) web.evaluateJavascript("window.__wake&&__wake()", null); } };
    IntentFilter f = new IntentFilter(Intent.ACTION_SCREEN_ON);
    if (Build.VERSION.SDK_INT >= 33) registerReceiver(onReceiver, f, Context.RECEIVER_NOT_EXPORTED); else registerReceiver(onReceiver, f);
  }

  /** 잠금화면에서는 하단 시스템 네비게이션(버튼/제스처 바)을 숨겨요. 아래 가장자리에서 밀면 잠깐 나타났다가 다시 숨어요. */
  private void hideNavBar() {
    Window w = getWindow();
    if (Build.VERSION.SDK_INT >= 30) {
      WindowInsetsController c = w.getInsetsController();
      if (c != null) { c.hide(WindowInsets.Type.navigationBars()); c.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE); }
    } else {
      w.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    }
  }
  @Override public void onWindowFocusChanged(boolean f) { super.onWindowFocusChanged(f); if (f) hideNavBar(); }
  @Override protected void onResume() {
    super.onResume(); hideNavBar();
    NotiService.onChange = () -> runOnUiThread(() -> { if (web != null) web.evaluateJavascript("window.__notis&&__notis()", null); });
  }

  private void pushInsets() { if (web != null) web.evaluateJavascript("window.__setInsets&&__setInsets(" + insetTop + "," + insetBottom + ")", null); }

  class Bridge {
    @JavascriptInterface public void statusLight(boolean on) {}
    @JavascriptInterface public void unlock() { runOnUiThread(LockActivity.this::unlockNow); }
    @JavascriptInterface public void setLockOn(boolean on) {}
    @JavascriptInterface public String getNotis() { return NotiService.list(LockActivity.this); }
    @JavascriptInterface public boolean notiAccess() { return NotiService.granted(LockActivity.this); }
    /** 알림을 누르면: 그 앱 화면을 열고, 잠금(비밀번호·지문)을 풀어요 */
    @JavascriptInterface public void openNoti(String key) { runOnUiThread(() -> { NotiService.open(key); unlockNow(); }); }
    @JavascriptInterface public void dismissNoti(String key) { NotiService.dismiss(key); }
  }

  /** 밀어서 열기: 비밀번호/지문이 걸려 있으면 시스템 잠금 해제 화면을 띄우고, 우리 화면은 닫아요. */
  private void unlockNow() {
    KeyguardManager km = getSystemService(KeyguardManager.class);
    if (Build.VERSION.SDK_INT >= 26 && km != null && km.isKeyguardLocked()) {
      km.requestDismissKeyguard(this, new KeyguardManager.KeyguardDismissCallback() {
        @Override public void onDismissSucceeded() { close(); }
        @Override public void onDismissCancelled() { close(); }
        @Override public void onDismissError() { close(); }
      });
    } else close();
  }

  private void close() { finish(); overridePendingTransition(0, android.R.anim.fade_out); }

  @Override public void onBackPressed() { /* 잠금화면에서는 뒤로가기 무시 */ }
  @Override protected void onDestroy() { try { unregisterReceiver(onReceiver); } catch (Exception ignored) {} if (web != null) web.destroy(); super.onDestroy(); }
}
