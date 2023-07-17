import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _bookservice: BookService,
    private _dialogRef: DialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bookForm = this._fb.group({
      intitule: ['', Validators.required],
      auteur: ['', Validators.required],
      editeur: ['', Validators.required],
      annee: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.bookForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.bookForm.valid) {
      if (this.data) {
        console.log(this.bookForm.value);
        this._bookservice.editBook(this.data.id, this.bookForm.value).subscribe({
          next: (val: any) => {
            alert('Book updated successfully');
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        console.log(this.bookForm.value);
        this._bookservice.addBook(this.bookForm.value).subscribe({
          next: (val: any) => {
            alert('Book added successfully');
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    } else {
      Object.keys(this.bookForm.controls).forEach((key: string) => {
        this.bookForm.controls[key].markAsTouched();
      });
    }
  }

  close() {
    this._dialogRef.close();
  }
}
