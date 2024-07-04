import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NaturalPerson from '@/components/NaturalPerson.vue';

describe('NaturalPerson.vue component', () => {
  it('should renders component', () => {
    const wrapper = shallowMount(NaturalPerson, {
      props: {
        formData: {
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          }
        }
      }
    });

    const heading = wrapper.find('[data-test="heading"]');
    expect(heading.exists()).toBeTruthy();
    expect(heading.element.tagName).toBe('H1')
    expect(heading.text()).not.toBe('Pessoa Jurídica')
    expect(heading.text()).toBe('Pessoa Física');

    const form = wrapper.find('[data-test="form"]');
    expect(form.exists()).toBeTruthy();
    expect(form.element.tagName).toBe('FORM');
    
    const inputName = wrapper.find('[data-test="name"]');
    expect(inputName.exists()).toBeTruthy();
    expect(inputName.element.tagName).toBe('INPUT');
    expect(inputName.attributes('type')).toBe('text');
    
    const inputCpf = wrapper.find('[data-test="cpf"]');
    expect(inputCpf.exists()).toBeTruthy();
    expect(inputCpf.element.tagName).toBe('INPUT');
    expect(inputCpf.attributes('type')).toBe('text');
    
    const inputBirthdate = wrapper.find('[data-test="birthdate"]');
    expect(inputBirthdate.exists()).toBeTruthy();
    expect(inputBirthdate.element.tagName).toBe('INPUT');
    expect(inputBirthdate.attributes('type')).toBe('date');
    
    const inputPhone = wrapper.find('[data-test="phone"]');
    expect(inputPhone.exists()).toBeTruthy();
    expect(inputPhone.element.tagName).toBe('INPUT');
    expect(inputPhone.attributes('type')).toBe('phone');

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
    const wrapper = shallowMount(NaturalPerson, {
      props: {
        formData: {
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          }
        }
      }
    });

    const inputName = wrapper.find('[data-test="name"]');
    inputName.setValue('');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click');

    const legendError = wrapper.find('[data-test="error-name"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputName.setValue('John');

    await buttonNextStep.trigger('click');

    expect(legendError.text()).toBe('Campo inválido!')
  }),

  it('should display error if input cpf is empty or invalid', async () => {
    const wrapper = shallowMount(NaturalPerson, {
      props: {
        formData: {
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          }
        }
      }
    });

    const inputCpf = wrapper.find('[data-test="cpf"]');
    inputCpf.setValue('');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click');

    const legendError = wrapper.find('[data-test="error-cpf"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputCpf.setValue('John');

    await buttonNextStep.trigger('click');

    expect(legendError.text()).toBe('Campo inválido!')
  }),

  it('should display error if input phone is empty or invalid', async () => {
    const wrapper = shallowMount(NaturalPerson, {
      props: {
        formData: {
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          }
        }
      }
    });

    const inputPhone = wrapper.find('[data-test="phone"]');
    inputPhone.setValue('');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click');

    let legendError = wrapper.find('[data-test="error-phone"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputPhone.setValue('10 1234-5678');
    await buttonNextStep.trigger('click');
    expect(legendError.text()).toBe('Campo inválido!')

    inputPhone.setValue('(10) 1234-5678');
    await buttonNextStep.trigger('click');
    legendError = wrapper.find('[data-test="error-phone"]');
    expect(legendError.exists()).toBeFalsy();

    inputPhone.setValue('(10) 12345-6789');
    await buttonNextStep.trigger('click');
    legendError = wrapper.find('[data-test="error-phone"]');
    expect(legendError.exists()).toBeFalsy();
  }),

  it('should emit the previous step when the back button is pressed', async () => {
    const wrapper = shallowMount(NaturalPerson, {
      props: {
        formData: {
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
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

  it('should emit the next step if all fields are valid', async () => {
    const wrapper = shallowMount(NaturalPerson, {
      props: {
        formData: {
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          }
        }
      }
    });

    const inputName = wrapper.find('[data-test="name"]');
    inputName.setValue('John Doe');

    const inputCpf = wrapper.find('[data-test="cpf"]');
    inputCpf.setValue('987.654.321-10');

    const inputBirthdate = wrapper.find('[data-test="birthdate"]');
    inputBirthdate.setValue('1970-12-31');

    const inputPhone = wrapper.find('[data-test="phone"]');
    inputPhone.setValue('(10) 98765-4321');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click')

    const submitFormEvent = wrapper.emitted('next-step');
    expect(submitFormEvent).toHaveLength(1);
    expect(submitFormEvent[0]).toEqual([
      {
        birthdate: "1970-12-31",
        cpf: "987.654.321-10",
        name: "John Doe",
        phone: "(10) 98765-4321",
      }
    ]);
  })
});
