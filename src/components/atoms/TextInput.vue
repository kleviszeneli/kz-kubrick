<script setup>
import { computed, ref } from "vue";
import VisuallyHidden from "../VisuallyHidden.vue";
import EditIcon from "../EditIcon.vue";
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: "text"
    },
    errors: {
        type: Array,
        required: true,
        default: function () {
            return []
        }
    },
    label: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: false
    },
    required: {
        type: Boolean,
        required: false
    },
    showLabel: {
        type: Boolean,
        required: false,
        default: true
    },
    hasEditMode: {
        type: Boolean,
        required: false,
        default: false
    },
    validate: {
        type: Function,
        required: true
    },
    saved: {
        type: Boolean,
        required: false,
        default: false
    } 
})

const editMode = ref(false);
const touched = ref(false);

const error = computed(() => {
    return props.errors?.length && touched.value
});

function toggleEditMode() {
    if(!error.value) editMode.value = !editMode.value;
}

function handleBlur(event) {
    touched.value = true;
    props.validate(event);
}

function handleInput(event) {
    touched.value = true;
    emit('update:modelValue', event.target.value)
}

</script>

<template>
	<div class="input">
		
		<label v-if="showLabel" class="label" :for="name">{{ label }}</label>
		<VisuallyHidden v-else as="label">{{ label }}</VisuallyHidden>
		
		<div class="input-wrapper">
            <template v-if="hasEditMode && !editMode && saved" >
                <div type="readonly" readonly>{{ modelValue }}</div>
            </template>
			
            <input v-else
            :id="name" 
            :class="{ touched, error }" 
            :name="name" 
            :type="type" 
            :placeholder="placeholder" 
            :value="modelValue" 
            @input="handleInput" 
            @keypress="validate"
            @blur="handleBlur"      
            />

            <button type="button" v-if="saved && hasEditMode" @click="toggleEditMode" :disabled="error" class="btn btn-icon btn-transparent append-btn"><EditIcon :displayEnabledVersion="!editMode" /></button>

		</div>
		
		<ul v-if="error" class="errors">
			<li v-for="message in errors" :key="message">{{ message }}</li>
		</ul>
			
	</div>
</template>