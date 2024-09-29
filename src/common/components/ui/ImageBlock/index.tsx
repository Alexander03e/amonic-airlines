import { FC, ImgHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './imageblock.module.scss';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    alt: string;
    src: string;
    size?: 'small' | 'medium' | 'large';
};

export const ImageBlock: FC<ImageProps> = ({ alt, src, size = 'medium', className, ...props }) => {
    return (
        <div className={cn(styles.wrapper, styles[size], className)}>
            <img src={src} alt={alt} {...props} />
        </div>
    );
};
