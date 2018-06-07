import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

export default function createSagaElement(base) {
  const actionType = createActionTypes(base);
  const sagaAction = createSagaAction(actionType);
  const sagaTriggerType = `${base}_SAGA_TRIGGER`;
  const sagaTrigger = (req, requiredFields = []) => createActionCreator(sagaTriggerType, {req, requiredFields});
  return {
    actionType : actionType,
    sagaAction : sagaAction,
    sagaTriggerType : sagaTriggerType,
    sagaTrigger : sagaTrigger
  };
}
