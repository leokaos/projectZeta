import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-avatar-panel',
  templateUrl: './avatar-panel.component.html',
  styleUrls: ['./avatar-panel.component.css']
})
export class AvatarPanelComponent {

  @Input() imagem: string;

  @Output() imagemChange = new EventEmitter<string>();

  constructor() { }

  public onChangeAvatar(files: FileList): void {

    let file = files[0];
    let pattern = /image-*/;
    let reader = new FileReader();

    if (file.type.match(pattern)) {
      reader.onload = this.setBase64Image.bind(this);
      reader.readAsDataURL(file);
    }
  }

  public setBase64Image(e: any): void {
    this.imagem = e.target.result;
    this.imagemChange.emit(this.imagem);
  }

}
