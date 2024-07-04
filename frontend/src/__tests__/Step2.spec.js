import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Step2 from '@/components/Step2.vue';
import NaturalPerson from '@/components/NaturalPerson.vue';
import LegalPerson from '@/components/LegalPerson.vue';

describe('Step2.vue component', () => {
  it('should renders component', () => {
    const wrapper = shallowMount(Step2, {
      props: {
        formData: {
          step1: {
            client: 'PF',
          }
        }
      }
    });

    expect(wrapper.exists()).toBeTruthy();
  })

  it('should renders NaturalPerson component if client is "PF"', () => {
    const wrapper = shallowMount(Step2, {
      props: {
        formData: {
          step1: {
            client: 'PF',
          }
        }
      }
    });

    const naturalPerson = wrapper.findComponent(NaturalPerson);
    const legalPerson = wrapper.findComponent(LegalPerson);
    
    expect(naturalPerson.exists()).toBeTruthy();
    expect(legalPerson.exists()).toBeFalsy();
  })

  it('should renders LegalPerson component if client is "PJ"', () => {
    const wrapper = shallowMount(Step2, {
      props: {
        formData: {
          step1: {
            client: 'PJ',
          }
        }
      }
    });

    const naturalPerson = wrapper.findComponent(NaturalPerson);
    const legalPerson = wrapper.findComponent(LegalPerson);
    
    expect(naturalPerson.exists()).toBeFalsy();
    expect(legalPerson.exists()).toBeTruthy();
  })
});
