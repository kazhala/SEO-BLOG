/**
 * Sign in component
 */
import { useReducer } from 'react';
import { signin, authenticate } from '../../actions/auth';
import Router from 'next/router';

//use reducer initial state
const initialState = {
	email: 'kevin7441@gmail.com',
	password: '111111',
	error: '',
	loading: false,
	message: '',
	showForm: true
};

//use reducer reducer methods
const reducer = (state, action) => {
	switch (action.type) {
		case 'email':
			return { ...state, email: action.payload };
		case 'password':
			return { ...state, password: action.payload };
		case 'loading':
			return { ...state, loading: true, error: '' };
		case 'error':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const SignInComponent = () => {
	const [formState, dispatch] = useReducer(reducer, initialState);
	const { email, password, loading, error, message, showForm } = formState;

	//handle form submission
	const handleSubmit = e => {
		e.preventDefault();
		dispatch({ type: 'loading' });
		const user = { email, password };
		signin(user).then(res => {
			if (res.error) {
				dispatch({ type: 'error', payload: res.error });
			} else {
				//save user token to cookie
				//save user info to local storage
				//authenticate user
				authenticate(res, () => {
					Router.push('/');
				});
			}
		});
	};

	const showLoading = () =>
		loading ? <div className="alert alert-info">Loading...</div> : '';

	const showError = () =>
		error ? <div className="alert alert-danger">{error}</div> : '';

	const showMessage = () =>
		message ? <div className="alert alert-info">{message}</div> : '';

	//handle form input field change
	const handleChange = e => {
		//based on event value and name dispatch action to change values
		dispatch({ type: e.target.name, payload: e.target.value });
	};

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						value={email}
						name="email"
						className="form-control"
						type="email"
						placeholder="Type your email"
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<input
						value={password}
						name="password"
						className="form-control"
						type="password"
						placeholder="Type your password"
						onChange={handleChange}
					/>
				</div>

				<div>
					<button className="btn btn-primary">Sign In</button>
				</div>
			</form>
		);
	};

	return (
		<React.Fragment>
			{showError()}
			{showMessage()}
			{showLoading()}
			{showForm && signinForm()}
		</React.Fragment>
	);
};

export default SignInComponent;
