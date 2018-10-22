import {Component, OnInit, Input} from '@angular/core';
import {TmpSaveService} from '../tmp-save.service';
import {MapSelectedArea} from '../map-selected-area';
import {MapPoint} from '../map-point';

@Component({
  selector: 'app-init-map-saver',
  templateUrl: './init-map-saver.component.html',
  styleUrls: ['./init-map-saver.component.css']
})
export class InitMapSaverComponent implements OnInit {

  @Input() map: any; // leaflet map object
  protected TMP_NAME = 'MyTMPName';

  constructor(private saver: TmpSaveService) {
  }

  ngOnInit() {
  }

  // Save map status
  public clickHandler(event) {
  let body = Object.assign({'name': this.TMP_NAME}, this.map.selectedArea);

  this.saver.submit(body).subscribe(res => {});
  }

}
