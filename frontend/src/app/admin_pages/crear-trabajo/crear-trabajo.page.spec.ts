import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearTrabajoPage } from './crear-trabajo.page';

describe('CrearTrabajoPage', () => {
  let component: CrearTrabajoPage;
  let fixture: ComponentFixture<CrearTrabajoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
