import { PrismaClient } from "@prisma/client";
import HashUtil from "../utils/hash.util";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);


const prisma = new PrismaClient();

// clear database
async function clearDatabase() {
  await prisma.todo.deleteMany({ where: {}});
  await prisma.refreshToken.deleteMany({ where: {}});
  await prisma.user.deleteMany({ where: {}});
}

async function createUser() {
  const password = "admin123!"
  const hashedPassword = await new HashUtil().hash(password);
  const data = await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
      createdAt: dayjs.utc().toDate(),
    },
    select: {
      id: true
    }
  });
  return data.id;
}

async function createOtherUser() {
  const password = "adminnew123!"
  const hashedPassword = await new HashUtil().hash(password);
  const data = await prisma.user.create({
    data: {
      username: "adminnew",
      password: hashedPassword,
      createdAt: dayjs.utc().toDate(),
    },
    select: {
      id: true
    }
  });
  return data.id;
}

async function createTodos(userId: string) {
  const todos = [
    {
      userId: userId,
      title: "NS L Todo",
      status: 0,
      priority: 0,
      details: "Not Started Status, Low Priority Todo",
      createdAt: dayjs.utc().toDate(),
      dueAt: dayjs.utc().add(1, 'year').toDate(),
    },
    {
      userId: userId,
      title: "NS H Todo",
      status: 0,
      priority: 1,
      details: "Not Started Status, High Priority Todo",
      createdAt: dayjs.utc().toDate(),
      dueAt: dayjs.utc().add(1, 'year').toDate(),
    },
    {
      userId: userId,
      title: "NS U Todo",
      status: 0,
      priority: 0,
      details: "Not Started Status, Urgent Priority Todo",
      createdAt: dayjs.utc().toDate(),
      dueAt: dayjs.utc().add(1, 'year').toDate(),
    },
    {
      userId: userId,
      title: "IP L Todo",
      status: 1,
      priority: 0,
      details: "In Progress Status, Low Priority Todo",
      createdAt: dayjs.utc().toDate(),
      dueAt: dayjs.utc().add(1, 'year').toDate(),
    },
    {
      userId: userId,
      title: "D L Todo",
      status: 2,
      priority: 0,
      details: "Done Status, Low Priority Todo",
      createdAt: dayjs.utc().toDate(),
      dueAt: dayjs.utc().add(1, 'year').toDate(),
    },
    {
      userId: userId,
      title: "D H Todo",
      status: 2,
      priority: 1,
      details: "Done Status, High Priority Todo",
      createdAt: dayjs.utc().toDate(),
      dueAt: dayjs.utc().add(1, 'year').toDate(),
    }
  ];

  for (const todo of todos) {
    await prisma.todo.create({ data: todo });
  }
}

async function createOtherUserTodos(userId: string) {
  const todos = [
    {
      userId: userId,
      title: "NS L Todo",
      status: 0,
      priority: 0,
      details: "Not Started Status, Low Priority Todo",
      createdAt: dayjs.utc().toDate(),
      dueAt: dayjs.utc().add(1, 'year').toDate(),
    },
  ];

  for (const todo of todos) {
    await prisma.todo.create({ data: todo });
  }
}

clearDatabase()
  .then(createUser)
  .then(createTodos)
  .then(createOtherUser)
  .then(createOtherUserTodos)
  .catch((err) => console.error(err))