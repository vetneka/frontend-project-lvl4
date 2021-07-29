export default {
  translation: {
    channels: {
      title: 'Каналы',
      buttons: {
        rename: 'Переименовать',
        delete: 'Удалить',
      },
    },

    chat: {
      messages_0: '{{ count }} сообщение',
      messages_1: '{{ count }} сообщения',
      messages_2: '{{ count }} сообщений',
      buttons: {
        send: 'Отправить',
      },
      placeholder: 'Введите сообщение...',
    },

    forms: {
      login: {
        label: 'Ваш ник',
        placeholder: 'Введите ник...',
      },
      username: {
        label: 'Имя пользователя',
        placeholder: 'Введите имя...',
        validation: {
          length: 'От 3 до 20 символов',
        },
      },
      password: {
        label: 'Пароль',
        placeholder: 'Введите пароль...',
        validation: {
          length: 'Не менее 6 символов',
        },
      },
      passwordConfirmation: {
        label: 'Подтвердите пароль',
        placeholder: 'Повторите пароль...',
        validation: {
          match: 'Пароли должны совпадать',
        },
      },
      channel: {
        label: 'Название',
        placeholder: 'Введите название...',
        validation: {
          blacklist: 'Канал уже существует',
        },
      },
      message: {
        label: 'Текст сообщения',
        placeholder: 'Введите сообщение...',
      },
      validation: {
        required: 'Обязательное поле',
      },
      errors: {
        duplicateUser: 'Такой пользователь уже существует',
        login: 'Неверные имя пользователя или пароль',
      },
    },

    header: {
      logo: 'Hexlet Chat',
      button: 'Выйти',
    },

    login: {
      header: 'Войти',
      button: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
    },

    signup: {
      header: 'Регистрация',
      button: 'Зарегистрироваться',
    },

    modals: {
      add: {
        header: 'Добавить канал',
      },
      rename: {
        header: 'Переименовать канал',
      },
      remove: {
        header: 'Удалить канал',
        confirm: 'Вы уверены?',
      },
    },

    404: {
      header: '404.',
      description: 'Упс... Похоже, вы промахнулись :)',
      button: 'Попасть куда надо',
    },

    common: {
      cancel: 'Отменить',
      send: 'Отправить',
      delete: 'Удалить',
      loading: 'Загрузка...',
      error: 'Что-то пошло не так :(',
    },

    errors: {
      network: 'Ошибка сети. Попробуйте еще раз',
    },
  },
};
