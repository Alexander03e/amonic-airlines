import { useAuthContext } from 'Common/components/provider/Auth/context';
import styles from './header.module.scss';
import { Button, ImageBlock } from 'Common/components/ui';
import LogoPng from 'Assets/images/logo_large.png';
import { HEADER_SCROLL, LABELS } from './consts';
import { Container } from 'Common/components/ui/Container';
import { useEffect, useRef, useState } from 'react';
import { useAnimation, motion } from 'framer-motion';
import throttle from 'lodash/throttle';
import cn from 'classnames';
import { AdminButtons } from './components/Admin';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const { isAuth, logout, role } = useAuthContext();
    const scrollPrev = useRef<number>(0);
    const controls = useAnimation();
    const [headerOpened, setHeaderOpened] = useState(true);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    const handleRedirect = () => {
        navigate('/');
    };

    /** Обработчик отображение хэдера при скролле */
    useEffect(() => {
        const handleScroll = throttle(() => {
            const scrolled = window.scrollY;

            if (scrolled > HEADER_SCROLL.BG_CHANGE) {
                document.querySelector('header')?.classList.add(styles.scrolled);
            } else {
                document.querySelector('header')?.classList.remove(styles.scrolled);
            }

            if (scrolled > HEADER_SCROLL.VISIBLE && scrolled > scrollPrev.current) {
                controls.start({ y: '-100%' });
                setHeaderOpened(false);
            } else if (scrolled < scrollPrev.current) {
                controls.start({ y: '0%' });
                setHeaderOpened(true);
            }

            scrollPrev.current = scrolled;
        }, 200);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [controls]);

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={controls}
            transition={{ ease: HEADER_SCROLL.EASE, duration: HEADER_SCROLL.DURATION }}
            className={cn(styles.header, { [styles.scroll]: headerOpened })}
        >
            <Container className={styles.container}>
                {isAuth && (
                    <>
                        <ImageBlock
                            onClick={handleRedirect}
                            src={LogoPng}
                            alt='logo'
                            size='small'
                        />
                        <div className={styles.links}>
                            {role === 'Administrator' && <AdminButtons />}
                        </div>

                        <Button onClick={handleLogout} label={LABELS.SIGN_OUT} />
                    </>
                )}
            </Container>
        </motion.header>
    );
};
