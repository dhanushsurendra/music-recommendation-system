import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../../redux/axiosInstance'
import styles from './styles.module.scss'

const Lyrics = () => {
	const query = new URLSearchParams(useLocation().search)
	const artist = query.get('artist')
	const name = query.get('name')

	const [lyrics, setLyrics] = useState('')
	const [isFetching, setIsFetching] = useState(false)

	useEffect(() => {
		setIsFetching(true)

		const getLyrics = async () => {
			try {
				const url = process.env.REACT_APP_API_URL + `/songs/lyrics?artist=${artist}&track=${name}`
				const { data } = await axiosInstance.get(url)
				setLyrics(data.lyrics)
				setIsFetching(false)
			} catch (err) {
				setIsFetching(false)
			}
		}

		getLyrics()
	}, [])

	return (
		<div className={styles.container}>
			<div
				style={{
					textAlign: 'center',
					whiteSpace: 'pre',
					width: '100%'
				}}
			>
				{isFetching && (
					<CircularProgress
						style={{ color: '#1ed760' }}
						size="5rem"
					/>
				)}
				<h1 style={{ fontWeight: 500, fontSize: '3rem' }}>{lyrics}</h1>
			</div>
		</div>
	)
}

export default Lyrics
