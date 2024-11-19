import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDinamicaComponent } from './pagina-dinamica.component';

describe('PaginaDinamicaComponent', () => {
  let component: PaginaDinamicaComponent;
  let fixture: ComponentFixture<PaginaDinamicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDinamicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
