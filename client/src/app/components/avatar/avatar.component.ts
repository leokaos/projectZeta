import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  @Input() imagem: string;

  @Output() imagemChange = new EventEmitter<string>();

  constructor() { }

  public onChangeAvatar(files: any): void {

    let file = files.target.files[0];
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
