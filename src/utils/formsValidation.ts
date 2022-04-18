type TAuthFormReturn = {
  type: "login" | "password" | "";
  message: string;
};

type TRegisterFormReturn = {
  type: "login" | "password" | "confirm" | "";
  message: string;
};

type TPaintingFormReturn = {
  type: "name" | "year" | "";
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
): TRegisterFormReturn | void => {
  const error: TRegisterFormReturn = {
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
    error.message = "Пароли не совпадают";
    return error;
  }
};

export const paintingFormValidation = (
  name: string,
  year: string,
): TPaintingFormReturn | void => {
  const error: TPaintingFormReturn = {
    type: "",
    message: "Поле не заполнено",
  };

  if (!name) {
    error.type = "name";
    return error;
  }

  if (!year) {
    error.type = "year";
    return error;
  }

  if (name.length < 3) {
    error.type = "name";
    error.message = "Имя не может быть короче 3 символов";
    return error;
  }

  if (year.length < 4) {
    error.type = "year";
    error.message = "Год не может быть короче 4 символов";
    return error;
  }
};
