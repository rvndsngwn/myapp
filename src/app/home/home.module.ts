import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {Flashlight} from '@ionic-native/flashlight/ngx';

import {HomePage} from './home.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            },
            {path: 'view', loadChildren: './view/view.module#ViewPageModule'}
        ])
    ],
    declarations: [HomePage],
    providers: [
        Geolocation,
        NativeGeocoder,
        Flashlight]
})
export class HomePageModule {
}
