import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';

export interface AppState {
  // Define features here
}

export const reducers: ActionReducerMap<AppState> = {
  // Add reducers here
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
