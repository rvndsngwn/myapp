import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';

import {Flashlight} from '@ionic-native/flashlight/ngx';

declare var google;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
    @ViewChild('map', {static: false}) mapElement: ElementRef;
    map: any;
    address: string;

    constructor(private camera: Camera,
                private geolocation: Geolocation,
                private nativeGeocoder: NativeGeocoder,
                private flashlight: Flashlight) {
    }

    ngOnInit() {
        this.loadMap();
    }

    light() {
        alert(this.flashlight.isSwitchedOn());
        console.log(this.flashlight.isSwitchedOn());
        this.flashlight.toggle();
    }

    loadMap() {
        this.geolocation.getCurrentPosition().then((resp) => {
            const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            const mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.map.addListener('tilesloaded', () => {
                console.log('accuracy', this.map);
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
            });

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    getAddressFromCoords(latitude, longitude) {
        console.log('getAddressFromCoords ' + latitude + ' ' + longitude);
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };

        this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
            .then((result: NativeGeocoderResult[]) => {
                this.address = '';
                const responseAddress = [];
                for (const [key, value] of Object.entries(result[0])) {
                    if (value.length > 0) {
                        responseAddress.push(value);
                    }

                }
                responseAddress.reverse();
                for (const value of responseAddress) {
                    this.address += value + ', ';
                }
                this.address = this.address.slice(0, -2);
            })
            .catch((error: any) => {
                this.address = 'Address Not Available!';
            });

    }

    startCamera() {
        console.log('camera btn is clicked');
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            const base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });


    }


    btnClicked() {
        console.log('btn is clicked');
    }
}
