import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.model';
import { PatientsState } from "./patients/patients.model";
import { patientsReducer } from "./patients/patients.reducer";
import { OrdersState } from "./orders/orders.model";
import { ordersReducer } from "./orders/orders.reducer";

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  patients: patientsReducer,
  settings: settingsReducer,
  router: routerReducer,
  orders: ordersReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export const selectPatientsState  = createFeatureSelector<
    AppState,
    PatientsState
>('patients');

export const selectOrdersState  = createFeatureSelector<
    AppState,
    OrdersState
>('orders');

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  patients: PatientsState;
  orders: OrdersState;
  router: RouterReducerState<RouterStateUrl>;
}
