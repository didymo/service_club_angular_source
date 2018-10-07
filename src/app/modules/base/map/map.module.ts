import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MapRoutingModule} from './map-routing.module';
import {FormsModule} from '@angular/forms';
import {MapService} from './service/map.service';
import { MapSearchComponent } from '../map-search/map-search.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MapRoutingModule,
    FormsModule
  ],
  declarations: [MapComponent, MapSearchComponent],
  providers: [
    MapService
  ]
})
export class MapModule { }
