import { Button } from 'Common/components/ui';
import { ReactElement } from 'react';
import map from 'lodash/map';
import { LINKS } from './consts';
import { useNavigate } from 'react-router-dom';

export const AdminButtons = (): ReactElement => {
    const navigate = useNavigate();

    const handleClick = (src: string) => {
        navigate(src);
    };

    const location = window.location.pathname;

    return (
        <>
            {map(LINKS, (item, i) => {
                return (
                    <Button
                        key={i}
                        isActive={location === item.src}
                        variant='empty'
                        label={item.label}
                        onClick={handleClick.bind(this, item.src)}
                    />
                );
            })}
        </>
    );
};
