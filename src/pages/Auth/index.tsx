import { SignInForm } from 'Modules';
import styles from './auth.module.scss';
import { ImageBlock } from 'Common/components';
import LogoPng from 'Assets/images/logo_large.png';

export const AuthPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <ImageBlock src={LogoPng} alt='logo' />
                </div>
                <SignInForm />
            </div>
        </div>
    );
};
