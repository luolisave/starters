import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRxjsComponent } from './my-rxjs.component';

describe('MyRxjsComponent', () => {
  let component: MyRxjsComponent;
  let fixture: ComponentFixture<MyRxjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRxjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
