import { shallowMount } from '@vue/test-utils';
import { describe, expect, it, vi } from "vitest";
import App from '@/App.vue';
import StepControl from '@/components/StepControl.vue';

describe('App.vue component', () => {
  it('should renders component with Step1', () => {
    const wrapper = shallowMount(App);

    const stepControl = wrapper.findComponent(StepControl);
    expect(stepControl.exists()).toBeTruthy();

    const step1 = wrapper.find('[data-test="step-1"]');
    expect(step1.exists()).toBeTruthy();
  })

  it('should renders component with Step2 after emitted next step', async () => {
    const wrapper = shallowMount(App);
    
    wrapper.vm.currentStep = 1;
    expect(wrapper.vm.currentStep).toBe(1);

    await wrapper.vm.nextStep();
    expect(wrapper.vm.currentStep).toBe(2);

    const step2 = wrapper.find('[data-test="step-2"]');
    expect(step2.exists()).toBeTruthy();
  })

  it('should renders component with Step3 after emitted next step', async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.currentStep = 2;

    await wrapper.vm.nextStep();

    const step3 = wrapper.find('[data-test="step-3"]');
    expect(step3.exists()).toBeTruthy();
  })

  it('should renders component with Step4 after emitted next step', async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.currentStep = 3;

    await wrapper.vm.nextStep();

    const step4 = wrapper.find('[data-test="step-4"]');
    expect(step4.exists()).toBeTruthy();
  })

  it('should renders component with Step3 after emitted previous step', async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.currentStep = 4;

    await wrapper.vm.previousStep();

    const step3 = wrapper.find('[data-test="step-3"]');
    expect(step3.exists()).toBeTruthy();
  })

  it('should renders component with Step2 after emitted previous step', async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.currentStep = 3;

    await wrapper.vm.previousStep();

    const step2 = wrapper.find('[data-test="step-2"]');
    expect(step2.exists()).toBeTruthy();
  })

  it('should renders component with Step1 after emitted previous step', async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.currentStep = 2;

    await wrapper.vm.previousStep();

    const step1 = wrapper.find('[data-test="step-1"]');
    expect(step1.exists()).toBeTruthy();
  })

  it('should show alert message success after register successfuly when Step4 is complete', async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.currentStep = 4;
    
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {})

    await wrapper.vm.nextStep({
      client: 'PF',
      email: 'john.doe@email.com',
      password: '!StrongPass123',
      name: 'John Doe',
      cpf: '123.456.789-10',
      birthdate: '1970-01-01',
      phone: '(12) 3456-7890',
    });
    expect(alert).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
  })

  it('should show alert message fail after register invalid when Step4 is complete', async () => {
    const wrapper = shallowMount(App);
    wrapper.vm.currentStep = 4;
    
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {})

    await wrapper.vm.nextStep({});
    expect(alert).toHaveBeenCalledWith('Não foi possível realizar o cadastro!');
  })
});