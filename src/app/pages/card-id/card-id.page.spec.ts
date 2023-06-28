import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardIDPage } from './card-id.page';

describe('CardIDPage', () => {
  let component: CardIDPage;
  let fixture: ComponentFixture<CardIDPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardIDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
