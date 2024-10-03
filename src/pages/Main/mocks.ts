import { IUser } from 'Common/types/user';

export const mockList: IUser[] = [
    {
        birthdate: '1999-02-13',
        email: 'test@mail.ru',
        firstName: 'Alex',
        id: 1,
        lastName: 'Alexov',
        office: {
            contact: '',
            country: {
                id: 1,
                name: 'Russia',
            },
            id: 1,
            phone: '',
            title: 'office 1',
        },
        role: {
            id: 1,
            title: 'Administrator',
        },
    },
    {
        birthdate: '2005-05-21',
        email: 'test@mail.ru',
        firstName: 'Alex2',
        id: 2,
        lastName: 'Alexov2',
        office: {
            contact: '',
            country: {
                id: 1,
                name: 'Russia',
            },
            id: 1,
            phone: '',
            title: 'office 1',
        },
        role: {
            id: 1,
            title: 'User',
        },
        active: true,
    },
    {
        birthdate: '1967-05-21',
        email: 'test@mail.ru',
        firstName: 'Alex3',
        id: 3,
        lastName: 'Alexov3',
        office: {
            contact: '',
            country: {
                id: 1,
                name: 'Russia',
            },
            id: 1,
            phone: '',
            title: 'office 1',
        },
        role: {
            id: 1,
            title: 'User',
        },
        active: false,
    },
];
