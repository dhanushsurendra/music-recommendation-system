import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/authSlice/apiCalls'
import Joi from 'joi'
import TextField from '../../components/Inputs/TextField'
import Button from '../../components/Button'
import logo from '../../images/logo-color.png'
import styles from './styles.module.scss'
import axios from 'axios'

const code = new URLSearchParams(window.location.search).get('code')

const Login = () => {
	const [data, setData] = useState({ email: '', password: '' })
	const [errors, setErrors] = useState({})
	const { isFetching } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	const handleInputState = (name, value) => {
		setData({ ...data, [name]: value })
	}

	const handleErrorState = (name, value) => {
		value === ''
			? delete errors[name]
			: setErrors({ ...errors, [name]: value })
	}

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label('Email'),
		password: Joi.string().required().label('Password')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (Object.keys(errors).length === 0) {
			login(data, dispatch)
		} else {
			console.log('please fill out properly')
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.logo_container}>
				<Link to="/">
					<img src={logo} alt="logo" />
				</Link>
			</div>
			<main className={styles.main}>
				<h1 className={styles.heading}>
					To continue, log in to Napster.
				</h1>

				<form
					onSubmit={handleSubmit}
					className={styles.form_container}
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<div className={styles.input_container}>
						<TextField
							label="Enter your email"
							placeholder="Enter your email"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							label="Password"
							placeholder="Password"
							name="password"
							handleInputState={handleInputState}
							schema={schema.password}
							handleErrorState={handleErrorState}
							value={data.password}
							error={errors.password}
							type="password"
							required={true}
						/>
					</div>
					<div
						styles={{
							width: '100%',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<div className={styles.form_bottom}>
							{/* <Checkbox label="Remember me" /> */}
							<Button
								type="submit"
								label="LOG IN"
								isFetching={isFetching}
								style={{
									color: 'white',
									background: '#15883e',
									width: '30rem'
								}}
							/>
						</div>
					</div>
				</form>
				<h1 className={styles.dont_have_account}>
					Don't have an account?
				</h1>
				<Link to="/signup">
					<button className={styles.outline_btn}>
						sign up for Napster
					</button>
				</Link>
			</main>
		</div>
	)
}

export default Login
