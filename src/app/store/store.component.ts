import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  // shareClickEvent 
  clickEventsubscription:Subscription;

  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comments', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService, private dialog:MatDialog, private ShareService:SharedService) { 
    this.clickEventsubscription=this.ShareService.getClickEvent().subscribe(()=>{
      this.getAllProducts();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProducts(){
    this.api.getProduct().subscribe({ next: res =>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },
      error: err => {
        alert("Error while fetching products");
      }
    })
  }

  editProduct(element: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:element
  }).afterClosed().subscribe(result =>{
    if(result === 'update'){
      this.getAllProducts();
    }
  })
  }

  deleteProduct(id: number){
   this.api.deleteProduct(id).subscribe({ next: res =>{
    alert("Product deleted successfully");
    this.getAllProducts();
    },
    error: err => {
      alert("Error while deleting product");
    }
  })
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

}
