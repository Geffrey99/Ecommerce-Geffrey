import { Component } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'modal-confirmacion',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
   <!-- <mat-dialog-actions align="end"> -->
     <!-- <button mat-button mat-dialog-close (click)="onClose">{{ data.buttonText }}</button> -->
    <!-- </mat-dialog-actions> -->
  `,
  styles: [`
    h2 {
      color: red;
    }
  `]
})
export class ModalConfirmacionComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Cierraaa el modal automáticamente después de 2 segundos okok Perfect
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}