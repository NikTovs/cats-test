import { State, Action, StateContext } from '@ngxs/store';
import { StoreSettingsModel } from '../types/storeTypes';

export class SetBreed {
    static readonly type = '[Settings] SetBreed';
    constructor(public payload: string) {}
}

export class SetLimit {
    static readonly type = '[Settings] SetLimit';
    constructor(public payload: number) {}
}

@State<StoreSettingsModel>({
    name: 'settings',  
    defaults: {limit: 10, chosenBreed: ''}  
  })
export class SettingsState {

    @Action(SetBreed)
    setBreed({setState, getState}: StateContext<StoreSettingsModel>, {payload}: SetBreed) {
        setState({...getState(), chosenBreed: payload});
    }

    @Action(SetLimit)
    setLimit({setState, getState}: StateContext<StoreSettingsModel>, {payload}: SetLimit) {
        setState({...getState(), limit: payload});
    }

}