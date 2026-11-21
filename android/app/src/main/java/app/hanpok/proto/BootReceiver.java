package app.hanpok.proto;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** 휴대폰을 껐다 켜도 잠금화면 서비스가 다시 돌아가게. */
public class BootReceiver extends BroadcastReceiver {
  @Override public void onReceive(Context c, Intent i) {
    if (Intent.ACTION_BOOT_COMPLETED.equals(i.getAction()) && LockService.enabled(c)) LockService.setEnabled(c, true);
  }
}
