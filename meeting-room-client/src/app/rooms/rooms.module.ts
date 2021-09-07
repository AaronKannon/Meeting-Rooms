import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';
import { CreateRoomsComponent } from './create-rooms/create-rooms.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [CreateRoomsComponent, ListRoomsComponent]
})
export class RoomsModule { }
