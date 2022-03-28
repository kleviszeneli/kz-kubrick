import * as yup from 'yup';
import { reactive } from 'vue';

export const registerFormSchema = yup.object().shape({
    // title: yup.string().meta({ label: 'Title*', placeholder: 'Title' }).required(),
    title: yup.string()
        .meta({ label: 'Title*', placeholder: 'Title', saved: false, hasEditMode: false })
        .oneOf(['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'])
        .label('Title')
        .required(),
    fullName: yup.string()
        .meta({ label: 'Full Name*', placeholder: 'Your full name', hasEditMode:true, editMode:true, saved: false })
        .min(3)
        .label('Full name')
        .required(),
    favMovie: yup.string()
        .meta({ label: 'Favorite Movie*', placeholder: 'Your favorite movie', hasEditMode:true, editMode:true, saved: false })
        .label('Favorite Movie')
        .required(),
    favBook: yup.string()
        .meta({ label: 'Favorite Book*', placeholder: 'Your favorite book', hasEditMode:true, editMode:true, saved: false })
        .label('Favorite Book')
        .required(),
});

export function getFieldNames(schema) {
	return Object.keys(schema).reduce((acc, current) => ({ ...acc, [current]: '' }), {});
}

export function getFieldType(field) {
	if (field.meta?.fieldType) return field.meta.fieldType;

	switch(field.type) {
		case 'string':
			if (field.tests.find(test => test.name === 'email')) return 'email';
			if (field.tests.find(test => test.name.includes('password'))) return 'password';
			return 'text';
		default:
			return field.type;
	}
}

export function isRequired(field) {
	return field.tests.findIndex(test => test.name === 'required') > -1;
}
 
export function getSchemaFieldData(schema) {
	return Object.entries(schema.describe().fields).reduce((acc, [key, value]) => {

		return {
			...acc,

			values: reactive({
				...acc.values,
				[key]: ''
			}),
			errors: reactive({
				...acc.errors,
				[key]: []
			}),
			meta: reactive({
				...acc.meta,
				[key]: {
					type: getFieldType(value),
					name: key.charAt(0).toUpperCase() + key.slice(1),
					label: value.meta?.label ?? key,
					placeholder: value.meta?.placeholder ?? '',
					required: isRequired(value),
					...value.meta
				}
			})

		}
	}, { values: reactive({}), errors: reactive({}), meta: reactive({}) });
}