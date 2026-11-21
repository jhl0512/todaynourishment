package app.hanpok.proto;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;
import android.provider.Settings;

/** 화면이 꺼지면 잠금화면(LockActivity)을 미리 띄워 두는 상시 서비스. */
public class LockService extends Service {
  static final String PREF = "hanpok", KEY_ON = "lockOn", CH = "lock";
  private BroadcastReceiver offReceiver;

  static boolean enabled(Context c) { return c.getSharedPreferences(PREF, MODE_PRIVATE).getBoolean(KEY_ON, false); }
  static void setEnabled(Context c, boolean on) {
    SharedPreferences.Editor e = c.getSharedPreferences(PREF, MODE_PRIVATE).edit(); e.putBoolean(KEY_ON, on); e.apply();
    Intent i = new Intent(c, LockService.class);
    if (on && Settings.canDrawOverlays(c)) { if (Build.VERSION.SDK_INT >= 26) c.startForegroundService(i); else c.startService(i); }
    else if (!on) c.stopService(i);
  }

  @Override public void onCreate() {
    super.onCreate();
    NotificationManager nm = getSystemService(NotificationManager.class);
    if (Build.VERSION.SDK_INT >= 26) {
      NotificationChannel ch = new NotificationChannel(CH, "잠금화면 실행", NotificationManager.IMPORTANCE_MIN);
      ch.setShowBadge(false); nm.createNotificationChannel(ch);
    }
    PendingIntent open = PendingIntent.getActivity(this, 0, new Intent(this, MainActivity.class), PendingIntent.FLAG_IMMUTABLE);
    Notification n = (Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(this, CH) : new Notification.Builder(this))
        .setSmallIcon(android.R.drawable.ic_lock_idle_lock).setContentTitle("한 폭").setContentText("화면을 켤 때마다 명화를 보여 드려요")
        .setContentIntent(open).setOngoing(true).build();
    if (Build.VERSION.SDK_INT >= 34) startForeground(1, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
    else startForeground(1, n);

    offReceiver = new BroadcastReceiver() {
      @Override public void onReceive(Context c, Intent in) {
        if (!enabled(c)) return;
        Intent l = new Intent(c, LockActivity.class);
        l.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_NO_ANIMATION | Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
        try { c.startActivity(l); } catch (Exception ignored) {}
      }
    };
    IntentFilter f = new IntentFilter(Intent.ACTION_SCREEN_OFF);
    if (Build.VERSION.SDK_INT >= 33) registerReceiver(offReceiver, f, Context.RECEIVER_NOT_EXPORTED); else registerReceiver(offReceiver, f);
  }

  @Override public int onStartCommand(Intent i, int flags, int id) { return START_STICKY; }
  @Override public void onDestroy() { try { unregisterReceiver(offReceiver); } catch (Exception ignored) {} super.onDestroy(); }
  @Override public IBinder onBind(Intent i) { return null; }
}
