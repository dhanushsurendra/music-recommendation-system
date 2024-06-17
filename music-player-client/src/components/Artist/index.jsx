import styles from './styles.module.scss'

const Artist = ({ image, title }) => {
    return (
        <div>
            <div className={styles.imageContainer}>
                <img src= {image} />
            </div>
            <p className={title} style={{ margin: 0, color: "#303e65", fontSize: "12px", fontWeight: 500 }}>{title}</p>
        </div>
    )
}

export default Artist;