import { IntegrationConfig, URL } from '../config';

describe('IntegrationConfig', () => {
  it('should have the correct app name and description', () => {
    expect(IntegrationConfig.data.descriptions.app_name).toBe(
      'Express Latency Monitor',
    );
    expect(IntegrationConfig.data.descriptions.app_description).toContain(
      'seamless latency monitoring',
    );
  });

  it('should have the correct URL configuration', () => {
    expect(IntegrationConfig.data.descriptions.app_url).toBe(`${URL}/`);
  });

  it('should be active and of type modifier', () => {
    expect(IntegrationConfig.data.is_active).toBe(true);
    expect(IntegrationConfig.data.integration_type).toBe('modifier');
  });
});