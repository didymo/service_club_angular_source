import { Component, OnInit } from '@angular/core';


declare var ol: any;
declare var $ : any;

import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import {toStringHDMS} from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import {toLonLat} from 'ol/proj.js';
import TileJSON from 'ol/source/TileJSON.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {



  latitude: number = -34.4282346;
  longitude: number = 150.8843037;


  map: any;
  anchor: any;
  image:any;






  constructor() { }

  ngOnInit() {

    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });


    var osmLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });


    var lineLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({

          stroke: new ol.style.Stroke({
              color: 'red',
              size: 1

            })
        })
      });

    var markLayer = new ol.layer.Vector({
      source: new ol.source.Vector()
    });





          /**
           * Elements that make up the popup.
           */
          var container = document.getElementById('popup');
          var content = document.getElementById('popup-content');
          var closer = document.getElementById('popup-closer');


          /**
           * Create an overlay to anchor the popup to the map.
           */
          var overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
              duration: 250
            }
          });

          /**
            * Add a click handler to hide the popup.
            * @return {boolean} Don't follow the href.
          */
          closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
          };



//-------------------------Create NEW Map Layer--------------------------------

    this.map = new ol.Map({
      target: 'map',

      //layer
      layers: [osmLayer, lineLayer, markLayer],

       overlays: [overlay],

      controls: ol.control.defaults({

        attributionOptions: {
          collapsible: false
        }

      }).extend([mousePositionControl]),

      //view

      view: new ol.View({
        center:ol.proj.transform([150.87166,-34.41629], 'EPSG:4326','EPSG:3857'),
        zoom: 8
      })

    })

//----------------------------------------------------------------------------




      var lineDraw = new ol.interaction.Draw({
        type: 'LineString',
        source: lineLayer.getSource(),    // 注意设置source，这样绘制好的线，就会添加到这个source里
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#0044CC'
            }),    // 设置绘制时的样式
            stroke: new ol.style.Stroke({
            lineDash:[1,2,3,4,5,6],
            color: '#0044CC',
            width: 3
            })
        }),
        maxPoints: 2    // 限制不超过4个点
    });


    lineDraw.on('drawend', function(event){
        //event.feature 就是当前绘制完成的线的Feature
        var point = document.getElementById('points');
        var event = event.feature;
        point.innerHTML= JSON.stringify(event.getGeometry().getCoordinates());
        //var output = ol.coordinate.toStringHDMS(ol.proj.transform(event, 'EPSG:3857', 'EPSG:4326'));
   });

    this.map.addInteraction(lineDraw);


  //    this.map.addInteraction(new ol.interaction.Draw({
  //        type: 'LineString',
  //        source: lineLayer.getSource()    // 注意设置source，这样绘制好的线，就会添加到这个source里
  //    })




  // 创建一个Feature，并设置好在地图上的位置
  var anchor = new ol.Feature({
    geometry: new ol.geom.Point([16796627.28,-4086074.49])
  });
  // 设置样式，在样式中就可以设置图标
  anchor.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      src: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/map-marker-icon.png'
    })
  }));

  // 添加到之前的创建的layer中去
  markLayer.getSource().addFeature(anchor);


  this.map.getView().on('change:resolution', function(){
        var style = anchor.getStyle();
        // 重新设置图标的缩放率，基于层级10来做缩放
        style.getImage().setScale(this.getZoom() / 10);
        anchor.setStyle(style);
    });


//-----------------------------------------------------------------------------


  this.map.on('click', function (args) {

    var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');


    console.log(lonlat);
    var lat = lonlat[1];
    var lon = lonlat[0];
   alert(`lat: ${lat}, \nlong: ${lon}`);

 });



    // 下面把上面的图标附加到地图上，需要一个ol.Overlay
  //  var anchor = new ol.Overlay({
  //  element: document.getElementById('anchor')
  //  });
    // 关键的一点，需要设置附加到地图上的位置
  //  anchor.setPosition([150.87166,-34.41629]);
    // 然后添加到map上
  //  this.map.addOverlay(anchor);

//--------------------------------------Search--------------------------
/**
 * Add a click handler to the map to render the popup.
 */
this.map.on('singleclick', function(evt) {
  var coordinate = evt.coordinate;
  var hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
      '</code>';
  overlay.setPosition(coordinate);
});






//--------------------------------------分割线-----------------------------
  }



}
