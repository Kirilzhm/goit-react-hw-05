import styles from "./NotFoundPage.module.css"
import { BallTriangle } from "react-loader-spinner";

const NotFoundPage = () => {
    return (
        <div className={styles.notFoundBox}>
            <p className={styles.notFoundText}>This is not a real website address, but let's wait :)</p>
            <div className={styles.notFoundLoader}>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            </div>
        </div>
    )
};

export default NotFoundPage;