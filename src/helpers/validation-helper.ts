const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const validateEmail = (text: string) => {
  if (!text || text.length <= 0) {
    return 'E-mail não pode ficar em branco';
  }

  if (!EMAIL_REGEX.test(text)) {
    return 'Informe um endereço e-mail válido';
  }
};

export const validatePassword = (text: string) => {
  if (!text || text.length <= 0) {
    return 'Senha não pode ficar em branco';
  }
  if (text.length < 6) {
    return 'Senha deve ter mais de 6 caracteres';
  }
};

export const validatePetName = (text: string) => {
  if (!text || text.length <= 0) {
    return 'Nome não pode ficar em branco';
  }
};
