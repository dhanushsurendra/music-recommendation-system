import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PlayButton from '../PlayButton'
import styles from './styles.module.scss'

const Playlist = ({ playlists, notPlaylist }) => {
	const clipText = (text) => {
		if (text.length > 15) {
			return text.slice(0, 15) + '...'
		}
		return text
	}

	return (
		<Fragment>
			{playlists.map((song) => (
				<Link key={song._id} to={notPlaylist ? '#' : `/playlist/${song._id}`}>
					<div className={styles.playlist}>
						{song.img === '' ? (
							<img
								src="https://static.thenounproject.com/png/17849-200.png"
								alt={song.name}
								style={{ background: '#919496' }}
							/>
						) : (
							<img src={song.img} alt={song.name} />
						)}
						{notPlaylist &&
						<div className={styles.playBtnContainer}>
							<PlayButton song={song} />
						</div>}
						<p>{clipText(song.name)}</p>
						{!notPlaylist && <span>{song.desc}</span>}
						<span>{song.artist}</span>
					</div>
				</Link>
			))}
		</Fragment>
	)
}

export default Playlist
