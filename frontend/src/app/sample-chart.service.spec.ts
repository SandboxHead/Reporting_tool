import { TestBed } from '@angular/core/testing';

import { SampleChartService } from './sample-chart.service';

describe('SampleChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SampleChartService = TestBed.get(SampleChartService);
    expect(service).toBeTruthy();
  });
});
