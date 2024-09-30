import { useAuthContext } from 'Common/components/provider/Auth/context';
import styles from './header.module.scss';
import { Button, ImageBlock } from 'Common/components/ui';
import LogoPng from 'Assets/images/logo_large.png';
import { LABELS } from './consts';
import { Container } from 'Common/components/ui/Container';

export const Header = () => {
    const { isAuth, logout } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                {isAuth && (
                    <>
                        <ImageBlock src={LogoPng} alt='logo' size='small' />
                        <Button onClick={handleLogout} label={LABELS.SIGN_OUT} />
                    </>
                )}
            </Container>
        </header>
    );
};
