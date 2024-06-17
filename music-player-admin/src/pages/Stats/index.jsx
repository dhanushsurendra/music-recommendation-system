import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import BarChart from '../../components/Charts/BarChart/BarChart'
import PieChart from '../../components/Charts/PieChart/PieChart'
import SongTable from '../../components/Tables/SongTable'
import styles from './styles.module.scss'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import axiosInstance from '../../redux/axiosInstance'

const Stats = () => {
	const [songs, setSongs] = useState([])
	const { song } = useSelector((state) => state.songs);


	useEffect(() => {

		const getLyrics = async () => {
			try {
				const url = process.env.REACT_APP_API_URL + `/songs/popular`
				const { data } = await axiosInstance.get(url)
				console.log(data);
				setSongs(data.popular)
			} catch (err) {
			}
		}

		getLyrics()
	}, [])
	

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.horizontal}>
					<div className={styles.div1}>
						<PieChart />
					</div>
					<div className={styles.div2}>
						<BarChart />
					</div>
				</div>
				<div className={styles.div3}>
					<h1 className={styles.heading}>
						Popular Songs
						<MusicNoteIcon />
					</h1>
					<SongTable songs={songs} />
				</div>
			</div>
		</Fragment>
	)
}

export default Stats
