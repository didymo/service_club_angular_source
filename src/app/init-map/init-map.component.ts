import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapSelectedArea} from '../map-selected-area';
import {TmpSaveService} from '../tmp-save.service';
import * as L from 'leaflet';
import 'leaflet-area-select';

@Component({
  selector: 'app-init-map-component',
  templateUrl: './init-map.component.html',
  styleUrls: ['./init-map.component.css']
})
export class InitMapComponent implements OnInit {

  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter();

  protected TMP_NAME = 'MyTMPName';
  public map: any;
  protected selectedArea: MapSelectedArea;


  constructor(private tmpSaver: TmpSaveService) {
  }

  ngOnInit() {
    this.mapInit();
    this.selectedAreaHandler();
  }

  // Center the map to Australia
  protected mapInit() {
    this.map = L.map('init_map', {selectArea: true}).setView([-25.734968, 134.489563], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
    <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
      maxZoom: 18
    }).addTo(this.map);
    this.map.invalidateSize();
  }

  protected selectedAreaHandler() {
    this.map.on('areaselected', (e) => {
      let coor = e.bounds.toBBoxString().split(','); // lon, lat, lon, lat
      let dragboxHeight = Math.abs(Number(coor[3]) - Number(coor[1]));
      let dragboxWidth = Math.abs(Number(coor[2]) - Number(coor[0]));

      let mapDom = document.getElementById('init_map');
      let width = mapDom.clientWidth;
      let height = mapDom.clientHeight;

      // Resize map
      // mapDom.setAttribute("style", `width: ${width}px; height: ${width*(dragboxHeight/dragboxWidth)}px;`);

      mapDom.style.width = width + 'px';
      mapDom.style.height = (width * (dragboxHeight / dragboxWidth)) + 'px';
      this.map.invalidateSize();
      this.map.fitBounds(e.bounds);

      this.selectedArea = {
        'leftTop':     {'latitude': Number(coor[1]), 'longitude': Number(coor[0])},
        'rightBottom': {'latitude': Number(coor[3]), 'longitude': Number(coor[2])}
      };
    });
  }

  public saveSelectedArea() {
    let body = Object.assign({'name': this.TMP_NAME}, this.selectedArea);

    this.tmpSaver.submit(body).subscribe(res => {
      this.eventNu();
    });
  }

    eventNu() {
    this.activeIndexChange.emit(3);
  }

}
