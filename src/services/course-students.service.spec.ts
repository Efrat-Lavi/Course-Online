import { TestBed } from '@angular/core/testing';

import { CourseStudentsService } from './course-students.service';

describe('CourseStudentsService', () => {
  let service: CourseStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
