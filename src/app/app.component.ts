import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from './add-book/add-book.component';
import { BookService } from './services/book.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'Nom', 'Auteur', 'Editeur', 'Annee','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog, private _bookservice:BookService) {}
  ngOnInit():void{
    this.getBooks()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openAddBookComponent(){
    const dialogRef = this._dialog.open(AddBookComponent)
    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getBooks(){
    this._bookservice.getBooks().subscribe({
      next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
      },error: console.error,
    })  }
    deleteBook(id:number){
      console.log(id);
      
      this._bookservice.deleteBook(id).subscribe({
        next: (res) =>{
          alert('book deleted successfully')
          this.getBooks()
        },
        error:console.log,
        
      })
    }
    EditBook(data:any) {
      const dialogRef = this._dialog.open(AddBookComponent , {
        data,
      
      })
      dialogRef.afterClosed().subscribe(() => {
        this.getBooks();
      });
     console.log(data);
     
    }

}
