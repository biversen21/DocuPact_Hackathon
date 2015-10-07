import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from 'utils/validation';

const surveyValidation = createValidator({
  name: [required, maxLength(10)],
  email: [required, email],
  company: [required, maxLength(40)],
  date: [required, maxLength(8)],
});
export default memoize(10)(surveyValidation);
