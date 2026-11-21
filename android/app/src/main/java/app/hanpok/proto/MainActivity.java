package app.hanpok.proto;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/** 한 폭 HTML 프로토타입을 오프라인으로 띄우는 WebView 셸. */
public class MainActivity extends Activity {
  private WebView web;
  private int insetTop = 0, insetBottom = 0;
  private android.webkit.ValueCallback<Uri[]> pickCb;
  private static final int PICK = 41;
  private static final int CAM = 42;
  private Uri camUri;

  @Override protected void onActivityResult(int req, int res, Intent data) {
    if (req == CAM && pickCb != null) {
      if (res == RESULT_OK && camUri != null) pickCb.onReceiveValue(new Uri[]{ camUri });
      else { if (camUri != null) try { getContentResolver().delete(camUri, null, null); } catch (Exception ignored) {} pickCb.onReceiveValue(null); }
      pickCb = null; camUri = null; return;
    }
    if (req == PICK && pickCb != null) {
      Uri[] out = null;
      if (res == RESULT_OK && data != null) {
        if (data.getClipData() != null) { int n = data.getClipData().getItemCount(); out = new Uri[n]; for (int k = 0; k < n; k++) out[k] = data.getClipData().getItemAt(k).getUri(); }
        else if (data.getData() != null) out = new Uri[]{ data.getData() };
      }
      pickCb.onReceiveValue(out); pickCb = null; return;
    }
    super.onActivityResult(req, res, data);
  }

