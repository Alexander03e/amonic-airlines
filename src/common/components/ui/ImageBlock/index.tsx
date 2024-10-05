import { FC, ImgHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './imageblock.module.scss';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    alt: string;
    src: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
};

export const ImageBlock: FC<ImageProps> = ({
    alt,
    onClick,
    src,
    size = 'medium',
    className,
    ...props
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(styles.wrapper, styles[size], className, { [styles.clickable]: onClick })}
        >
            <img src={src} alt={alt} {...props} />
        </div>
    );
};
