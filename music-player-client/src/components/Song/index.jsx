import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSong } from '../../redux/audioPlayer'
import Like from '../Like'
import { IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import styles from './styles.module.scss'
import PlaylistMenu from '../PlaylistMenu'
import { Link } from 'react-router-dom'
import { TbNotes } from 'react-icons/tb'
import axiosInstance from '../../redux/axiosInstance'

const Song = ({ song, playlist, handleRemoveSong }) => {

	const [menu, setMenu] = useState(false)
	const { currentSong } = useSelector((state) => state.audioPlayer)
	const dispatch = useDispatch()

	const convertMinutes = (seconds) => {
		seconds = parseInt(seconds, 10)
		let minutes = Math.floor(seconds / 60)
		let extraSeconds = seconds % 60
		minutes = minutes < 10 ? '0' + minutes : minutes
		extraSeconds = extraSeconds < 10 ? '0' + extraSeconds : extraSeconds
		return `${minutes}:${extraSeconds}`
	}

	const handleChange = async () => {

		try {
			const url = process.env.REACT_APP_API_URL + "/songs/recents/" + song._id;
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
		<div className={styles.song_container}>
			<div className={styles.left}>
				<IconButton onClick={handleChange} className={styles.play_btn}>
					{currentSong &&
					currentSong.action === 'play' &&
					currentSong.song._id === song._id ? (
						<PauseIcon />
					) : (
						<PlayArrowIcon />
					)}
				</IconButton>
				<img src={song.img} alt="song_img" />
				<p>{song.name}</p>
			</div>
			<div className={styles.center}>
				<p>{song.artist}</p>
			</div>
			<div className={styles.right}>
				{currentSong && (
					<Fragment>
						<Link
							to={
								'/lyrics/?artist=' +
								currentSong.song.artist +
								'&name=' +
								currentSong.song.name
							}
						>
							<IconButton>
								<TbNotes style={{ color: "#919496" }} className={styles.lyrics}></TbNotes>
							</IconButton>
						</Link>
						<Like songId={song._id} />
					</Fragment>
				)}

				<div style={{ width: '5rem'}}>
					<p>{convertMinutes(song.duration)}</p>
				</div>
				<IconButton
					className={styles.menu_btn}
					onClick={() => setMenu(true)}
				>
					<MoreHorizIcon />
				</IconButton>
				{menu && (
					<PlaylistMenu
						playlist={playlist}
						song={song}
						handleRemoveSong={handleRemoveSong}
						closeMenu={() => setMenu(false)}
					/>
				)}
			</div>
		</div>
	)
}

export default Song
