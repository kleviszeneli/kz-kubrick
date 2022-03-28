import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { it } from 'vitest';
import RegisterForm from '../src/components/RegisterForm.vue';

describe('RegisterForm.vue', () => {

    it('submit button should have the disabled class with wrong inputs.', async() => {
        
        const wrapper = mount(RegisterForm)
        
        const title = 'Not A valid title'
        const fullName = 'John Doe'
        const favMovie = 'Guardians of the Galaxy'
        const favBook = 'Fallen Angels'

        await wrapper.find('input#Title').setValue(title)
        await wrapper.find('input#FullName').setValue(fullName)
        await wrapper.find('input#FavMovie').setValue(favMovie)
        await wrapper.find('input#FavBook').setValue(favBook)

        await nextTick();

        const titleField = wrapper.find('input#Title')
        const fullNameField = wrapper.find('input#FullName')
        const favMovieField = wrapper.find('input#FavMovie')
        const favBookField = wrapper.find('input#FavBook')
        const submitButton = wrapper.find('button[type=submit]');

        expect(submitButton.classes()).toContain('disabled-btn');     
    })
  })