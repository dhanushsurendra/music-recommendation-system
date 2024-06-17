import { Fragment, useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import axiosInstance from '../../redux/axiosInstance'
import styles from './styles.module.scss'
import Section from '../../components/Section'
import RecentlyPlayed from '../../components/RecentlyPlayed'
import { useSelector } from 'react-redux'

const Home = () => {
	const [firstPlaylists, setFirstPlaylists] = useState([])
	const [secondPlaylists, setSecondPlaylists] = useState([])
	const { user } = useSelector((state) => state.user)
	const [top, setTop] = useState([])
	const [greet, setGreet] = useState('')
	const [recents, setRecents] = useState([])
	const [recommendedSongs, setRecommendedSongs] = useState([])
	const [isFetching, setIsFetching] = useState(false)
	const state = useSelector((state) => state.spotify)

	const getRandomPlaylists = async () => {
		try {
			setIsFetching(true)
			const url = process.env.REACT_APP_API_URL + '/playlists/random'
			const { data } = await axiosInstance.get(url)
			const array1 = data.data.splice(0, 4)
			const array2 = data.data
			setFirstPlaylists(array1)
			setSecondPlaylists(array2)
			setIsFetching(false)
		} catch (error) {
			setIsFetching(false)
		}
	}

	const getTop = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/songs/top'
			const { data } = await axiosInstance.get(url)
			setTop(data.data.slice(0, 6))
		} catch (error) {
			console.log(error)
		}
	}

	const getRecents = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/songs/recents'
			const { data } = await axiosInstance.get(url)
			console.log(data)
			setRecents(data.data.slice(0, 6))
		} catch (error) {
			console.log(error)
		}
	}

	const getRecommended = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/songs/recommended'
			const { data } = await axiosInstance.get(url)
			setRecommendedSongs(data.data)
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getRandomPlaylists()
		getTop()
		getRecents()
		getRecommended()

		// greet message to be displayed
		const myDate = new Date()
		const hrs = myDate.getHours()

		if (hrs < 12) setGreet('Good morning')
		else if (hrs >= 12 && hrs <= 17) setGreet('Good afternoon')
		else if (hrs >= 17 && hrs <= 24) setGreet('Good evening')
	}, [])

	return (
		<Fragment>
			{isFetching ? (
				<div className={styles.progress_container}>
					<CircularProgress
						style={{ color: '#1ed760' }}
						size="5rem"
					/>
				</div>
			) : (
				<div className={styles.container}>
					<h1 style={{ color: '#17202c', marginLeft: '2rem' }}>
						{greet}
					</h1>
					<Section
						title="Global Top 10"
						playlists={top}
						notPlaylist={true}
						navigateTo="/songs"
					/>
					{recommendedSongs.length !== 0 && (
						<Section
							title="Songs You Might Like"
							playlists={recommendedSongs}
							all={false}
							notPlaylist={true}
						/>
					)}
					{firstPlaylists.length !== 0 && (
						<Section title="PlayLists" playlists={firstPlaylists} />
					)}
					{secondPlaylists.length !== 0 && (
						<Section
							title="Just the hits"
							playlists={secondPlaylists}
						/>
					)}
					{recents.length !== 0 && <RecentlyPlayed songs={recents} />}
				</div>
			)}
		</Fragment>
	)
}

export default Home
