import { Fragment, useEffect, useState } from 'react'
import Song from '../../components/Song'
import Playlist from '../../components/Playlist'
import { IconButton, CircularProgress } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import styles from './styles.module.scss'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import axiosInstance from '../../redux/axiosInstance'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Search = ({ accessToken }) => {
	const [search, setSearch] = useState('')
	const [lyrics, setLyrics] = useState('')
	const [results, setResults] = useState([])

	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const emotion = queryParams.get('emotion') ?? ''
	const [isFetching, setIsFetching] = useState(false)

	useEffect(() => {
		setSearch(emotion)
		searchSongs(emotion)
	}, [])

	const handleSearch = async ({ currentTarget: input }) => {

		setSearch(input.value)
		setResults({})

		await searchSongs(input.value)
	}

	const searchSongs = async (value) => {
		try {
			const url =
				process.env.REACT_APP_API_URL + `/?search=${value}`
			const { data } = await axiosInstance.get(url)
			setResults(data)

			setIsFetching(false)
		} catch (error) {
			console.log(error)
			setIsFetching(false)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.search_input_container}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<input
					type="text"
					placeholder="Search for songs and playlists"
					onChange={handleSearch}
					value={search}
				/>
				<IconButton onClick={() => setSearch('')}>
					<ClearIcon />
				</IconButton>

				<Link to="/emotionbasedsearch">
					<IconButton>
						<TagFacesIcon />
					</IconButton>
				</Link>
			</div>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress
						style={{ color: '#1ed760' }}
						size="5rem"
					/>
				</div>
			)}
			{Object.keys(results).length !== 0 && (
				<div className={styles.results_container}>
					{results.songs.length !== 0 && (
						<div className={styles.songs_container}>
							{results.songs.map((song) => (
								<Fragment key={song._id}>
									<Song song={song} setLyrics={setLyrics} />
								</Fragment>
							))}
						</div>
					)}
					{results.playlists.length !== 0 && (
						<div className={styles.playlists_container}>
							<Playlist playlists={results.playlists} />
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Search
