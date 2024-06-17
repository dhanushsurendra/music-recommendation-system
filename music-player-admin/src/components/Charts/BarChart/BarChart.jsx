import { Fragment, useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import axiosInstance from '../../../redux/axiosInstance'

const BarChart = () => {
	const [dates, setDates] = useState([])
	const [userCount, setUserCount] = useState([])

	useEffect(() => {
		const getUserData = async () => {
			try {
				const url = process.env.REACT_APP_API_URL + '/users'
				const { data } = await axiosInstance.get(url)

				const dates = []
				const dayNames = []
				const userCounts = []

				for (let i = 0; i < data.data.length; i++) {
					const date = new Date(data.data[i].createdAt)
					const dateString = date.toDateString()
					const index = dates.indexOf(dateString)

					if (index !== -1) {
						userCounts[index]++
					} else {
						dates.push(dateString)
						userCounts.push(1)

						const dayName = dateString.toString().split(' ')[0]
						dayNames.push(dayName)
					}
				}

				setUserCount(userCounts)
				setDates(dayNames)
			} catch (error) {
				console.log(error)
			}
		}

		getUserData()
	}, [])

	return (
		<Fragment>
			<Chart
				type="bar"
				width={700}
				height={350}
				series={[
					{
						name: 'User Stats',
						data: userCount
					}
				]}
				options={{
					title: {
						text: 'User Stats',
						style: { fontSize: 20 }
					},

					colors: ['#0084DD'],
					theme: { mode: 'light' },

					xaxis: {
						tickPlacement: 'on',
						categories: dates,
						title: {
							text: 'Days',
							style: { color: '#1D2528', fontSize: 15 }
						}
					},

					yaxis: {
						labels: {
							formatter: (val) => {
								return `${val}`
							},
							style: { fontSize: '15', colors: ['#0084DD'] }
						},
						title: {
							text: 'No Of Users',
							style: { color: '#1D2528', fontSize: 15 }
						}
					},

					legend: {
						show: true,
						position: 'right'
					},

					dataLabels: {
						formatter: (val) => {
							return `${val}`
						},
						style: {
							colors: ['#f4f4f4'],
							fontSize: 15
						}
					}
				}}
			></Chart>
		</Fragment>
	)
}

export default BarChart
