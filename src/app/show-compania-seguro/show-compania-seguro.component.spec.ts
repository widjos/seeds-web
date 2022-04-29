import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompaniaSeguroComponent } from './show-compania-seguro.component';

describe('ShowCompaniaSeguroComponent', () => {
  let component: ShowCompaniaSeguroComponent;
  let fixture: ComponentFixture<ShowCompaniaSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCompaniaSeguroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCompaniaSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
