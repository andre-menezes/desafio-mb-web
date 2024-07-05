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

    const heading = wrapper.find('[data-testid="heading"]');
    expect(heading.exists()).toBeTruthy();
    expect(heading.element.tagName).toBe('H1')
    expect(heading.text()).toBe('Senha de acesso');

    const form = wrapper.find('[data-testid="form"]');
    expect(form.exists()).toBeTruthy();
    expect(form.element.tagName).toBe('FORM');

    const inputPassword = wrapper.find('[data-testid="password"]');
    expect(inputPassword.exists()).toBeTruthy();
    expect(inputPassword.element.tagName).toBe('INPUT');
    expect(inputPassword.attributes('type')).toBe('password');

    const buttonPreviousStep = wrapper.find('[data-testid="btn-previous"]');
    expect(buttonPreviousStep.exists()).toBeTruthy();
    expect(buttonPreviousStep.element.tagName).toBe('CUSTOM-BUTTON');
    expect(buttonPreviousStep.attributes('type')).toBe('button');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    expect(buttonNextStep.exists()).toBeTruthy();
    expect(buttonNextStep.element.tagName).toBe('CUSTOM-BUTTON');
    expect(buttonNextStep.attributes('type')).toBe('submit');
  })

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

    const inputPassword = wrapper.find('[data-testid="password"]');
    inputPassword.setValue('');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit');

    let legendError = wrapper.find('[data-testid="error-password"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputPassword.setValue('strong');
    await buttonNextStep.trigger('submit');
    expect(legendError.text()).toBe('Campo inválido!');

    inputPassword.setValue('strongpassword');
    await buttonNextStep.trigger('submit');
    expect(legendError.text()).toBe('Campo inválido!');

    inputPassword.setValue('strongpassword123');
    await buttonNextStep.trigger('submit');
    expect(legendError.text()).toBe('Campo inválido!');

    inputPassword.setValue('StrongPassword123');
    await buttonNextStep.trigger('submit');
    expect(legendError.text()).toBe('Campo inválido!');

    inputPassword.setValue('!StrongPassword123');
    await buttonNextStep.trigger('submit');
    legendError = wrapper.find('[data-testid="error-password"]');
    expect(legendError.exists()).toBeFalsy();
  })

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

    const buttonPreviousStep = wrapper.find('[data-testid="btn-previous"]');
    await buttonPreviousStep.trigger('handle-click')

    const backEvent = wrapper.emitted('previous-step');
    expect(backEvent).toHaveLength(1);
    expect(backEvent[0]).toEqual([]);
  })

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

    const inputPassword = wrapper.find('[data-testid="password"]');
    inputPassword.setValue('!StrongPassword123');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit')

    const submitFormEvent = wrapper.emitted('next-step');
    expect(submitFormEvent).toHaveLength(1);
    expect(submitFormEvent[0]).toEqual([{ password: '!StrongPassword123' }]);
  })
});
