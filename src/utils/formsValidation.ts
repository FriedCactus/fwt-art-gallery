type TAuthFormReturn = {
  type: "login" | "password" | "";
  message: string;
};

type TRegisterFormReturen = {
  type: "login" | "password" | "confirm" | "";
  message: string;
};

export const authFormValidation = (
  login: string,
  password: string,
): TAuthFormReturn | void => {
  const error: TAuthFormReturn = {
    type: "",
    message: "Поле не заполнено",
  };

  // Проверка на наличие
  if (!login) {
    error.type = "login";
    return error;
  }
  if (!password) {
    error.type = "password";
    return error;
  }

  if (error.type) return error;
};

export const registerFormValidation = (
  login: string,
  password: string,
  confirm: string,
): TRegisterFormReturen | void => {
  const error: TRegisterFormReturen = {
    type: "",
    message: "Поле не заполнено",
  };

  // Проверка на наличие
  if (!login) {
    error.type = "login";
    return error;
  }
  if (!password) {
    error.type = "password";
    return error;
  }
  if (!confirm) {
    error.type = "confirm";
    return error;
  }

  // Основная валидация
  if (login.length > 50) {
    error.type = "login";
    error.message = "Имя не может быть длиннее 50 символов";
    return error;
  }
  if (password.length < 8) {
    error.type = "password";
    error.message = "Пароль должен быть не меньше 8 символов";
    return error;
  }
  if (password !== confirm) {
    error.type = "confirm";
    error.message = "Пароли не свопадают";
    return error;
  }
};
