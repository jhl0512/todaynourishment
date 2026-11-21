package app.hanpok.proto;

import android.app.Notification;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.provider.Settings;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Base64;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** 내 휴대폰의 실제 알림을 읽어서 한 폭 잠금화면에 보여 줘요. (설정에서 「알림 접근」을 허용해야 동작) */
public class NotiService extends NotificationListenerService {
  static volatile NotiService inst;
  static volatile Runnable onChange;
  private static final Map<String, String> ICONS = new HashMap<>();

  @Override public void onListenerConnected() { inst = this; fire(); }
  @Override public void onListenerDisconnected() { inst = null; fire(); }
  @Override public void onNotificationPosted(StatusBarNotification sbn) { fire(); }
  @Override public void onNotificationRemoved(StatusBarNotification sbn) { fire(); }
  private static void fire() { Runnable r = onChange; if (r != null) try { r.run(); } catch (Exception ignored) {} }

  static boolean granted(Context c) {
    String s = Settings.Secure.getString(c.getContentResolver(), "enabled_notification_listeners");
    return s != null && s.contains(new ComponentName(c, NotiService.class).flattenToString());
  }

  /** 잠금화면에 보여 줄 알림 목록(JSON): 최신순, 우리 앱·진행 중 알림·비밀 알림 제외 */
  static String list(Context c) {
    JSONArray out = new JSONArray();
    NotiService s = inst;
    if (s == null) return granted(c) ? "[]" : "null";
    try {
      StatusBarNotification[] all = s.getActiveNotifications();
      if (all == null) return "[]";
      List<StatusBarNotification> L = new ArrayList<>(Arrays.asList(all));
      L.sort((x, y) -> Long.compare(y.getPostTime(), x.getPostTime()));
      PackageManager pm = c.getPackageManager();
      for (StatusBarNotification sbn : L) {
        Notification n = sbn.getNotification();
        if (sbn.getPackageName().equals(c.getPackageName())) continue;
        if (sbn.isOngoing() || (n.flags & Notification.FLAG_GROUP_SUMMARY) != 0) continue;
        if (n.visibility == Notification.VISIBILITY_SECRET) continue;
        Bundle e = n.extras;
        CharSequence title = e.getCharSequence(Notification.EXTRA_TITLE), text = e.getCharSequence(Notification.EXTRA_TEXT), big = e.getCharSequence(Notification.EXTRA_BIG_TEXT);
        if (title == null && text == null) continue;
        String app;
        try { ApplicationInfo ai = pm.getApplicationInfo(sbn.getPackageName(), 0); app = pm.getApplicationLabel(ai).toString(); } catch (Exception ex) { app = sbn.getPackageName(); }
        JSONObject o = new JSONObject();
        o.put("key", sbn.getKey()); o.put("app", app); o.put("pkg", sbn.getPackageName());
        o.put("title", title == null ? "" : title.toString());
        o.put("text", (big != null ? big : text) == null ? "" : (big != null ? big : text).toString());
        o.put("time", sbn.getPostTime()); o.put("icon", icon(pm, sbn.getPackageName()));
        o.put("clear", sbn.isClearable());
        out.put(o);
        if (out.length() >= 8) break;
      }
    } catch (Exception ignored) {}
    return out.toString();
  }

  private static String icon(PackageManager pm, String pkg) {
    String hit = ICONS.get(pkg); if (hit != null) return hit;
    try {
      Drawable d = pm.getApplicationIcon(pkg);
      Bitmap b = Bitmap.createBitmap(72, 72, Bitmap.Config.ARGB_8888);
      Canvas cv = new Canvas(b); d.setBounds(0, 0, 72, 72); d.draw(cv);
      ByteArrayOutputStream bo = new ByteArrayOutputStream(); b.compress(Bitmap.CompressFormat.PNG, 100, bo);
      String s = "data:image/png;base64," + Base64.encodeToString(bo.toByteArray(), Base64.NO_WRAP);
      ICONS.put(pkg, s); return s;
    } catch (Exception e) { return ""; }
  }

  /** 알림을 누르면: 그 앱의 해당 화면을 열어요 */
  static boolean open(String key) {
    NotiService s = inst; if (s == null) return false;
    try {
      StatusBarNotification[] all = s.getActiveNotifications(new String[]{ key });
      if (all == null || all.length == 0) return false;
      PendingIntent pi = all[0].getNotification().contentIntent;
      if (pi == null) return false;
      pi.send();
      if ((all[0].getNotification().flags & Notification.FLAG_AUTO_CANCEL) != 0 && all[0].isClearable()) s.cancelNotification(key);
      return true;
    } catch (Exception e) { return false; }
  }
  static void dismiss(String key) { NotiService s = inst; if (s != null) try { s.cancelNotification(key); } catch (Exception ignored) {} }
}
