import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';
import {City} from '../../types/city.ts';

export const getCity = (state: State): City => state[NameSpace.City];
