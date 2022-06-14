import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public AddEmployeeForm!: FormGroup;
  public actionBtn: string = 'save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.AddEmployeeForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: [
        '',
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
    if (this.editData) {
      this.actionBtn = 'update';
      this.AddEmployeeForm.controls['id'].setValue(this.editData.id);
      this.AddEmployeeForm.controls['name'].setValue(this.editData.name);
      this.AddEmployeeForm.controls['email'].setValue(this.editData.email);
      this.AddEmployeeForm.controls['mobile'].setValue(this.editData.mobile);
    }
  }
  addEmployee() {
    if (!this.editData) {
      if (this.AddEmployeeForm.valid) {
        this.api.postEmployee(this.AddEmployeeForm.value).subscribe({
          next: (res) => {
            alert('Employee Added successfully');
            this.AddEmployeeForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding the employee');
          },
        });
      }
    } else {
      this.updateEmployee();
    }
  }
  updateEmployee() {
    this.api
      .putEmployee(this.AddEmployeeForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Employee details updated successfully');
          this.AddEmployeeForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('Error while updating the record');
        },
      });
  }
}
