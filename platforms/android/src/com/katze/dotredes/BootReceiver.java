package com.katze.dotredes;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
//Esta clase es la que se ejecuta desde el manifest para iniciar la app al iniciar el sistema
public class BootReceiver extends BroadcastReceiver{

    @Override
    public void onReceive(Context context, Intent intent) {
        Intent i = new Intent(context, MainActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(i);
    }
}