import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Auth] Set Available Trainings';
export const SET_PAST_TRAININGS = '[Auth] Set Past Trainings';
export const START_TRAINING = '[Auth] Start Training';
export const STOP_TRAINING = '[Auth] Stop Training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {
  }
}

export class SetPastTrainings implements Action {
  readonly type = SET_PAST_TRAININGS;

  constructor(public payload: Exercise[]) {
  }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {
  }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTrainings | SetPastTrainings | StartTraining | StopTraining;
