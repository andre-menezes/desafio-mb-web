import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Step4 from '@/components/Step4.vue';

describe('Step4.vue component', () => {
  it('should renders component when client is "PF"', () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          },
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const heading = wrapper.find('[data-testid="heading"]');
    expect(heading.exists()).toBeTruthy();
    expect(heading.element.tagName).toBe('H1')
    expect(heading.text()).toBe('Revise suas informações');

    const form = wrapper.find('[data-testid="form"]');
    expect(form.exists()).toBeTruthy();
    expect(form.element.tagName).toBe('FORM');

    const inputEmail = wrapper.find('[data-testid="email"]');
    expect(inputEmail.exists()).toBeTruthy();
    expect(inputEmail.element.tagName).toBe('INPUT');
    expect(inputEmail.attributes('type')).toBe('email');

    const inputName = wrapper.find('[data-testid="name"]');
    expect(inputName.exists()).toBeTruthy();
    expect(inputName.element.tagName).toBe('INPUT');
    expect(inputName.attributes('type')).toBe('text');
    
    const inputCpf = wrapper.find('[data-testid="cpf"]');
    expect(inputCpf.exists()).toBeTruthy();
    expect(inputCpf.element.tagName).toBe('INPUT');
    expect(inputCpf.attributes('type')).toBe('text');
    
    const inputBirthdate = wrapper.find('[data-testid="birthdate"]');
    expect(inputBirthdate.exists()).toBeTruthy();
    expect(inputBirthdate.element.tagName).toBe('INPUT');
    expect(inputBirthdate.attributes('type')).toBe('date');
    
    const inputPhone = wrapper.find('[data-testid="phone"]');
    expect(inputPhone.exists()).toBeTruthy();
    expect(inputPhone.element.tagName).toBe('INPUT');
    expect(inputPhone.attributes('type')).toBe('tel');

    const buttonPreviousStep = wrapper.find('[data-testid="btn-previous"]');
    expect(buttonPreviousStep.exists()).toBeTruthy();
    expect(buttonPreviousStep.element.tagName).toBe('CUSTOM-BUTTON');
    expect(buttonPreviousStep.attributes('type')).toBe('button');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    expect(buttonNextStep.exists()).toBeTruthy();
    expect(buttonNextStep.element.tagName).toBe('CUSTOM-BUTTON');
    expect(buttonNextStep.attributes('type')).toBe('submit');
  })

  it('should renders component when client is "PJ"', () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PJ'
          },
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const heading = wrapper.find('[data-testid="heading"]');
    expect(heading.exists()).toBeTruthy();
    expect(heading.element.tagName).toBe('H1')
    expect(heading.text()).toBe('Revise suas informações');

    const form = wrapper.find('[data-testid="form"]');
    expect(form.exists()).toBeTruthy();
    expect(form.element.tagName).toBe('FORM');

    const inputEmail = wrapper.find('[data-testid="email"]');
    expect(inputEmail.exists()).toBeTruthy();
    expect(inputEmail.element.tagName).toBe('INPUT');
    expect(inputEmail.attributes('type')).toBe('email');

    const inputCompanyName = wrapper.find('[data-testid="company-name"]');
    expect(inputCompanyName.exists()).toBeTruthy();
    expect(inputCompanyName.element.tagName).toBe('INPUT');
    expect(inputCompanyName.attributes('type')).toBe('text');
    
    const inputCnpj = wrapper.find('[data-testid="cnpj"]');
    expect(inputCnpj.exists()).toBeTruthy();
    expect(inputCnpj.element.tagName).toBe('INPUT');
    expect(inputCnpj.attributes('type')).toBe('text');
    
    const inputOpeningDate = wrapper.find('[data-testid="opening-date"]');
    expect(inputOpeningDate.exists()).toBeTruthy();
    expect(inputOpeningDate.element.tagName).toBe('INPUT');
    expect(inputOpeningDate.attributes('type')).toBe('date');

    const inputPhone = wrapper.find('[data-testid="phone"]');
    expect(inputPhone.exists()).toBeTruthy();
    expect(inputPhone.element.tagName).toBe('INPUT');
    expect(inputPhone.attributes('type')).toBe('tel');

    const buttonPreviousStep = wrapper.find('[data-testid="btn-previous"]');
    expect(buttonPreviousStep.exists()).toBeTruthy();
    expect(buttonPreviousStep.element.tagName).toBe('CUSTOM-BUTTON');
    expect(buttonPreviousStep.attributes('type')).toBe('button');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    expect(buttonNextStep.exists()).toBeTruthy();
    expect(buttonNextStep.element.tagName).toBe('CUSTOM-BUTTON');
    expect(buttonNextStep.attributes('type')).toBe('submit');
  })

  it('should display error if input email is empty or invalid', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          },
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const inputEmail = wrapper.find('[data-testid="email"]');
    inputEmail.setValue('');
    
    let legend = wrapper.find('[data-testid="error-name"]');
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
    legend = wrapper.find('[data-testid="error-email"]');
    expect(legend.exists()).toBeFalsy();
  })

  it('should display error if input name is empty or invalid', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          },
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const inputName = wrapper.find('[data-testid="name"]');
    inputName.setValue('');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit');

    const legendError = wrapper.find('[data-testid="error-name"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputName.setValue('John');

    await buttonNextStep.trigger('submit');

    expect(legendError.text()).toBe('Campo inválido!')
  })

  it('should display error if input cpf is empty or invalid', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          },
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const inputCpf = wrapper.find('[data-testid="cpf"]');
    inputCpf.setValue('');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit');

    const legendError = wrapper.find('[data-testid="error-cpf"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputCpf.setValue('98765432100');

    await buttonNextStep.trigger('submit');

    expect(legendError.text()).toBe('Campo inválido!');
  })

  it('should display error if input company name is empty or invalid', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PJ'
          },
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const inputCompanyName = wrapper.find('[data-testid="company-name"]');
    inputCompanyName.setValue('');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit');

    const legendError = wrapper.find('[data-testid="error-company-name"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputCompanyName.setValue('John');

    await buttonNextStep.trigger('submit');

    expect(legendError.text()).toBe('Campo inválido!')
  })

  it('should display error if input cnpj is empty or invalid', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PJ'
          },
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const inputCnpj = wrapper.find('[data-testid="cnpj"]');
    inputCnpj.setValue('');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit');

    const legendError = wrapper.find('[data-testid="error-cnpj"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputCnpj.setValue('12345678000190');

    await buttonNextStep.trigger('submit');

    expect(legendError.text()).toBe('Campo inválido!');
  })

  it('should display error if input phone is empty or invalid', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          },
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const inputPhone = wrapper.find('[data-testid="phone"]');
    inputPhone.setValue('');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit');

    let legendError = wrapper.find('[data-testid="error-phone"]');
    expect(legendError.exists()).toBeTruthy();
    expect(legendError.element.tagName).toBe('LEGEND');
    expect(legendError.text()).toBe('Campo obrigatório!');

    inputPhone.setValue('10 1234-5678');
    await buttonNextStep.trigger('submit');
    expect(legendError.text()).toBe('Campo inválido!')

    inputPhone.setValue('(10) 1234-5678');
    await buttonNextStep.trigger('submit');
    legendError = wrapper.find('[data-testid="error-phone"]');
    expect(legendError.exists()).toBeFalsy();

    inputPhone.setValue('(10) 12345-6789');
    await buttonNextStep.trigger('submit');
    legendError = wrapper.find('[data-testid="error-phone"]');
    expect(legendError.exists()).toBeFalsy();
  })

  it('should emit the previous step when the back button is pressed', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          },
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          },
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

  it('should emit the next step if all fields are valid and client is "PF"', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PF'
          },
          step2: {
            name: null,
            cpf: null,
            birthdate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const inputEmail = wrapper.find('[data-testid="email"]');
    inputEmail.setValue('valid@email.com');

    const inputName = wrapper.find('[data-testid="name"]');
    inputName.setValue('John Doe');

    const inputCpf = wrapper.find('[data-testid="cpf"]');
    inputCpf.setValue('987.654.321-10');

    const inputBirthdate = wrapper.find('[data-testid="birthdate"]');
    inputBirthdate.setValue('1970-12-31');

    const inputPhone = wrapper.find('[data-testid="phone"]');
    inputPhone.setValue('(10) 98765-4321');

    const inputPassword = wrapper.find('[data-testid="password"]');
    inputPassword.setValue('!StrongPassword123');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit')

    const submitFormEvent = wrapper.emitted('next-step');
    expect(submitFormEvent).toHaveLength(1);
    expect(submitFormEvent[0]).toEqual([
      {
        email: 'valid@email.com',
        client: 'PF',
        birthdate: "1970-12-31",
        cpf: "987.654.321-10",
        name: "John Doe",
        phone: "(10) 98765-4321",
        password: '!StrongPassword123'
      }
    ]);
  })

  it('should emit the next step if all fields are valid and client is "PJ"', async () => {
    const wrapper = shallowMount(Step4, {
      props: {
        formData: {
          step1: {
            email: null,
            client: 'PJ'
          },
          step2: {
            companyName: null,
            cnpj: null,
            openingDate: null,
            phone: null,
          },
          step3: {
            password: null
          }
        }
      }
    });

    const inputEmail = wrapper.find('[data-testid="email"]');
    inputEmail.setValue('valid@email.com');

    const inputCompanyName = wrapper.find('[data-testid="company-name"]');
    inputCompanyName.setValue('JD Company');

    const inputCnpj = wrapper.find('[data-testid="cnpj"]');
    inputCnpj.setValue('12.345.678/0001-90');

    const inputOpeningDate = wrapper.find('[data-testid="opening-date"]');
    inputOpeningDate.setValue('2020-01-31');

    const inputPhone = wrapper.find('[data-testid="phone"]');
    inputPhone.setValue('(10) 98765-4321');

    const inputPassword = wrapper.find('[data-testid="password"]');
    inputPassword.setValue('!StrongPassword123');

    const buttonNextStep = wrapper.find('[data-testid="btn-next"]');
    await buttonNextStep.trigger('submit')

    const submitFormEvent = wrapper.emitted('next-step');
    expect(submitFormEvent).toHaveLength(1);
    expect(submitFormEvent[0]).toEqual([
      {
        email: 'valid@email.com',
        client: 'PJ',
        companyName: "JD Company",
        cnpj: "12.345.678/0001-90",
        openingDate: "2020-01-31",
        phone: "(10) 98765-4321",
        password: '!StrongPassword123'
      }
    ]);
  })
});
