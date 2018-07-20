import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'fabric';
declare let fabric: any;

import { EInvitePage } from '../e-invite/e-invite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  templates: any;

  constructor(public navCtrl: NavController, platform: Platform, public http: Http) {
    let that = this;
    that.http.get('http://staging.digivite.in/admin/api/evite/templates/0')
      .map(res => res.json())
      .subscribe(tdata => {
        // this.templates = data.data.children;
        console.log('Template: ', tdata);
        let temp = [];
        let data = tdata['data']['templates'];

        for (let k in data) {
          let td = JSON.parse(data[k].template_data);
          td.properties.background_area.image = 'http://staging.digivite.in/admin/storage/templates_files/' + td.properties.background_area.image;
          if (td.image_section == true) {
            td.properties.image_area.image = 'http://staging.digivite.in/admin/storage/templates_files/' + td.properties.image_area.image;
          }
          td['name'] = data[k].title;
          td['templateid'] = data[k].id;
          td['desc'] = data[k].description;
          td['preview'] = 'http://staging.digivite.in/admin/storage/templates_files/'+td['preview'];
          temp.push(td);
        }
        that.templates = temp;
        console.log('Template Details: ', that.templates);
      });

  }

  ionViewDidLoad() {
    let that = this;
    console.log('Home page');
  }

  selectTemplate(template) {
    console.log(template);
    this.navCtrl.push(EInvitePage, { template });
  }

}
