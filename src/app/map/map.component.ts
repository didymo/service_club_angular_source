import { Component, OnInit } from '@angular/core';


declare var ol: any;
declare var $ : any;

import Map from 'ol/Map.js';
import {unByKey} from 'ol/Observable.js';
import Overlay from 'ol/Overlay.js';
import {getArea, getLength} from 'ol/sphere.js';
import View from 'ol/View.js';
import {toStringHDMS} from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import {toLonLat} from 'ol/proj.js';
import TileJSON from 'ol/source/TileJSON.js';
import {LineString, Polygon} from 'ol/geom.js';
import Draw from 'ol/interaction/Draw.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

 import {defaults as defaultControls} from 'ol/control.js';


import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import Geometry from 'ol/geom/Geometry';
import {transform} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Interaction from 'ol/interaction/Interaction';



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

    var mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });


    var osmLayer = new TileLayer({
      source: new OSM()
    });


    var lineLayer = new VectorLayer({

        source: new VectorSource(),

        style: new Style({

        stroke: new Stroke({
              color: 'red',
              size: 1
            }),
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: '#ffcc33'
            })
          })
        })
      });


//-----------------------------------------------------------------------------
    var markLayer = new VectorLayer({
      source: new VectorSource()
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

    var map = new Map({
      target: 'map',

      //layer
      layers: [osmLayer, lineLayer, markLayer],

       overlays: [overlay],

       controls: defaultControls({

        attributionOptions: {
          collapsible: false
        }

      }).extend([mousePositionControl]),

      extent: [150.87, -34.40, 150.86, -34.41],

      //view

      view: new View({
        center: transform([150.87166,-34.41629], 'EPSG:4326','EPSG:3857'),
        zoom: 18,
        minZoom: 13,
        maxZoom: 20
      })

    })

//----------------------------------------------------------------------------




      var lineDraw = new Draw({
        type: 'LineString',
        source: lineLayer.getSource(),    // 注意设置source，这样绘制好的线，就会添加到这个source里
        style: new Style({
            fill: new Fill({
                color: '#0044CC'
            }),    // 设置绘制时的样式
            stroke: new Stroke({
            lineDash:[1,2,3,4,5,6],
            color: '#0044CC',
            width: 3
            })
        }),
        maxPoints: 2    // 限制不超过2个点
    });



    lineDraw.on('drawend', function(event){
        //event.feature 就是当前绘制完成的线的Feature
        var end = document.getElementById('points');
        var event = event.feature;
        end.innerHTML= JSON.stringify(event.getGeometry().getCoordinates());
        //var output = ol.coordinate.toStringHDMS(ol.proj.transform(event, 'EPSG:3857', 'EPSG:4326'));
   });

   map.addInteraction(lineDraw);


  //    this.map.addInteraction(new ol.interaction.Draw({
  //        type: 'LineString',
  //        source: lineLayer.getSource()    // 注意设置source，这样绘制好的线，就会添加到这个source里
  //    })




  // 创建一个Feature，并设置好在地图上的位置
//  var anchor = new Feature({
//    geometry: new Point([16796627.28,-4086074.49])
//  });
  // 设置样式，在样式中就可以设置图标
//  anchor.setStyle(new Style({
//    image: new Icon({
//      src: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/map-marker-icon.png'
//    })
//  }));

  // 添加到之前的创建的layer中去
//  markLayer.getSource().addFeature(anchor);


//  map.getView().onClick('change:resolution', function(){
//        var style = anchor.getStyle();
        // 重新设置图标的缩放率，基于层级10来做缩放
//        style.getImage().setScale(this.getZoom() / 10);
//        anchor.setStyle(style);
//    });


//-----------------------------------------------------------------------------


  map.on('click', function (args) {

    var lonlat = transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');


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

//---------------------------------click for block------------------------------
/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function(evt) {
  var coordinate = evt.coordinate;
  var hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
      '</code>';
  overlay.setPosition(coordinate);

  var anchor = new Feature({
    geometry: new Point(coordinate)
  });
  // 设置样式，在样式中就可以设置图标
  anchor.setStyle(new Style({
    image: new Icon({
      src: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/map-marker-icon.png',
      anchor:[0.5,1.1]
    })
  }));
  markLayer.getSource().addFeature(anchor);
});
//------------------------------------------------------------------------

//--------------------------------------分割线-----------------------------
  }



}
