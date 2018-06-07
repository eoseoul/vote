export default function createActionCreator(type, payload = {}) {
  return {type, ...payload};
}

export function createSagaAction(actionType) {
  return {
    request : (req) => createActionCreator(actionType.REQUEST, {req}),
    success : (req, data) => createActionCreator(actionType.SUCCESS, {req, data}),
    failure : (req, error) => createActionCreator(actionType.FAILURE, {req, error})
  };
}
