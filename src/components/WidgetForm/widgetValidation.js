import {createValidator, required, maxLength, integer, oneOf} from 'utils/validation';

export const colors = ['One-Time', 'Recurring Monthly', 'Recurring Weekly', 'Closed'];

const widgetValidation = createValidator({
  color: [required, oneOf(colors)],
  sprocketCount: [required, integer],
  owner: [required, maxLength(30)]
});
export default widgetValidation;
