import { Component, OnInit, Input } from '@angular/core';
import { Addr2coordService }        from '../services/addr2coord.service';
import { MapSelectedArea }          from '../classes/MapSelectedArea';
import { MapPoint }                 from '../classes/MapPoint';
declare var L: any;

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})

export class MapSearchComponent implements OnInit {

  @Input() map: any;

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
