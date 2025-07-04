import * as yup from 'yup';

const AttendeeSchema = yup.object().shape({
  name: yup.string().required('Name is required'),

  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(10, 'Must be at least 10 years old'),

  email: yup.string().email('Invalid email').required('Email is required'),

  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),

  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Other'], 'Invalid gender')
    .required('Gender is required'),

  bio: yup
    .string()
    .max(250, 'Bio must be at most 250 characters')
    .notRequired(),

  address: yup.object().shape({
    street: yup.string().notRequired(),
    city: yup.string().notRequired(),
    state: yup.string().notRequired(),
    country: yup.string().notRequired(),
    zip: yup.string().notRequired(),
  }),

  profileImage: yup
    .mixed()
    .test('fileSize', 'File is too large', (value) => {
      if (!value || value.length === 0) return true; // image optional
      return value[0]?.size <= 2 * 1024 * 1024; // max 2MB
    }),
});

export default AttendeeSchema;
