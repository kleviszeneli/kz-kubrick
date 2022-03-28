<script setup>
    import { ref, reactive, computed } from 'vue';
    import { registerFormSchema, getSchemaFieldData } from '../utils/schema'

    // Components
    import Button from './atoms/Button.vue';
    import Logo from './KubrickLogo.vue';
    import TextInput from './atoms/TextInput.vue'

    const debugMode = ref(false);

    const formIsValid = ref(false);
    const registerForm = ref(null);
    const registerFormFields = getSchemaFieldData(registerFormSchema);

    const handleSubmit = (values) => {
        console.log(values)
        for ( const metaProperty of Object.keys(registerFormFields.meta)) {
            registerFormFields.meta[metaProperty].saved = true;
        }
    };

    const checkFormIsValid = computed(()=>{
        formValidity(registerFormSchema,registerFormFields);
        return formIsValid.value;
    })

    function formValidity(schema,data) {
        schema.isValid(data.values)
        .then(function (valid) {
            formIsValid.value = valid
            return valid;
        });
    }

    function validate(schema, field, data) {
        return function() {
            schema
            .validateAt(field, data.values, { abortEarly: true })
            .then(() => {
                data.errors[field] = [];
            })
            .catch(validationError => {
                data.errors[field] = validationError.errors;
            });
        }
    }

</script>

<template>

    <div class="form-wrapper fluid">

        <div class="container">

            <div class="logo-wrapper text-center">
                <Logo />
            </div>

            <form class="register-form" @submit.prevent="handleSubmit" ref="registerForm">

                <template v-for="(value, key) in registerFormFields.values" :key="`RegisterForm_${key}`">

                    <TextInput 
                    :hasEditMode="registerFormFields.meta[key]?.hasEditMode || false"
                    :type="registerFormFields.meta[key].type" 
                    :errors="registerFormFields.errors[key]" 
                    :field="key"
                    v-model="registerFormFields.values[key]" 
                    :name="registerFormFields.meta[key].name"
                    :label="registerFormFields.meta[key].label" 
                    :placeholder="registerFormFields.meta[key].placeholder" 
                    :validate="validate(registerFormSchema, key, registerFormFields)" 
                    :required="registerFormFields.meta[key].required || undefined"  
                    :saved="registerFormFields.meta[key]?.saved || false "
                    />

                </template>

                <Button type="submit" class="submit-button btn btn-dark" :class="{'disabled-btn':!checkFormIsValid}" :disabled="!checkFormIsValid">Update</Button>

            </form>

            <div class="debug" v-if="debugMode">
                <h2>Debug mode values:</h2>
                <pre><code>{{ registerFormFields.values }}</code></pre>
            </div>


        </div>

    </div>

</template>

<style lang="scss" scoped>

.form-wrapper {
    padding-top: 3.75rem;
    padding-bottom: 3.75rem;
    color: inherit;
    
    .debug {
        margin: 2rem 0;
        padding: 1rem;
        background-color: var(--dark-2);
        border-radius: .3125rem;
    }

    .container {
        margin: 0rem auto 0;
        max-width: min(36.25rem,calc(100%)); 
    }
    .logo-wrapper {      
        margin-bottom: 2.5rem;
        svg {
            max-width: 12.5rem;
        }
    }

    form {
        width: 100%;
        padding: 2rem;
        border-radius: .3125rem;
        will-change: transform;
        background-color: var(--light);
        color: var(--dark);
        box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);
    }
}


</style>