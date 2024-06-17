import PlayButton from '../../components/PlayButton'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'

const RecentlyPlayed = (songs, updateRecentList) => {

	const number = (index) => {
        return index >= 1 && index <= 9 ? `0${index}` : index
    }   

    const convertMinutes = (seconds) => {
		seconds = parseInt(seconds, 10)
		let minutes = Math.floor(seconds / 60)
		let extraSeconds = seconds % 60
		minutes = minutes < 10 ? '0' + minutes : minutes
		extraSeconds = extraSeconds < 10 ? '0' + extraSeconds : extraSeconds
		return `${minutes}:${extraSeconds}`
	}

	return (
		<div className={styles.sectionItemContainer}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '1rem',
					padding: '1rem 2rem 0.5rem 2rem'
				}}
			>
				<h2 className="heading__primary">Recently Played</h2>
				<NavLink
					to={'/songs'}
					className="heading__text"
					style={{ fontWeight: '600' }}
				></NavLink>
			</div>

			{songs.songs.map((song, index) => (
				<div className={styles.container} key={song._id}>
				<div className={styles.info}>
					<h2 style={{color: '#7c8db5', marginRight: '1rem'}}>{number(index + 1)}</h2>
					<div className={styles.imageInfo}>
						<div>
							<img src={song.img} />
						</div>
						<div>
							<p className="heading__primary" style={{marginBottom: 0, fontSize: '1.6rem'}}>{song.name}</p>
							<p style={{color: '#7c8db5', marginTop: 0}}>{song.artist}</p>
						</div>
					</div>
				</div>
				<div className={styles.controls}>
					<p style={{color: '#7c8db5', fontSize: '1.5rem', fontWeight: '600'}}>{convertMinutes(song.duration)}</p>
					<PlayButton song={song} />
				</div>
			</div>
			))}
		</div>
	)
}

export default RecentlyPlayed
