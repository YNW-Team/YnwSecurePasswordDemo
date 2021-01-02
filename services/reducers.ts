import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigI } from 'ynw-secure-password/lib/interfaces';
import { ConfigInputI } from '@services/types';

export interface ResultI {
	type: string;
	result: string;
}

interface StateI {
	configInput?: ConfigInputI;
	config?: ConfigI;
	result?: ResultI;
}

export type GeneratorStateI = Readonly<StateI>;

export const initialState: GeneratorStateI = {} as GeneratorStateI;

const generatorSlice = createSlice({
	name: 'generator',
	initialState,
	reducers: {
		setGeneratorState(state, action: PayloadAction<GeneratorStateI>) {
			return { ...state, ...action.payload };
		},
	},
});

export const { setGeneratorState } = generatorSlice.actions;

// COMBINED REDUCERS
const reducers = { generator: generatorSlice.reducer };

export default combineReducers(reducers);
