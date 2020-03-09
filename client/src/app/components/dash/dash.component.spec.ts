
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashComponent } from './dash.component';
import { MaterialComponentsModule } from '@app/modules/material-components.module';

describe('DashComponent', () => {
  let component: DashComponent;
  let fixture: ComponentFixture<DashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashComponent],
      imports: [MaterialComponentsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
