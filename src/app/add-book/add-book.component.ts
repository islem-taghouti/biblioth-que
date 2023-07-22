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
      // pour remplir les valeurs des inputs lors de modif
      this.bookForm.patchValue(this.data);
    }
  }

  onFormSubmit() {

    // V"rification si le formulaire est valide 
    if (this.bookForm.valid) {
      // edit
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
      
      } // ajout d'un livre
       else {
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
    } // si le formulaire n'est pas valide 
    else {
      Object.keys(this.bookForm.controls).forEach((key: string) => {
        this.bookForm.controls[key].markAsTouched();
      });
    }
  }
// cancel
  close() {
    this._dialogRef.close();
  }
}
