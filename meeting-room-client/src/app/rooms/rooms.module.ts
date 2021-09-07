import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '../shared/material/material.module';
import { CreateRoomsComponent } from './create-rooms/create-rooms.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { InputsModule } from '../shared/components/inputs/inputs.module';
import { ShowRoomsComponent } from './show-rooms/show-rooms.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    InfiniteScrollModule
  ],
  declarations: [CreateRoomsComponent, ListRoomsComponent, ShowRoomsComponent]
})
export class RoomsModule { }
