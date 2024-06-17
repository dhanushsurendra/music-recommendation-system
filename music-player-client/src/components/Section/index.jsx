import { NavLink } from 'react-router-dom'
import Playlist from '../Playlist'
import styles from './styles.module.scss'

const Section = ({ title, playlists, notPlaylist }) => {
	return (
		<div className={styles.section}>
			<div style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem"}}>
				<h2 className="heading__primary" style={{marginLeft: "1rem"}}>{title}</h2>
			</div>

			<div className={styles.sectionContainer}>
				<Playlist playlists={playlists} notPlaylist={notPlaylist} />
			</div>
		</div>
	)
}

export default Section
