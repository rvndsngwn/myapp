import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
    username: string;
    password: string;

    constructor(public navCtrl: NavController) {
    }

    ngOnInit() {
    }

    SignUp() {
        if (!this.username || !this.password) {
            alert('Please fill all fields');
            return;
        }

        console.log('this.username', this.username);
        console.log('this.password', this.password);
    }
}
