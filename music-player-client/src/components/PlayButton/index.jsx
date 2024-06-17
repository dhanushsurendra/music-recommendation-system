import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSong } from '../../redux/audioPlayer'
import { IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import axiosInstance from '../../redux/axiosInstance'

const PlayButton = ({ song }) => {
	const { currentSong } = useSelector((state) => state.audioPlayer)
	const dispatch = useDispatch()

	const handleChange = async () => {

		try {
			const url = process.env.REACT_APP_API_URL + "/songs/recents/" + song._id;
			await axiosInstance.post(url)
		} catch (error) {
			console.log(error);
		}

		try {
			const url = process.env.REACT_APP_API_URL + "/popular/" + song._id;
			await axiosInstance.post(url)
		} catch (error) {
			console.log(error);
		}

		if (currentSong && currentSong.action === 'play') {
			const payload = {
				song: song,
				action: 'pause'
			}
			dispatch(setCurrentSong(payload))
		} else {
			const payload = {
				song: song,
				action: 'play'
			}
			dispatch(setCurrentSong(payload))
		}
	}

	return (
		<div className={styles.playButton} style={{ position: 'realative' }}>
			{song && (
				<IconButton
					style={{
						display: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)'
					}}
					onClick={handleChange}
					className={styles.play_btn}
				>
					{currentSong &&
					currentSong.action === 'play' &&
					currentSong.song._id === song._id ? (
						<PauseIcon style={{ fill: '#1ed760' }} />
					) : (
						<PlayArrowIcon style={{ fill: '#1ed760' }} />
					)}
				</IconButton>
			)}
		</div>
	)
}

export default PlayButton
