const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const Consumer = kafka.Consumer;

const consumer = new Consumer(client, [{ topic: 'suc', partition: 0 }], {
  autoCommit: false,
  groupId: 'groupa',
});

consumer.on('message', (message) => {
  console.log('Received message:', message.value);
});

consumer.on('error', (error) => {
  console.error('Kafka consumer error:', error);
});

consumer.on('offsetOutOfRange', (error) => {
  console.error('Kafka consumer offset out of range error:', error);
});