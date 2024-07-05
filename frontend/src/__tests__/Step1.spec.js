import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Step1 from '@/components/Step1.vue';

describe('Step1.vue component', () => {
  it('should renders component', () => {
    const wrapper = shallowMount(Step1, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          }
        }
      }
    });

    const heading = wrapper.find('[data-testid="heading"]');
    expect(heading.exists()).toBeTruthy();
    expect(heading.element.tagName).toBe('H1')
    expect(heading.text()).toBe('Seja bem vindo(a)!');

    const form = wrapper.find('[data-testid="form"]');
    expect(form.exists()).toBeTruthy();
    expect(form.element.tagName).toBe('FORM');

    const inputEmail = wrapper.find('[data-testid="email"]');
    expect(inputEmail.exists()).toBeTruthy();
    expect(inputEmail.element.tagName).toBe('INPUT');
    expect(inputEmail.attributes('type')).toBe('email');

    const pfRadioButton = wrapper.find('input#pf');
    expect(pfRadioButton.exists()).toBeTruthy();
    expect(pfRadioButton.element.tagName).toBe('INPUT');
    expect(pfRadioButton.attributes('type')).toBe('radio');
    
    const pjRadioButton = wrapper.find('input#pj');
    expect(pjRadioButton.exists()).toBeTruthy();
    expect(pjRadioButton.element.tagName).toBe('INPUT');
    expect(pjRadioButton.attributes('type')).toBe('radio');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    expect(buttonNextStep.exists()).toBeTruthy();
    expect(buttonNextStep.element.tagName).toBe('CUSTOM-BUTTON');
    expect(buttonNextStep.attributes('type')).toBe('submit');
  })

  it('should display error if input email is empty or invalid', async () => {
    const wrapper = shallowMount(Step1, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          }
        }
      }
    });
    
    const inputEmail = wrapper.find('[data-testid="email"]');
    inputEmail.setValue('');
    
    let legend = wrapper.find('[data-testid="error-email"]');
    expect(legend.exists()).toBeFalsy();
    
    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit');
    
    legend = wrapper.find('[data-testid="error-email"]');
    expect(legend.element.tagName).toBe('LEGEND');
    expect(legend.text()).toBe('Campo obrigatório!')
    
    inputEmail.setValue('invalid@email');
    await buttonNextStep.trigger('submit');
    expect(legend.text()).toBe('Campo inválido!');
    
    inputEmail.setValue('valid@email.com');
    await buttonNextStep.trigger('submit');
    legend = wrapper.find('legend');
    expect(legend.exists()).toBeFalsy();
  })

  it('should emit next step if all fields are valid', async () => {
    const wrapper = shallowMount(Step1, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          }
        }
      }
    });

    const inputEmail = wrapper.find('[data-testid="email"]');
    inputEmail.setValue('valid@email.com');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit');

    const submitFormEvent = wrapper.emitted('next-step');
    expect(submitFormEvent).toHaveLength(1);
    expect(submitFormEvent[0]).toEqual([{ email: 'valid@email.com', client: 'PF' }]);

    let pfRadioButton = wrapper.find('input#pf');
    let pjRadioButton = wrapper.find('input#pj');
    expect(pfRadioButton.element.checked).toBeTruthy();
    expect(pjRadioButton.element.checked).toBeFalsy();

    await pjRadioButton.setChecked();
    
    pfRadioButton = wrapper.find('input#pf');
    pjRadioButton = wrapper.find('input#pj');
    expect(pfRadioButton.element.checked).toBeFalsy();
    expect(pjRadioButton.element.checked).toBeTruthy();

    await buttonNextStep.trigger('submit');

    expect(submitFormEvent[0]).toEqual([
      {
        email: 'valid@email.com',
        client: 'PJ'
      }
    ]);
  })
})