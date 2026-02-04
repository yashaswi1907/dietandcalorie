import styles from './AnimatedBackground.module.css';

function AnimatedBackground() {
    return (
        <div className={styles['animated-background']}>
            {/* Floating particles */}
            {[...Array(10)].map((_, i) => (
                <div key={i} className={styles['particle']} />
            ))}

            {/* Wave effects */}
            <div className={styles['wave']} />
            <div className={styles['wave']} />
            <div className={styles['wave']} />
        </div>
    );
}

export default AnimatedBackground;
