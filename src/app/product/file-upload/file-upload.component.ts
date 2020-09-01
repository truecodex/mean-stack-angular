import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { UploadResponse } from '../models/upload-response';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  upload: UploadResponse = new UploadResponse();
  isActive: boolean;

  constructor(
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
    console.log('Drag over');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Drag leave');
    this.isActive = false;
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log('drop here');
    let droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      this.onDroppedFile(droppedFiles);
    }
    this.isActive = false;
  }

  onSelectedFile(event: any) {
    if(event.target.files.length > 0) {
      this.onDroppedFile(event.target.files);
    }
  }

  onDroppedFile(droppedFiles: any) {
    let formData = new FormData();
    for(let item of droppedFiles) {
      formData.append('userfiles', item)
    }

    this.fileUploadService.fileUpload(formData).subscribe(
      result => {
        this.upload = result;
      }
    )
  }

}
