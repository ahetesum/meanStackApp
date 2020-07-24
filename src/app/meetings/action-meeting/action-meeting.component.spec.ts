import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMeetingComponent } from './action-meeting.component';

describe('ActionMeetingComponent', () => {
  let component: ActionMeetingComponent;
  let fixture: ComponentFixture<ActionMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
