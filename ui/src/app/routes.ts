
export class API {
  public static SERVER_URL = 'http://localhost:8080';

  public static TEST = `${API.SERVER_URL}/users/test`;

  public static LOGIN = `${API.SERVER_URL}/login`;

  public static USERS = `${API.SERVER_URL}/users`;
  public static SIGN_UP = `${API.USERS}/sign-up`;
  public static CURRENT_USER = `${API.USERS}/current`;

  public static COLLECTIONS = `${API.SERVER_URL}/collections`;
  public static COLLECTION_EXISTS = (name: string) => `${API.COLLECTIONS}/exists?name=${name}`;
  public static EXPENSES = (id: number) => `${API.COLLECTIONS}/${id}/expenses`;
}
