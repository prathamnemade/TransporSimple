import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChainComponent } from './detail-chain.component';

describe('DetailChainComponent', () => {
  let component: DetailChainComponent;
  let fixture: ComponentFixture<DetailChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
