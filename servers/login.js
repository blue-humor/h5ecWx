import request from "../utils/request";

export async function reqLogin(data, options) {
  return request(`/data/getOpenid`, {
    method: 'POST',
    data,
  });
}