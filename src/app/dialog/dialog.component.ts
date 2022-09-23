import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private formBuider :FormBuilder,
     private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuider.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comments: ['', Validators.required],
      date : ['', Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.patchValue(this.editData); // patch the form with the data
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({next: res => {
          alert("Product added successfully");
          console.log(res);
          this.productForm.reset(); // reset the form
          this.dialogRef.close('save'); // close the dialog
          this
        },error: err=>{
          console.log(err);
        }
      })
      }
    }else{
      this.api.updateProduct(this.editData.id,this.productForm.value).subscribe({next: res =>{
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: err =>{
        alert("Error while updating product");
      }
      })
    }
  }

}
