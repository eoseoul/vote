import _ from 'lodash';

export default function createFormData(params) {
  const data = new FormData();
  _.forEach(params, (v, k) => {
    if (!_.isNil(v)) {
      data.append(k, v);
    }
  });
  return data;
}
