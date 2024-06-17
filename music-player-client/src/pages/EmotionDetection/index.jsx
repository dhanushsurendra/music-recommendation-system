import React, { useState, useEffect, useRef } from 'react'
import * as faceapi from 'face-api.js'
import styles from './styles.module.scss'
import { useHistory } from 'react-router-dom'

function EmotionDetection() {
	const videoRef = useRef(null)
	const canvasRef = useRef(null)
	const history = useHistory()

	const [isModelLoaded, setIsModelLoaded] = useState(false)

	useEffect(() => {
		const loadModels = async () => {
			const MODEL_URL = process.env.PUBLIC_URL + '/models'

			await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
			await faceapi.loadFaceLandmarkModel(MODEL_URL)
			await faceapi.loadFaceRecognitionModel(MODEL_URL)
			await faceapi.loadFaceExpressionModel(MODEL_URL)

			setIsModelLoaded(true)
		}
		loadModels()
	}, [])

	useEffect(() => {
		let video
		let stream
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			const constraints = { video: true }
			navigator.mediaDevices
				.getUserMedia(constraints)
				.then((mediaStream) => {
					video = videoRef.current
					video.srcObject = mediaStream
					stream = mediaStream
					video.onloadedmetadata = () => {
						video.play()
					}
				})
				.catch((error) => {
					console.error('Unable to access camera:', error)
				})
		}

		const canvas = canvasRef.current
		let faceDetectInterval

		const detectFaces = async () => {
			if (!isModelLoaded || !video || video.readyState !== 4) {
				return
			}

			const options = new faceapi.TinyFaceDetectorOptions({
				inputSize: 160
			})
			const result = await faceapi
				.detectSingleFace(video, options)
				.withFaceLandmarks()
				.withFaceExpressions()

			if (result) {
				const expressions = result.expressions
				const emotion = getEmotion(expressions)

				if (emotion === 'neutral') {
					setTimeout(() => detectFaces(), 500)
					return
				}

				clearInterval(faceDetectInterval)
				const context = canvas.getContext('2d')
				context.drawImage(video, 0, 0, canvas.width, canvas.height)

				setTimeout(() => {
					history.push({
						pathname: '/search',
						search: `?emotion=${emotion}`
					})
				}, 2000)
			}
		}

		if (isModelLoaded) {
			faceDetectInterval = setInterval(detectFaces, 100)
		}

		return () => {
			clearInterval(faceDetectInterval)
			if (stream) {
				stream.getTracks().forEach((track) => {
					track.stop()
				})
			}
		}
	}, [isModelLoaded, videoRef])

	const getEmotion = (expressions) => {
		let emotion = 'neutral'
		let maxConfidence = 0
		for (const [key, value] of Object.entries(expressions)) {
			if (value > maxConfidence) {
				emotion = key
				maxConfidence = value
			}
		}
		return emotion
	}

	return (
		<div className={styles.container}>
			<video ref={videoRef} width="1000" height="680" autoPlay muted />
			<canvas
				ref={canvasRef}
				width="1000"
				height="680"
				style={{ display: 'none' }}
			/>
		</div>
	)
}

export default EmotionDetection
