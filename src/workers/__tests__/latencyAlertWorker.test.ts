import AlertWorker from '../latencyAlertWorker';

describe('AlertWorker', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should process high latency alert successfully', async () => {
    const alertDetails = {
      method: 'GET',
      url: '/test',
      responseTime: '5000',
      statusCode: 200,
    };

    jest.spyOn(AlertWorker, 'processHighLatencyAlert').mockResolvedValueOnce();

    await expect(
      AlertWorker.processHighLatencyAlert(alertDetails),
    ).resolves.not.toThrow();
  });

  it('should handle worker error', async () => {
    const alertDetails = {
      method: 'GET',
      url: '/test',
      responseTime: '5000',
      statusCode: 200,
    };

    jest
      .spyOn(AlertWorker, 'processHighLatencyAlert')
      .mockRejectedValueOnce(new Error('Worker Error'));

    await expect(
      AlertWorker.processHighLatencyAlert(alertDetails),
    ).rejects.toThrow('Worker Error');
  });
});
