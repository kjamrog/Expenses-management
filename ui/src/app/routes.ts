
export class API {
  public static SERVER_URL = 'http://localhost:8080';

  public static TEST = `${API.SERVER_URL}/users/test`;

  public static LOGIN = `${API.SERVER_URL}/login`;

  public static USERS = `${API.SERVER_URL}/users`;
  public static SIGN_UP = `${API.USERS}/sign-up`;

  public static COLLECTIONS = `${API.SERVER_URL}/collections`;
}
