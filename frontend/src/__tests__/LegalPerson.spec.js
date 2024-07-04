import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import LegalPerson from '@/components/LegalPerson.vue';

describe('LegalPerson.vue component', () => {
  it('should renders component', () => {
    const wrapper = shallowMount(LegalPerson, {
      props: {
        formData: {
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
            phone: null,
          }
        }
      }
    });

    const heading = wrapper.find('[data-test="heading"]');
    expect(heading.exists()).toBeTruthy();
    expect(heading.element.tagName).toBe('H1')
    expect(heading.text()).not.toBe('Pessoa Física')
    expect(heading.text()).toBe('Pessoa Jurídica');

    const form = wrapper.find('[data-test="form"]');
    expect(form.exists()).toBeTruthy();
    expect(form.element.tagName).toBe('FORM');
    
    const inputCompanyName = wrapper.find('[data-test="company-name"]');
    expect(inputCompanyName.exists()).toBeTruthy();
    expect(inputCompanyName.element.tagName).toBe('INPUT');
    expect(inputCompanyName.attributes('type')).toBe('text');
    
    const inputCnpj = wrapper.find('[data-test="cnpj"]');
    expect(inputCnpj.exists()).toBeTruthy();
    expect(inputCnpj.element.tagName).toBe('INPUT');
    expect(inputCnpj.attributes('type')).toBe('text');
    
    const inputOpeningDate = wrapper.find('[data-test="opening-date"]');
    expect(inputOpeningDate.exists()).toBeTruthy();
    expect(inputOpeningDate.element.tagName).toBe('INPUT');
    expect(inputOpeningDate.attributes('type')).toBe('date');
    
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

  it('should display error if input company name is empty or invalid', async () => {
    const wrapper = shallowMount(LegalPerson, {
      props: {
        formData: {
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
            phone: null,
          }
        }
      }
    });

    const inputCompanyName = wrapper.find('[data-test="company-name"]');
    inputCompanyName.setValue('');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click');

    const legendError = wrapper.find('[data-test="error-company-name"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputCompanyName.setValue('John');

    await buttonNextStep.trigger('click');

    expect(legendError.text()).toBe('Campo inválido!')
  }),

  it('should display error if input cnpj is empty or invalid', async () => {
    const wrapper = shallowMount(LegalPerson, {
      props: {
        formData: {
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
            phone: null,
          }
        }
      }
    });

    const inputCnpj = wrapper.find('[data-test="cnpj"]');
    inputCnpj.setValue('');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click');

    const legendError = wrapper.find('[data-test="error-cnpj"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputCnpj.setValue('12345678000190');

    await buttonNextStep.trigger('click');

    expect(legendError.text()).toBe('Campo inválido!');
  }),

  it('should display error if input phone is empty or invalid', async () => {
    const wrapper = shallowMount(LegalPerson, {
      props: {
        formData: {
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
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
    const wrapper = shallowMount(LegalPerson, {
      props: {
        formData: {
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
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
    const wrapper = shallowMount(LegalPerson, {
      props: {
        formData: {
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
            phone: null,
          }
        }
      }
    });

    const inputCompanyName = wrapper.find('[data-test="company-name"]');
    inputCompanyName.setValue('JD Company');

    const inputCnpj = wrapper.find('[data-test="cnpj"]');
    inputCnpj.setValue('12.345.678/0001-90');

    const inputOpeningDate = wrapper.find('[data-test="opening-date"]');
    inputOpeningDate.setValue('2020-01-31');

    const inputPhone = wrapper.find('[data-test="phone"]');
    inputPhone.setValue('(98) 7654-3210');

    const buttonNextStep = wrapper.find('[data-test="btn-next"]');
    await buttonNextStep.trigger('click')

    const submitFormEvent = wrapper.emitted('next-step');
    expect(submitFormEvent).toHaveLength(1);
    expect(submitFormEvent[0]).toEqual([
      {
        companyName: "JD Company",
        cnpj: "12.345.678/0001-90",
        openingDate: "2020-01-31",
        phone: "(98) 7654-3210",
      }
    ]);
  })
});
