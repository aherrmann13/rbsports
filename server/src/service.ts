import process from 'process';

export type Shutdown = () => Promise<void>;
export type Startup = () => Shutdown;

export type Service = {
  startup: Startup;
};

export const start = (service: Service): void => {
  const shutdown = service.startup();
  // C-c
  process.on('SIGINT', function onSigint() {
    shutdown()
      .then(() => process.exit())
      .catch((err) => {
        console.error(err);
        process.exit();
      });
  });

  // graceful process shutdown request
  process.on('SIGTERM', function onSigterm() {
    shutdown()
      .then(() => process.exit())
      .catch((err) => {
        console.error(err);
        process.exit();
      });
  });
};
