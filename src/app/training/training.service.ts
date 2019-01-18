import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from '../training/training.actions';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) {
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db.collection('availableExercises').snapshotChanges().pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data(),
          } as Exercise;
        });
      }))
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        }, error => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackBar(
            'Could not fetch exercises. Please try again later.',
            null,
            3000);
        }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.storeExercise({
        ...ex,
        date: new Date(),
        state: 'Completed'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.storeExercise({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'Cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchPastExercises() {
    this.fbSubs.push(
      this.db.collection('pastExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetPastTrainings(exercises));
        }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private storeExercise(exercise: Exercise) {
    this.db.collection('pastExercises').add(exercise);
  }
}
