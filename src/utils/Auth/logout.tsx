import { modifUser } from '../axios_request';
import { removeToken } from './useToken';

export async function logout(id: number) {
  await modifUser(id, { userInfo: { lastConnectionDate: new Date() } });
  removeToken();
}
