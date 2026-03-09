import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPhrasesComponent } from './key-phrases.component';

describe('KeyPhrasesComponent', () => {
  let component: KeyPhrasesComponent;
  let fixture: ComponentFixture<KeyPhrasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyPhrasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyPhrasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
