import reducer from './reducer';
import {restartGame, makeGuess, generateAuralUpdate} from './actions';

describe('Reducer', () => {
    
    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.auralStatus).toEqual('');
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

	describe('restartGame', () => {
		it('Should start a new game', () => {
			let state = {
				guesses: [50, 75, 55, 45],
				feedback: 'You are not even close!',
				correctAnswer: 25
			};

			let correctAnswer = 50;

			state = reducer(state, restartGame(correctAnswer));			
			expect(state.guesses).toEqual([]);
        	expect(state.feedback).toEqual('Make your guess!');
        	expect(state.correctAnswer).toEqual(correctAnswer);
        	expect(state.auralStatus).toEqual('');
		});
	});

    describe('Make a guess', () => {
		it('Should make guess', () => {
			let state = {
				guesses: [],
				feedback: 'Make a guess!',
				correctAnswer: 1
			};

			state = reducer(state, makeGuess(75));			
			expect(state.guesses).toEqual([75]);
        	expect(state.feedback).toEqual("You're Ice Cold...");

        	state = reducer(state, makeGuess(35));			
			expect(state.guesses).toEqual([75, 35]);
        	expect(state.feedback).toEqual("You're Cold...");

        	state = reducer(state, makeGuess(15));			
			expect(state.guesses).toEqual([75, 35, 15]);
        	expect(state.feedback).toEqual("You're Warm.");

        	state = reducer(state, makeGuess(10));			
			expect(state.guesses).toEqual([75, 35, 15, 10]);
        	expect(state.feedback).toEqual("You're Hot!");

        	state = reducer(state, makeGuess(1));			
			expect(state.guesses).toEqual([75, 35, 15, 10, 1]);
        	expect(state.feedback).toEqual("You got it!");
		});
	});

	describe('Generate aural update', () => {
		it('Should generate an aural update', () => {
			let state = {
				guesses: [4, 3, 2],
				feedback: "You're hot!",
				auralStatus: ''
			};

			state = reducer(state, generateAuralUpdate());			
			expect(state.auralStatus).toEqual(
				"Here's the status of the game right now: You're hot! You've made 3 guesses. In order of most- to least-recent, they are: 2, 3, 4"
			);
		});
	});


});