  @Override protected void onCreate(Bundle b) {
    super.onCreate(b);
    Window w = getWindow();
    w.setStatusBarColor(Color.TRANSPARENT);
    w.setNavigationBarColor(Color.WHITE);
    if (Build.VERSION.SDK_INT >= 30) w.setDecorFitsSystemWindows(false);
    else w.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
    if (Build.VERSION.SDK_INT >= 29) { w.setStatusBarContrastEnforced(false); w.setNavigationBarContrastEnforced(false); }

    web = new WebView(this);
    web.setBackgroundColor(Color.BLACK);
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setAllowFileAccess(true);
    s.setMediaPlaybackRequiresUserGesture(false);
    s.setTextZoom(100);
    web.setWebChromeClient(new WebChromeClient() {
      // 「내 사진」 넣기: 사진첩을 열고, 여러 장 고를 수 있게
      @Override public boolean onShowFileChooser(WebView v, android.webkit.ValueCallback<Uri[]> cb, FileChooserParams p) {
        if (pickCb != null) pickCb.onReceiveValue(null);
        pickCb = cb;
        // 「사진 찍기」(capture): 카메라를 바로 열고, 찍은 사진은 사진첩(한폭 폴더)에 저장해서 넘겨요
        if (p != null && p.isCaptureEnabled()) {
          try {
            android.content.ContentValues cv = new android.content.ContentValues();
            cv.put(android.provider.MediaStore.Images.Media.DISPLAY_NAME, "hanpok_" + System.currentTimeMillis() + ".jpg");
            cv.put(android.provider.MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
            if (Build.VERSION.SDK_INT >= 29) cv.put(android.provider.MediaStore.Images.Media.RELATIVE_PATH, "Pictures/한폭");
            camUri = getContentResolver().insert(android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI, cv);
            Intent cam = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
            cam.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, camUri);
            cam.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivityForResult(cam, CAM);
            return true;
          } catch (Exception e) { camUri = null; } // 카메라가 없으면 아래 사진첩으로
        }
        Intent i = new Intent(Intent.ACTION_GET_CONTENT); i.setType("image/*"); i.addCategory(Intent.CATEGORY_OPENABLE);
        i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
        try { startActivityForResult(Intent.createChooser(i, "사진 고르기"), PICK); } catch (Exception e) { pickCb = null; return false; }
        return true;
      }
    });
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
      } else {
        insetTop = Math.round(ins.getSystemWindowInsetTop() / d); insetBottom = Math.round(ins.getSystemWindowInsetBottom() / d);
      }
      pushInsets();
      return ins;
    });
    setContentView(web);
    setLightStatus(false);
    web.loadUrl("file:///android_asset/index.html?app=1");
  }

  private void pushInsets() { if (web != null) web.evaluateJavascript("window.__setInsets&&__setInsets(" + insetTop + "," + insetBottom + ")", null); }

  /** light=true: 어두운 배경(잠금화면) 위 흰 아이콘 */
  private void setLightStatus(boolean light) {
    Window w = getWindow();
    if (Build.VERSION.SDK_INT >= 30) {
      WindowInsetsController c = w.getInsetsController();
      if (c != null) c.setSystemBarsAppearance(light ? 0 : WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS, WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS);
    } else {
      View dv = w.getDecorView(); int f = dv.getSystemUiVisibility();
      dv.setSystemUiVisibility(light ? (f & ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR) : (f | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR));
    }
    w.setNavigationBarColor(light ? Color.BLACK : Color.WHITE);
  }

  class Bridge {
    @JavascriptInterface public void statusLight(boolean on) { runOnUiThread(() -> setLightStatus(on)); }
    /** 앱 설정의 「잠금화면에 명화 띄우기」와 연결: 켜면 권한 확인 후 잠금화면 서비스 시작 */
    @JavascriptInterface public void setLockOn(boolean on) { runOnUiThread(() -> applyLock(on)); }
    @JavascriptInterface public boolean canOverlay() { return Settings.canDrawOverlays(MainActivity.this); }
    @JavascriptInterface public void unlock() {}
    // 실제 알림
    @JavascriptInterface public String getNotis() { return NotiService.list(MainActivity.this); }
    @JavascriptInterface public boolean notiAccess() { return NotiService.granted(MainActivity.this); }
    @JavascriptInterface public void openNotiAccess() { runOnUiThread(() -> {
      Intent i = Build.VERSION.SDK_INT >= 30
        ? new Intent(Settings.ACTION_NOTIFICATION_LISTENER_DETAIL_SETTINGS).putExtra(Settings.EXTRA_NOTIFICATION_LISTENER_COMPONENT_NAME, new android.content.ComponentName(MainActivity.this, NotiService.class).flattenToString())
        : new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS);
      try { startActivity(i); } catch (Exception e) { startActivity(new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)); }
    }); }
    /** 앱 정보 화면 (APK로 깐 앱은 여기서 「제한된 설정 허용」을 먼저 켜야 알림 접근을 허용할 수 있어요) */
    @JavascriptInterface public void openAppInfo() { runOnUiThread(() -> startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + getPackageName())))); }
    @JavascriptInterface public void openNoti(String key) { runOnUiThread(() -> NotiService.open(key)); }
    @JavascriptInterface public void dismissNoti(String key) { NotiService.dismiss(key); }
  }

  private boolean askedOverlay = false;
  private void applyLock(boolean on) {
    LockService.setEnabled(this, on);
    if (!on) return;
    if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != android.content.pm.PackageManager.PERMISSION_GRANTED)
      requestPermissions(new String[]{ android.Manifest.permission.POST_NOTIFICATIONS }, 1);
    if (!Settings.canDrawOverlays(this) && !askedOverlay) { // 화면이 켜질 때 잠금화면을 띄우려면 「다른 앱 위에 표시」가 필요해요
      askedOverlay = true;
      startActivity(new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName())));
    }
  }
  @Override protected void onResume() {
    super.onResume(); if (LockService.enabled(this)) LockService.setEnabled(this, true);
    NotiService.onChange = () -> runOnUiThread(() -> { if (web != null) web.evaluateJavascript("window.__notis&&__notis()", null); });
    if (web != null) web.evaluateJavascript("window.__notis&&__notis()", null); // 설정에서 돌아오면 허용 여부 다시 반영
  }

  @Override public void onBackPressed() {
    web.evaluateJavascript("window.__back?__back():'n'", r -> { if (!"\"y\"".equals(r)) finish(); });
  }
}
