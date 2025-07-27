const {prisma} = require('./prisma/prisma-client');

async function testConnection() {
  try {
    console.log('Попытка подключения...');
    const users = await prisma.user.findMany();
    console.log('Подключение успешно!', users);
  } catch (error) {
    console.error('Ошибка подключения:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();