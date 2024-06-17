import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createPlayList } from '../../redux/playListSlice/apiCalls'
import { CircularProgress } from '@mui/material'
import logo from '../../images/logo-color.png'
import styles from './styles.module.scss'

import { HiHome } from 'react-icons/hi'
import { RiSearch2Fill } from 'react-icons/ri'
import { BsFillPersonFill } from 'react-icons/bs'
import { BsFillHeartFill } from 'react-icons/bs'
import { RiLogoutCircleRFill } from 'react-icons/ri'
import { MdLocalLibrary, MdOutlinePlaylistPlay } from 'react-icons/md'
import { RiFolderAddFill } from 'react-icons/ri'
import { logout } from "../../redux/authSlice";
import { setCurrentSong } from "../../redux/audioPlayer";

const Sidebar = () => {
	const { playlists, getPlayListProgress, createPlayListProgress } =
		useSelector((state) => state.playlists)
	const { user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logout());
		dispatch(setCurrentSong(null));
		window.location = "/login";
	};


	const handleCreatePlayList = () => {
		const data = {
			name: 'My Playlist #' + (playlists.length + 1),
			user: user._id,
			desc: 'By ' + user.name,
			songs: [],
			img: ''
		}
		createPlayList(data, dispatch)
	}

	return (
		<div className={styles.container}>
			<img className={styles.logo_img} src={logo} alt="logo" />
			<p
				style={{
					fontSize: '2rem',
					color: '#303e65',
					fontWeight: 600,
					marginLeft: '2rem'
				}}
			>
				Menu
			</p>
			<NavLink
				to="/home"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<HiHome size={30} />
				<span>Home</span>
			</NavLink>

			<NavLink
				to="/search"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<RiSearch2Fill size={26} />
				<span>Search</span>
			</NavLink>

			<NavLink
				to="/me"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<BsFillPersonFill size={30} />
				<span>Profile</span>
			</NavLink>

			{/* <NavLink
				to="/artists"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<BsFillPersonFill size={28} />
				<span>Your Library</span>
			</NavLink> */}

			<NavLink
				to="/collection/playlists"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<MdLocalLibrary size={28} />
				<span>Your Library</span>
			</NavLink>

			<NavLink
				to="/collection/tracks"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>

				<BsFillHeartFill size={22} />
				<span>Favorites</span>
			</NavLink>

			{/* <NavLink
				to="/collection/playlists"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<MdOutlinePlaylistPlay size={28} />
				<span>Playlist</span>
			</NavLink> */}

			<NavLink
				to={"/playlist/" + user._id}
				className={styles.menu_link}
				activeClassName={styles.active_menu}
				>
				<MdOutlinePlaylistPlay size={28} />
				<span>Playlist</span>
			</NavLink>

			<div className={styles.menu_link} onClick={handleCreatePlayList} style={{cursor: 'pointer'}}>
				<RiFolderAddFill size={28} />
				<span>Create Playlist</span>
			</div>

			{getPlayListProgress || createPlayListProgress ? (
				<div className={styles.progress_container}>
					<CircularProgress
						style={{ color: '#1ed760' }}
						size="3rem"
					/>
				</div>
			) : (
				<Fragment>
					{playlists.map((playlist) => (
						<NavLink
							key={playlist._id}
							to={`/playlist/${playlist._id}`}
							activeClassName={styles.active_link}
							className={styles.playlist_link}
						>
							{playlist.name}
						</NavLink>
					))}
				</Fragment>
			)}

			<div className={styles.underline}></div>

			<div
				style={{cursor: 'pointer'}}
				onClick={handleLogout}
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<RiLogoutCircleRFill size={28} />
				<span>Logout</span>
			</div>

		</div>
	)
}

export default Sidebar
