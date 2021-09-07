import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-rooms',
  templateUrl: './create-rooms.component.html',
  styleUrls: ['./create-rooms.component.scss']
})
export class CreateRoomsComponent implements OnInit {

  options: FormGroup | undefined;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

  }

}
