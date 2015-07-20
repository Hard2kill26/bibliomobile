package com.phonegap.app;

import android.os.Bundle;
import org.apache.cordova.*;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

public class BibliomobileActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
    
    /** Create options menu**/
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_principal, menu);
        return true;
    }
    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
    	super.onOptionsItemSelected(item);
        switch (item.getItemId()) {
            case R.id.MnuOpc2:
            	super.appView.loadUrl("javascript:navigator.app.exitApp();");
                break;
        }
        return true;
    }

}