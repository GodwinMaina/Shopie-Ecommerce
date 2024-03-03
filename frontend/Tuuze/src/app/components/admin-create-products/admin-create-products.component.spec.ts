import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateProductsComponent } from './admin-create-products.component';

describe('AdminCreateProductsComponent', () => {
  let component: AdminCreateProductsComponent;
  let fixture: ComponentFixture<AdminCreateProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
