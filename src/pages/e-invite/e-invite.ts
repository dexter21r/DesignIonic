import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import 'fabric';
declare let fabric: any;

/**
 * Generated class for the EInvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-e-invite',
  templateUrl: 'e-invite.html',
})
export class EInvitePage {

  private canvas;
  canvasScale = 1; //global 
  deviceWidth = 0;
  deviceHeight = 0;
  canvasWidth = 500;
  canvasHeight = 700;
  scaleFactor = 1;
  templateSelected = false;
  imageSection = false;
  private textArea = [];
  template = null;
  templateInfo = null;
  showTextToolBar = true;
  
  currentEvite = {
    id: 'pwi-canvas',
    name: 'empty-canvas',
    type: 'empty',
    image_section: false,
    width: 1,
    height: 1,
    properties: {
      background_area: null,
      image_area: null,
      text_area: null
    }
  };

  constructor(public navCtrl: NavController, platform: Platform, navParams: NavParams) {
    let that = this;
    that.deviceWidth = platform.width() - 30;
    that.deviceHeight = platform.height();
    console.log('Width: ' + that.deviceWidth);
    console.log('Height: ' + that.deviceHeight);
    that.scaleFactor = ( that.deviceWidth  / that.canvasWidth );
    console.log('Scale factor: '+that.scaleFactor);
    this.template = navParams.get('template');
    
  }

  ionViewDidLoad() {
    let that = this;
    that.canvas = new fabric.Canvas('my-canvas', {});
    console.log('cWidth: ' + that.canvas.getWidth()*that.scaleFactor);
    console.log('cHeight: ' + that.canvas.getHeight());
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    let that = this;

    that.selectTemplate(this.template);
    // let txtStyles = {
    //   top: 100,
    //   left: 200,
    //   fill: '#d6d6d6',
    //   fontFamily: 'sans-serif',
    //   fontSize: '30',
    //   originY: 'center',
    //   originX: 'center',
    //   borderColor: '#d6d6d6',
    //   cornerColor: '#d6d6d6',
    //   cornerSize: 5,
    //   cornerStyle: 'circle',
    //   transparentCorners: false,
    //   lockUniScaling: true
    // }

    // let introTxt = new fabric.Text('Some random text', txtStyles);
    // that.canvas.add(introTxt);
    // console.log(that.canvas);
    // fabric.Image.fromURL('https://stmed.net/sites/default/files/turquoise-green-wallpapers-25331-8267585.jpg', function (img) {
    //   var oImg = img.set({
    //     left: 0,
    //     top: 0,
    //     angle: 0,
    //     width: that.canvas.width,
    //     height: that.canvas.height
    //   });
    //   that.canvas.setBackgroundImage(oImg, that.canvas.renderAll.bind(that.canvas), {
    //     scaleX: that.canvas.width / oImg.width,
    //     scaleY: that.canvas.height / oImg.height
    //  }).renderAll();
    //   console.log('==> backgroud loaded');
    //   // var dataURL = canvas.toDataURL({
    //   // 	format: 'png',
    //   // 	quality: 0.8
    //   // });
    //   that.changeSize();
      
    // });
  }

  selectTemplate(template) {
    this.templateSelected = true;
    this.currentEvite = Object.assign({}, template);
    this.imageSection = template.image_section;
    this.templateInfo = this.currentEvite;
    console.log(template, this.currentEvite);
    this.renderTemplate();
  }

  changeSize() {
    let that= this;
    var SCALE_FACTOR = that.scaleFactor;
    that.canvasScale = that.canvasScale * SCALE_FACTOR;

    that.canvas.setHeight(that.canvas.getHeight() * SCALE_FACTOR);
    that.canvas.setWidth(that.canvas.getWidth() * SCALE_FACTOR);

    var objects = that.canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }

    that.canvas.renderAll();
  }

  renderTemplate() {
		let that = this;
		this.canvas.setWidth(that.templateInfo.width);
		this.canvas.setHeight(that.templateInfo.height);
		this.canvas.calcOffset();
		this.canvas.clear();
		if (this.templateInfo != null) {


			//Background Image
			//console.log(this.templateInfo.properties.background_area);
			if (this.templateInfo.properties.background_area != null) {
				//console.log('set background');
				fabric.Image.fromURL(this.templateInfo.properties.background_area.image, function (img) {
					var oImg = img.set({
						left: 0,
						top: 0,
						angle: 0,
						width: that.templateInfo.width,
            height: that.templateInfo.height,
            scaleX: that.canvas.width / img.width,
            scaleY: that.canvas.height / img.height
					});
					that.canvas.setBackgroundImage(oImg).renderAll();
					console.log('==> backgroud loaded');
					//that.checkAssetsLoading();
					// var dataURL = canvas.toDataURL({
					// 	format: 'png',
					// 	quality: 0.8
					// });
				});
			}


			//Image Area
			// if (this.templateInfo.properties.image_area != null) {
			// 	this.imgElement = document.createElement('img');
			// 	this.imgElement.onload = function () {
			// 		that.imageArea = new fabric.Image(that.imgElement, {
			// 			left: that.templateInfo.properties.image_area.starting_point.x,
			// 			top: that.templateInfo.properties.image_area.starting_point.y,
			// 			angle: 0,
			// 			opacity: 1
			// 		});
			// 		that.imageArea.selectable = false
			// 		that.canvas.add(that.imageArea);
			// 		console.log('==> image area loaded');
			// 		//that.checkAssetsLoading();
			// 	}

			// 	let w = this.templateInfo.properties.image_area.width;
			// 	let h = this.templateInfo.properties.image_area.height;

			// 	if (this.templateInfo.properties.image_area.image != null) {
			// 		this.imgElement.width = w;
			// 		this.imgElement.height = h;
			// 		this.imgElement.src = this.templateInfo.properties.image_area.image;
			// 	} else {
			// 		this.imgElement.src = 'http://via.placeholder.com/' + w + 'x' + h;
			// 	}
			// }

			//Text Area
			if (this.templateInfo.properties.text_area != null) {
				let i = 0;
				that.templateInfo.properties.text_area.forEach(function (ta) {
					that.textArea[i] = new fabric.Textbox(ta.content, {
						left: ta.starting_point.x,
						top: ta.starting_point.y,
						width: ta.width,
						height: ta.height,
						fontSize: ta.defaultSettings.fontSize,
						lineHeight: ta.defaultSettings.lineHeight,
						fontFamily: ta.defaultSettings.fontFamily,
						textAlign: ta.defaultSettings.textAlign,
						fontWeight: ta.defaultSettings.fontWeight != undefined ? ta.defaultSettings.fontWeight : "normal",
						textDecoration: ta.defaultSettings.textDecoration,
						fontStyle: ta.defaultSettings.fontStyle != undefined ? ta.defaultSettings.fontStyle : "normal",
						fill: ta.defaultSettings.fill,
						borderColor: ta.defaultSettings.borderColor ? ta.defaultSettings.borderColor : "#000000",
						charSpacing: ta.defaultSettings.charSpacing != undefined ? ta.defaultSettings.charSpacing : 1,
						styles: ta.styles
					});
					that.textArea[i]._forceClearCache = true;

					that.textArea[i].set({
						borderDashArray: [2, 2],
						cornerColor: 'white',
						cornerStrokeColor: 'black',
						cornerStyle: 'circle',
						cornerSize: 12,
						padding: 15,
						transparentCorners: false,
						borderScaleFactor: 2
					});

					that.textArea[i].on("changed", function (e) {
						//console.log('textchanges',e);
						//that.updateModifications(true);
						//that.canvasUpdated.emit(this.canvas);
						//that.updateText(i);
					});
					//console.log(that.textArea[i]);
					that.canvas.add(that.textArea[i]);
					console.log('==> text area loaded');
					//that.checkAssetsLoading();
				});
			}


			//SVG/Motifs
			// if (this.templateInfo.properties.svgs != null) {
			// 	let i = 0;

			// 	that.templateInfo.properties.svgs.forEach(function (ta) {
			// 		//that.addMotif(ta.url, ta);
			// 	});
				
			// }

			this.canvas.renderAll();

			this.canvas.on('object:modified', function () {
				console.log('Object Modified');
				//that.updateModifications(true);
				//that.canvasUpdated.emit(that.canvas);
			});
			this.canvas.on('object:added', function () {
				console.log('Object Added : this event is not handle anything');
				//that.updateModifications(true);
				//that.canvasUpdated.emit(that.canvas);
      });
      
      that.changeSize();
		}
	}

}
