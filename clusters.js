import cluster from 'cluster';
import http from 'http';
import os from 'os';

const CPUS = os.cpus();
const numCPUs = os.cpus().length;
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork worker
  for ( let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('listening', worker => {
    console.log('Cluster %d connected', worker.process.pid);
  });
  cluster.on('disconnect', worker => {
    console.log('Cluster %d disconnected', worker.process.pid);
  });
  cluster.on('exit', worker => {
    console.log('cluster %d is dead', worker.process.pid);
    cluster.fork();
  });
} else {
  require('./index.js');
}
