import {Component, OnInit} from '@angular/core';
import {TmpSaveService} from '../tmp-save.service';
import {MapSelectedArea} from '../map-selected-area';
import {MapPoint} from '../map-point';
import {Config} from '../config';

@Component({
  selector: 'app-init-map-saver',
  templateUrl: './init-map-saver.component.html',
  styleUrls: ['./init-map-saver.component.css']
})
export class InitMapSaverComponent implements OnInit {

  protected TMP_NAME = 'MyTMPName';

  constructor(private saver: TmpSaveService) {
  }

  ngOnInit() {
  }

  // Save map status
  public clickHandler(event) {
    let selectedArea: MapSelectedArea = this.saver.selectedArea;

    selectedArea = Object.assign({'name': this.TMP_NAME}, selectedArea);

    this.saver.submit(selectedArea).subscribe(res => {

    });
  }

}
