import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTrabajoPage } from './editar-trabajo.page';

describe('EditarTrabajoPage', () => {
  let component: EditarTrabajoPage;
  let fixture: ComponentFixture<EditarTrabajoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
