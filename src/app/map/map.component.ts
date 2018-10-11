import { Component, OnInit } from '@angular/core';
import { MapSelectedArea }   from '../classes/map-selected-area';
import { MapPoint }          from '../classes/map-point';
declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  protected TMP_NAME = 'MyTMPName';
  protected map: any;
  protected selectedArea: MapSelectedArea;

  constructor() { }

  ngOnInit() {
    this.mapInit();
    this.selectedAreaHandler();
  }

  // Center the map to Australia
  protected mapInit()
  {
    this.map = L.map('map', {selectArea: true}).setView([-25.734968, 134.489563], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
    <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
    maxZoom: 18
    }).addTo(this.map);
  }

  protected selectedAreaHandler()
  {
    this.map.on('areaselected', (e) => {
      let coor = e.bounds.toBBoxString().split(','); // lon, lat, lon, lat
      let dragboxHeight = Math.abs(Number(coor[3]) - Number(coor[1]));
      let dragboxWidth  = Math.abs(Number(coor[2]) - Number(coor[0]));

      let mapDom = document.getElementById('map');
      let width  = mapDom.clientWidth;
      let height = mapDom.clientHeight;

      // Resize map
      // mapDom.setAttribute("style", `width: ${width}px; height: ${width*(dragboxHeight/dragboxWidth)}px;`);

      mapDom.style.width  = width + 'px';
      mapDom.style.height = (width*(dragboxHeight/dragboxWidth)) + 'px';
      this.map.invalidateSize();
      this.map.fitBounds(e.bounds);

      this.selectedArea = {
        "leftTop":     {'latitude': Number(coor[1]), 'longitude': Number(coor[0])},
        "rightBottom": {'latitude': Number(coor[3]), 'longitude': Number(coor[2])}
      };
    });
  }

}
