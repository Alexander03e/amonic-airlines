import { toast } from 'react-toastify';
import styles from './toast.module.scss';

export const warnToast = (content: string) => {
    toast(content, {
        className: styles.warn,
    });
};

export const successToast = (content: string) => {
    toast(content, {
        className: styles.success,
    });
};

export const errorToast = (content: string) => {
    toast(content, {
        className: styles.error,
    });
};

export const handleToastWithPromise = async (
    callback: () => Promise<unknown>,
    successMessage: string = 'Успешно',
    loadingMessage: string = 'Загрузка...',
    errorMessage: string = 'Произошла ошибка',
    onSuccess?: () => void,
) => {
    const loadingToastId = toast.loading(loadingMessage);

    try {
        await callback();
        toast.update(loadingToastId, {
            render: successMessage,
            isLoading: false,
            autoClose: 1200,
            className: styles.success,
        });
        if (onSuccess) {
            onSuccess();
        }
    } catch (e) {
        toast.update(loadingToastId, {
            render: errorMessage,
            isLoading: false,
            autoClose: 1200,
            className: styles.error,
        });
        console.log(e);
    }
};
