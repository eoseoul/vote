
import _ from 'lodash';

export default function createHead(login) {
  const head = {};
  if (_.isEmpty(login)) {
    head['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    return head;
  }
  head.adminid = login.prod._id;
  head.accesstoken = login.token;
  head['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  head.Authorization = `Bearer ${head.accesstoken}`;
  return head;
}
