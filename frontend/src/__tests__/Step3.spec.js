import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Step3 from '@/components/Step3.vue';

describe('Step3.vue component', () => {
  it('should renders component', () => {
    const wrapper = shallowMount(Step3, {
      props: {
        formData: {
          step3: {
            password: null
          }
        }
      }
    });

    const heading = wrapper.find('[data-test="heading"]');
    expect(heading.exists()).toBeTruthy();
    expect(heading.element.tagName).toBe('H1')
    expect(heading.text()).toBe('Senha de acesso');

    const form = wrapper.find('[data-test="form"]');
    expect(form.exists()).toBeTruthy();
    expect(form.element.tagName).toBe('FORM');

    const inputPassword = wrapper.find('[data-test="password"]');
    expect(inputPassword.exists()).toBeTruthy();
    expect(inputPassword.element.tagName).toBe('INPUT');
    expect(inputPassword.attributes('type')).toBe('password');

    const buttonPreviousStep = wrapper.find('[data-test="btn-previous"]');
    expect(buttonPreviousStep.exists()).toBeTruthy();
    expect(buttonPreviousStep.element.tagName).toBe('BUTTON');
    expect(buttonPreviousStep.attributes('type')).toBe('button');
    expect(buttonPreviousStep.text()).toBe('Voltar');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    expect(buttonNextStep.exists()).toBeTruthy();
    expect(buttonNextStep.element.tagName).toBe('BUTTON');
    expect(buttonNextStep.attributes('type')).toBe('submit');
    expect(buttonNextStep.text()).toBe('Continuar');
  }),

  it('should display error if input name is empty or invalid', async () => {
    const wrapper = shallowMount(Step3, {
      props: {
        formData: {
          step3: {
            password: null
          }
        }
      }
    });

    const inputPassword = wrapper.find('[data-test="password"]');
    inputPassword.setValue('');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click');

    let legendError = wrapper.find('[data-test="error-password"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputPassword.setValue('strong');
    await buttonNextStep.trigger('click');
    expect(legendError.text()).toBe('Campo inválido!');

    inputPassword.setValue('strongpassword');
    await buttonNextStep.trigger('click');
    expect(legendError.text()).toBe('Campo inválido!');

    inputPassword.setValue('strongpassword123');
    await buttonNextStep.trigger('click');
    expect(legendError.text()).toBe('Campo inválido!');

    inputPassword.setValue('StrongPassword123');
    await buttonNextStep.trigger('click');
    expect(legendError.text()).toBe('Campo inválido!');

    inputPassword.setValue('!StrongPassword123');
    await buttonNextStep.trigger('click');
    legendError = wrapper.find('[data-test="error-password"]');
    expect(legendError.exists()).toBeFalsy();
  }),

  it('should emit the previous step when the back button is pressed', async () => {
    const wrapper = shallowMount(Step3, {
      props: {
        formData: {
          step3: {
            password: null
          }
        }
      }
    });

    const buttonPreviousStep = wrapper.find('[data-test="btn-previous"]');
    await buttonPreviousStep.trigger('click')

    const backEvent = wrapper.emitted('previous-step');
    expect(backEvent).toHaveLength(1);
    expect(backEvent[0]).toEqual([]);
  }),

  it('should emit next step if all fields are valid', async () => {
    const wrapper = shallowMount(Step3, {
      props: {
        formData: {
          step3: {
            password: null
          }
        }
      }
    });

    const inputPassword = wrapper.find('[data-test="password"]');
    inputPassword.setValue('!StrongPassword123');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click')

    const submitFormEvent = wrapper.emitted('next-step');
    expect(submitFormEvent).toHaveLength(1);
    expect(submitFormEvent[0]).toEqual([{ password: '!StrongPassword123' }]);
  })
});
