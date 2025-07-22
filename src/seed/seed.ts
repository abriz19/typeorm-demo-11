import 'reflect-metadata';
import { User } from '../auth/entities/user.entity';
import { AppDataSource } from 'src/config/typeorm.config';
import { DataSource } from 'typeorm';

async function seed() {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);

  const userExists = await userRepository.findOneBy({
    email: 'admin@example.com',
  });
  if (!userExists) {
    const admin = userRepository.create({
      email: 'admin@example.com',
      password: 'password@123',
      fullName: 'Admin User',
    });
    await userRepository.save(admin);
    console.log('✅ Admin user seeded');
  } else {
    console.log('⚠️ Admin user already exists');
  }

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error seeding data:', err);
  AppDataSource.destroy();
});
