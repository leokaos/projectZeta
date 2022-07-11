import { Component, ViewChild, ElementRef,  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-inline',
  templateUrl: './edit-inline.component.html',
  styleUrls: ['./edit-inline.component.scss']
})
export class EditInlineComponent {

  @ViewChild('parent', { static: false }) parent: ElementRef;

  @ViewChild('dataText', { static: false }) inputText: ElementRef;

  @Input() data: string;

  @Output() dataChange = new EventEmitter<string>();

  readOnly: boolean = true;
  editing: boolean = true;
  showEditButton: boolean = true;

  constructor() { }

  public editar(): void {
    this.editing = true;
    this.showEditButton = false;
  }

  public cancelar(): void {
    this.editing = false;
  }

  public confirmar(): void {
    this.editing = false;
    this.data = this.inputText.nativeElement.value;
    this.dataChange.emit(this.data);
  }

  public showEditButttons(): void {
    this.showEditButton = true;
  }

  public hideEditButtons(): void {
    this.showEditButton = false;
  }

}
