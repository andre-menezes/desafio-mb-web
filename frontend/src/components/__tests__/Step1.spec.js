import { shallowMount, nextTick } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Step1 from '@/components/Step1.vue';

describe('Step1.vue component', () => {
  it('should renders component', () => {
    const wrapper = shallowMount(Step1);

    const heading = wrapper.find('h1');
    expect(heading.exists()).toBeTruthy();
    expect(heading.text()).toBe('Seja bem vindo(a)!');

    const form = wrapper.find('form');
    expect(form.exists()).toBeTruthy();

    const inputEmail = wrapper.find('input[type="email"]');
    expect(inputEmail.exists()).toBeTruthy();

    const inputRadio = wrapper.findAll('input[type="radio"]');
    expect(inputRadio.length).toBe(2);

    const button = wrapper.find('button');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe('Continuar');
  }),

  it('should display error messages if input is empty or invalid', async () => {
    const wrapper = shallowMount(Step1);
    
    const input = wrapper.get('input[type="email"]');
    input.setValue('');
    
    const button = wrapper.get('button[type="submit"]');
    await button.trigger('click');
    
    let legend = wrapper.find('legend');
    expect(legend.exists()).toBeTruthy();
    expect(legend.text()).toBe('Campo obrigatório!')
    
    input.setValue('invalid@email');
    await button.trigger('click');
    expect(legend.text()).toBe('E-mail inválido!');
    
    input.setValue('valid@email.com');
    await button.trigger('click');
    legend = wrapper.find('legend');
    expect(legend.exists()).toBeFalsy();
  })

  it('should emit next step if all fields are valid', async () => {
    const wrapper = shallowMount(Step1);

    const input = wrapper.get('input[type="email"]');
    input.setValue('valid@email.com');

    const button = wrapper.get('button[type="submit"]');
    await button.trigger('click');

    const submitFormEvent = wrapper.emitted('next-step');
    expect(submitFormEvent).toHaveLength(1);
    expect(submitFormEvent[0]).toEqual([{ email: 'valid@email.com', client: 'PF' }]);

    let pfRadioButton = wrapper.get('input#pf');
    let pjRadioButton = wrapper.get('input#pj');
    expect(pfRadioButton.element.checked).toBeTruthy();
    expect(pjRadioButton.element.checked).toBeFalsy();

    await pjRadioButton.setChecked();
    
    pfRadioButton = wrapper.get('input#pf');
    pjRadioButton = wrapper.get('input#pj');
    expect(pfRadioButton.element.checked).toBeFalsy();
    expect(pjRadioButton.element.checked).toBeTruthy();

    await button.trigger('click');

    expect(submitFormEvent[0]).toEqual([{ email: 'valid@email.com', client: 'PJ' }]);
  })
})