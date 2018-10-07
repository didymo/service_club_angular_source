import { Component, OnInit, Input } from '@angular/core';
import { Addr2coordService } from '../services/addr2coord.service';
import { CreateTMPService } from '../services/create-tmp.service';
import {Coordinates} from '../classes/coordinates';
declare var L:  any;

@Component({
 selector: 'app-map-search',
 templateUrl: './map-search.component.html',
 styleUrls: ['./map-search.component.css']
})

export class MapSearchComponent implements OnInit {

  @Input() map:   any;
  protected coord: Coordinates = {
   latitude:  0,
   longitude: 0,
   zoom:      0
  };

  constructor(
    private geoCoder: Addr2coordService,
    private postTMP: CreateTMPService
  )
  {

  }

  ngOnInit() {


  }

  

};
