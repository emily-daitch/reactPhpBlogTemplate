import {getAverageSpeed} from "../components/Pages/Strava";
import { testSummaryRunActivity, testSummaryWalkActivity, testSummaryMixedActivities } from "./stravaTestData";

test('get average speed', () => {
    expect(getAverageSpeed(testSummaryRunActivity)).toBe(5.54);
    expect(getAverageSpeed(testSummaryWalkActivity)).toBe(3.20);
    expect(getAverageSpeed(testSummaryMixedActivities)).toBe(4.37);
  });

test('get average speed not NaN on empty set', () => {
    expect(getAverageSpeed([])).toBe(0);
  });