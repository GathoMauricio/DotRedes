package com.katze.dotredes;

import android.app.Service;
import android.content.Intent;
import android.location.Location;
import android.os.Bundle;
import android.os.IBinder;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Looper;

/**
 * Created by Mauricio on 26/08/2015.
 */
public class Servicio extends Service implements LocationListener{
    Location location;
    LocationManager locationManager;
    boolean isGPS,isRED;
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
    public void onCreate(){
        super.onCreate();

            }
            public void onStart(Intent intent,int startId){
                System.out.println("El servicio ha comenzado");
                //this.stopSelf();
                Thread hilo = new Thread(new Runnable() {
                    @Override
                    public void run() {
                        //Looper.prepare();
                        while(true)
                        {

                            try {
                                getLocation();
                                System.out.println("Servicio");
                                Thread.sleep(5000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }

            }
        });
        //hilo.start();
    }
    public void onDestroy(){
        super.onDestroy();
        System.out.println("Proceso terminado");
    }

    public void getLocation()
    {
        try{
            locationManager=(LocationManager)this.getApplicationContext().getSystemService(LOCATION_SERVICE);
            isGPS=locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
            isRED=locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

            System.out.println("GPS IS "+isGPS);
            System.out.println("RED IS "+isRED);

        }catch (Exception e){
            System.out.println(e.getMessage());
        }

            try {
                System.out.println("Intentando conectar con GPS");
                locationManager.requestLocationUpdates(locationManager.GPS_PROVIDER, 1000, 1, this);
                location = locationManager.getLastKnownLocation(locationManager.GPS_PROVIDER);
                System.out.println("Location IS " + location);
                System.out.println("JAVA GPS");
                System.out.println("Latitud: " + location.getLatitude());
                System.out.println("Longitud: " + location.getLongitude());
            }catch (Exception e) {
                System.out.println("No hubo respuesta del GPS enviando datos de RED");
                locationManager.requestLocationUpdates(locationManager.NETWORK_PROVIDER, 1000, 1, this);
                location = locationManager.getLastKnownLocation(locationManager.NETWORK_PROVIDER);
                System.out.println("JAVA RED");
                System.out.println("Latitud: " + location.getLatitude());
                System.out.println("Longitud: " + location.getLongitude());
            }
    }
    @Override
    public void onLocationChanged(Location location) {
        System.out.println("onLocationChanged");
        getLocation();
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
        System.out.println("onStatusChanged");
        getLocation();
    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }
}
