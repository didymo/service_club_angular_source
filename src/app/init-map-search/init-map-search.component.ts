import {Component, Input, OnInit} from '@angular/core';
import {Addr2coordService} from '../addr2coord.service';

declare var L: any;

@Component({
  selector: 'app-init-map-search',
  templateUrl: './init-map-search.component.html',
  styleUrls: ['./init-map-search.component.css']
})
export class InitMapSearchComponent implements OnInit {

    @Input() map: any; // leaflet map object

  constructor(private geoCoder: Addr2coordService) { }

  ngOnInit() {
  }

    // Search bar update handler - Center the map to some location
  public inputHandler(event)
  {
    let address = event.target.value;
    let coord   = null;

    this.geoCoder.get(address).subscribe(res => {
      if (res[0] == undefined)
      {
        return;
      }
      coord = {
        latitude:  Number(res[0].lat),
        longitude: Number(res[0].lon),
        zoom: 13
      };
      this.map.setView(new L.LatLng(coord.latitude, coord.longitude), coord.zoom);
    });

    event.preventDefault();
  }

}
