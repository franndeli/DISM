import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { consultarFichaje } from './consultarFichaje.page';

describe('consultarFichaje', () => {
  let component: consultarFichaje;
  let fixture: ComponentFixture<consultarFichaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [consultarFichaje],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(consultarFichaje);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
