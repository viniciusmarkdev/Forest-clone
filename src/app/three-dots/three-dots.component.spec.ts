import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDotsComponent } from './three-dots.component';

describe('ThreeDotsComponent', () => {
  let component: ThreeDotsComponent;
  let fixture: ComponentFixture<ThreeDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeDotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
