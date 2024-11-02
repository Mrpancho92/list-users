export const messages = {
    getUsersSuccess: { 
        message: 'Получение списка пользователей', description: 'Данные пользователей успешно получены'
    },
    getUsersError: { 
        message: 'Получение списка пользователей', description: 'Ошибка получения данных пользователей'
    },
    deleteUserSuccess: {
        message: 'Удаление пользователя', description: (first_name: string, last_name: string) => `Пользовтатель ${first_name} ${last_name} удален` 
    },
    deleteUserError: {
        message: 'Удаление пользователя', description: (first_name: string, last_name: string) =>  `Ошибка удаления пользователя ${first_name} ${last_name}`
    }
}