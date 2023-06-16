import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersMenuComponent } from './filters-menu.component';

describe('FiltersMenuComponent', () => {
  let component: FiltersMenuComponent;
  let fixture: ComponentFixture<FiltersMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersMenuComponent]
    });
    fixture = TestBed.createComponent(FiltersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
