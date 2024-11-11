import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { realizarFichaje } from './realizarFichaje.page';

describe('realizarFichaje', () => {
  let component: realizarFichaje;
  let fixture: ComponentFixture<realizarFichaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [realizarFichaje],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(realizarFichaje);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
