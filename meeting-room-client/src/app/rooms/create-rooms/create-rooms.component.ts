import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateInputsService } from 'src/app/shared/components/inputs/validade-inputs.service';

@Component({
  selector: 'app-create-rooms',
  templateUrl: './create-rooms.component.html',
  styleUrls: ['./create-rooms.component.scss']
})
export class CreateRoomsComponent implements OnInit {

  createdRoom!: FormGroup;

  constructor(public validate: ValidateInputsService,
              private fb: FormBuilder) { }

  get f() {
    return this.createdRoom.controls;
  }

  ngOnInit(): void {

    this.createdRoom = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlPhoto: ['', [Validators.minLength(10)]],
      date: ['', [Validators.required]],
      startHour: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      endHour: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      description: ['', [Validators.minLength(5)]]
    });
  }

  save(): void {
    this.createdRoom.markAllAsTouched();
    if (this.createdRoom.invalid) {
      return console.log("Error");
    }

    alert('SUCESSO!!\n\n' + JSON.stringify(this.createdRoom.value, null, 4));
  }

  restartForm(): void {
    this.createdRoom.reset();
  }

}
