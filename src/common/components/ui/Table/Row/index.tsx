import styles from './row.module.scss';
import map from 'lodash/map';
import cn from 'classnames';

type TProps = {
    data?: string[] | undefined;
    onClick?: () => void;
    isActive?: boolean;
    isHeader?: boolean;
};

export const TableRow = ({ data, onClick, isActive, isHeader }: TProps) => {
    if (!data) return null;

    const Component = isHeader ? 'th' : 'tr';

    return (
        <Component
            className={cn(styles.row, { [styles.active]: isActive, [styles.header]: isHeader })}
            onClick={onClick}
        >
            {map(data, (item, index) => {
                return <td key={index}>{item}</td>;
            })}
        </Component>
    );
};
