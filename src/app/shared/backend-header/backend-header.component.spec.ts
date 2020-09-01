import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendHeaderComponent } from './backend-header.component';

describe('BackendHeaderComponent', () => {
  let component: BackendHeaderComponent;
  let fixture: ComponentFixture<BackendHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
