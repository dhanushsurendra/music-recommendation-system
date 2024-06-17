import { Fragment, useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import axiosInstance from '../../../redux/axiosInstance'

const PieChart = () => {
	const [songs, setSongs] = useState([])
	const [genre, setGenre] = useState([])
	const [count, setCount] = useState([])

	const getSongs = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/songs/'
			const { data } = await axiosInstance.get(url)
			setSongs(data.data)

			const genres = []
			const songCounts = []

			for (let i = 0; i < songs.length; i++) {
				const genre = songs[i].genre
				const index = genres.indexOf(genre)

				if (index !== -1) {
					songCounts[index]++
				} else {
					genres.push(genre)
					songCounts.push(1)
				}
			}

			setGenre(genres)
			setCount(songCounts)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getSongs()
	}, [songs])

	return (
		<Fragment>
			<Chart
				type="pie"
				width={700}
				height={350}
				series={count}
				options={{
					title: { text: 'Genre Stats', style: { fontSize: 20 } },
					noData: { text: 'Empty Data' },
					labels: genre,
					legend: {
						position: 'bottom'
					}
				}}
			></Chart>
		</Fragment>
	)
}

export default PieChart
