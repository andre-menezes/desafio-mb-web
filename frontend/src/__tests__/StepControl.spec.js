import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from "vitest";
import StepControl from '@/components/StepControl.vue';

describe('StepControl.vue component', () => {
  it('should renders component with step to equal 1', () => {
    const wrapper = shallowMount(StepControl, {
      props: {
        currentStep: 1
      }
    });

    const step = wrapper.find('[data-testid="step"]');
    expect(step.exists()).toBeTruthy();
    expect(step.text()).toBe('Passo 1 de 4');
    expect(step.text()).not.toBe('Passo 2 de 4');
    expect(step.text()).not.toBe('Passo 3 de 4');
    expect(step.text()).not.toBe('Passo 4 de 4');
  })

  it('should renders component with step to equal 2', () => {
    const wrapper = shallowMount(StepControl, {
      props: {
        currentStep: 2
      }
    });

    const step = wrapper.find('[data-testid="step"]');
    expect(step.exists()).toBeTruthy();
    expect(step.text()).not.toBe('Passo 1 de 4');
    expect(step.text()).toBe('Passo 2 de 4');
    expect(step.text()).not.toBe('Passo 3 de 4');
    expect(step.text()).not.toBe('Passo 4 de 4');
  })

  it('should renders component with step to equal 3', () => {
    const wrapper = shallowMount(StepControl, {
      props: {
        currentStep: 3
      }
    });

    const step = wrapper.find('[data-testid="step"]');
    expect(step.exists()).toBeTruthy();
    expect(step.text()).not.toBe('Passo 1 de 4');
    expect(step.text()).not.toBe('Passo 2 de 4');
    expect(step.text()).toBe('Passo 3 de 4');
    expect(step.text()).not.toBe('Passo 4 de 4');
  })

  it('should renders component with step to equal 4', () => {
    const wrapper = shallowMount(StepControl, {
      props: {
        currentStep: 4
      }
    });

    const step = wrapper.find('[data-testid="step"]');
    expect(step.exists()).toBeTruthy();
    expect(step.text()).not.toBe('Passo 1 de 4');
    expect(step.text()).not.toBe('Passo 2 de 4');
    expect(step.text()).not.toBe('Passo 3 de 4');
    expect(step.text()).toBe('Passo 4 de 4');
  })
});
