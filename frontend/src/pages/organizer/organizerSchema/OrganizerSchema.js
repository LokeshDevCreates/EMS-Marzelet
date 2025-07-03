import * as yup from 'yup';

const OrganizerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),

  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(18, 'Must be at least 18'),

  email: yup.string().email('Invalid email').required('Email is required'),

  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),

  organizationType: yup.string().required('Organization type is required'),

  organizationName: yup.string().when('organizationType', {
    is: (val) => val && ['company', 'college', 'ngo'].includes(val),
    then: () => yup.string().required('Organization Name is required'),
    otherwise: () => yup.string().notRequired(),
  }),

  profession: yup.string().when('organizationType', {
    is: (val) => val && ['individual', 'company', 'college', 'ngo'].includes(val),
    then: () => yup.string().required('Profession is required'),
    otherwise: () => yup.string().notRequired(),
  }),

  description: yup.string().when('organizationType', {
    is: (val) => val === 'others',
    then: () => yup.string().required('Description is required'),
    otherwise: () => yup.string().notRequired(),
  }),

  profileImage: yup
    .mixed()
    .test('fileSize', 'File is too large', (value) => {
      if (!value || value.length === 0) return true;
      return value[0]?.size <= 2 * 1024 * 1024;
    }),
});

export default OrganizerSchema;
